from flask import Flask, request, jsonify
from flask_cors import CORS
from predict import predict_diabetes

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():

    data = request.json

    result = predict_diabetes(data)

    return jsonify({
        "reply": result
    })

if __name__ == "__main__":
    app.run(debug=True)