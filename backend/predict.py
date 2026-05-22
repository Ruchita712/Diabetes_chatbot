import pickle
import numpy as np

# Load saved model
model = pickle.load(open("diabetes_model.pkl", "rb"))

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

    prediction = model.predict(features)

    if prediction[0] == 1:
        return "High possibility of diabetes detected."
    else:
        return "Low possibility of diabetes detected."