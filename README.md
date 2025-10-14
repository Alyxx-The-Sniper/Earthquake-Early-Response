Earthquake Damage Simulator
Overview
The Earthquake Damage Simulator is a full-stack web application that demonstrates the use of a machine learning model to predict building damage following a seismic event. The application features an interactive front-end that allows a user to trigger a simulated earthquake, which sends data to a Python back-end. The back-end uses a pre-trained scikit-learn model to predict the damage state for a random sample of buildings. The results, including damage levels like 'Light', 'Moderate', 'Severe', or 'Collapse', are then displayed in a data table and visualized on an interactive map.

This project was developed in Antipolo City, Philippines.

Features
Interactive Simulation: A simple user interface to start the earthquake simulation with a single button click.

Real ML Model Integration: Uses a Python back-end to serve predictions from a genuine joblib--serialized machine learning model.

Data Visualization: Displays affected buildings on an interactive Leaflet.js map with color-coded markers based on predicted damage severity.

Tabular Data Display: Neatly presents the raw data and predictions for the affected buildings in a clear, readable table.

Highlighting of Critical Zones: Automatically draws a red radius around buildings predicted to be severely damaged or collapsed.

Tech Stack
Front-End:

HTML5

Tailwind CSS (for styling and layout)

JavaScript (for user interaction and API calls)

Leaflet.js (for the interactive map)

Back-End:

Python 3.x

FastAPI (for creating the API)

Uvicorn (as the ASGI server)

Scikit-learn, Pandas, Joblib (for loading the model and handling data)

Project Structure
earthquake-simulator/
├── backend/
│   ├── main.py                   # FastAPI application logic
│   └── damage_state_pipeline.joblib  # The pre-trained ML model
│
├── styles/
│   └── main.css                  # Custom CSS styles
│
├── scripts/
│   └── app.js                    # Front-end JavaScript logic
│
├── index.html                    # The main HTML file for the UI
├── requirements.txt              # Python dependencies for the back-end
└── README.md                     # Project documentation (this file)

Setup and Installation
To run this project, you need to run the back-end server and the front-end user interface separately.

1. Back-End Setup
Navigate to the back-end directory:

cd path/to/your/earthquake-simulator/backend

Create a virtual environment (recommended):

python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

Install the required Python packages:

pip install -r ../requirements.txt

(Note: We run this from the backend folder, so we point to the requirements file in the parent directory)

Place your model: Ensure your trained damage_state_pipeline.joblib file is inside the backend/ directory.

Start the server:

uvicorn main:app --reload

The server should now be running at http://127.0.0.1:8000.

2. Front-End Setup
No complex setup is required for the front-end.

Open the index.html file: Navigate to the project's root directory (earthquake-simulator/) in your file explorer.

Double-click index.html to open it in your preferred web browser (e.g., Chrome, Firefox).

How to Use
Ensure the back-end server is running.

Open index.html in your browser.

Click the "Simulate Earthquake" button.

The application will send data for 13 random buildings to the back-end.

The back-end will return damage predictions from the ML model.

The results will appear in the table and on the map.