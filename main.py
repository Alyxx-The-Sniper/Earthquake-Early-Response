# main.py
import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles  # <-- You already had this
from pathlib import Path
from fastapi.responses import HTMLResponse    # <-- You already had this

# 1. Define the data structure...
class Building(BaseModel):
    Latitude: float
    Longitude: float
    PGA_g: float
    PGV_cm_s: float
    Year_Construction: int
    Num_Stories: int
    Structural_System: str
    Soil_Type_Vs30_mps: float

# 2. Initialize the FastAPI application
app = FastAPI()

# Add CORS middleware...
origins = ["*"] 
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Load your trained model
try:
    # Look for the model in the same (root) folder
    pipeline = joblib.load('damage_state_pipeline.joblib') 
    print("Model loaded successfully!")
except FileNotFoundError:
    print("Error: 'damage_state_pipeline.joblib' not found. Make sure it's in the root project folder.")
    pipeline = None

# Mapping...
reverse_damage_map = {
    0: 'No Damage', 1: 'Light', 2: 'Moderate', 3: 'Severe', 4: 'Collapse'
}

# 4. Create the prediction endpoint
@app.post("/predict")
def predict_damage(building: Building):
    if pipeline is None:
        return {"error": "Model not loaded."}
    
    input_data = pd.DataFrame([building.dict()])
    feature_columns = [
        'Latitude', 'Longitude', 'PGA_g', 'PGV_cm_s', 'Year_Construction',
        'Num_Stories', 'Structural_System', 'Soil_Type_Vs30_mps'
    ]
    input_data = input_data[feature_columns]
    pred_encoded = pipeline.predict(input_data)
    prediction_label = reverse_damage_map.get(pred_encoded[0], "Unknown")
    return {"predicted_damage": prediction_label}


# 5. --- NEW SECTION: Serve the Frontend ---
@app.get("/", response_class=HTMLResponse)
async def read_root():
    return Path("static/index.html").read_text()

app.mount("/", StaticFiles(directory="static"), name="static")