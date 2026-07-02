import os
import joblib
import numpy as np

MODEL_PATH = os.path.join(os.path.dirname(__file__), "diabetes_model.pkl")
SCALER_PATH = os.path.join(os.path.dirname(__file__), "scaler.pkl")

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)


def predict_diabetes(data):

    features = np.array([[
        data["Pregnancies"],
        data["Glucose"],
        data["BloodPressure"],
        data["SkinThickness"],
        data["Insulin"],
        data["BMI"],
        data["DiabetesPedigreeFunction"],
        data["Age"]
    ]])

    # Scale the input
    features = scaler.transform(features)

    prediction = model.predict(features)
    probability = model.predict_proba(features)[0][1] * 100

    if prediction[0] == 1:
        return {
            "prediction": "High possibility of diabetes detected.",
            "risk": round(probability, 2)
        }
    else:
        return {
            "prediction": "Low possibility of diabetes detected.",
            "risk": round(probability, 2)
        }