import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from fastapi.responses import HTMLResponse

# 1. Define the data structure for incoming requests
# This ensures the data sent from the front-end matches what the model expects. 
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

# serve everything in the repo root as static files
app.mount("/static", StaticFiles(directory=Path(__file__).parent.parent, html=True), name="static")

# deliver index.html on "/"
@app.get("/", response_class=HTMLResponse)
async def home():
    return HTMLResponse(content=(Path(__file__).parent.parent / "index.html").read_text(), status_code=200)


# Add CORS middleware to allow requests from your front-end
# This is a security feature browsers enforce.
origins = ["*"] # Allow all origins for simplicity, can be restricted later
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 3. Load your trained model
# The server loads this once on startup, making it fast.
try:
    pipeline = joblib.load('damage_state_pipeline.joblib')
    print("Model loaded successfully!")
except FileNotFoundError:
    print("Error: 'damage_state_pipeline.joblib' not found. Make sure it's in the 'backend' folder.")
    pipeline = None

# Mapping from encoded prediction to human-readable label
reverse_damage_map = {
    0: 'No Damage',
    1: 'Light',
    2: 'Moderate',
    3: 'Severe',
    4: 'Collapse'
}

# 4. Create the prediction endpoint
@app.post("/predict")
def predict_damage(building: Building):
    """
    Receives building data, makes a prediction, and returns it.
    """
    if pipeline is None:
        return {"error": "Model not loaded."}

    # Convert the incoming data into a Pandas DataFrame
    # The model was trained on a DataFrame, so it expects this format.
    input_data = pd.DataFrame([building.dict()])
    
    # The column names must match what the model was trained on
    # Ensure the order and names are correct
    feature_columns = [
        'Latitude', 'Longitude', 'PGA_g', 'PGV_cm_s', 'Year_Construction',
        'Num_Stories', 'Structural_System', 'Soil_Type_Vs30_mps'
    ]
    input_data = input_data[feature_columns]


    # Make a prediction
    pred_encoded = pipeline.predict(input_data)
    
    # Convert the numeric prediction (e.g., 3) to a label (e.g., "Severe")
    prediction_label = reverse_damage_map.get(pred_encoded[0], "Unknown")
    
    # Return the prediction as a JSON response
    return {"predicted_damage": prediction_label}

