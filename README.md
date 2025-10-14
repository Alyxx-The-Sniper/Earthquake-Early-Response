# Earthquake Early Response Simulator

## Overview
The Earthquake Early Response Simulator is a full-stack web application that demonstrates the use of a machine learning model to predict building damage following a seismic event. The application features an interactive front-end that allows a user to trigger a simulated earthquake, which sends data to a Python back-end. The back-end uses a pre-trained scikit-learn model to predict the damage state for a random sample of buildings. The results, including damage levels like 'Light', 'Moderate', 'Severe', or 'Collapse', are then displayed in a data table and visualized on an interactive map.

## Features
- Interactive Simulation: A simple user interface to start the earthquake simulation with a single button click.
- Real ML Model Integration: Uses a Python back-end to serve predictions from a genuine joblib-serialized machine learning model.
- Data Visualization: Displays affected buildings on an interactive Leaflet.js map with color-coded markers based on predicted damage severity.
- Tabular Data Display: Neatly presents the raw data and predictions for the affected buildings in a clear, readable table.
- Highlighting of Critical Zones: Automatically draws a red radius around buildings predicted to be severely damaged or collapsed.

## Tech Stack
**Front-End:**
- HTML5
- Tailwind CSS (for styling and layout)
- JavaScript (for user interaction and API calls)
- Leaflet.js (for the interactive map)

**Back-End:**
- Python 3.x
- FastAPI (for creating the API)
- Uvicorn (as the ASGI server)
- Scikit-learn, Pandas, Joblib (for loading the model and handling data)


## Model Details
- Trained on 100 synthetic records (demo only).  
- Recall was prioritized to reduce false positives; the recall-weighted F-score is 0.95.

