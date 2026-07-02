const questions = [
    "What is your name?",
    "Enter your age:",
    "How many pregnancies?",
    "Enter glucose level:",
    "Enter blood pressure:",
    "Enter skin thickness:",
    "Enter insulin:",
    "Enter BMI:",
    "Enter Diabetes Pedigree Function:"
];

const keys = [
    "name",
    "Age",
    "Pregnancies",
    "Glucose",
    "BloodPressure",
    "SkinThickness",
    "Insulin",
    "BMI",
    "DiabetesPedigreeFunction"
];

let currentQuestion = 0;
let patientData = {};

function addMessage(message, type) {

    const chat = document.getElementById("chatbox");

    const div = document.createElement("div");

    div.className = type;

    div.innerText = message;

    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;

}

addMessage(
    "👋 Hello! I am your Diabetes Health Assistant.",
    "bot"
);

addMessage(
    questions[currentQuestion],
    "bot"
);

document.getElementById("userInput").focus();

async function sendMessage() {

    const input = document.getElementById("userInput");

    const value = input.value.trim();

    if (value === "") {
        return;
    }

    addMessage(value, "user");

    patientData[keys[currentQuestion]] = value;

    input.value = "";

    currentQuestion++;

    if (currentQuestion < questions.length) {

        addMessage(
            questions[currentQuestion],
            "bot"
        );

        input.focus();

    }
    else {

        const response = await fetch(
            "http://127.0.0.1:5000/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    Age: parseInt(patientData.Age),
                    Pregnancies: parseInt(patientData.Pregnancies),
                    Glucose: parseInt(patientData.Glucose),
                    BloodPressure: parseInt(patientData.BloodPressure),
                    SkinThickness: parseInt(patientData.SkinThickness),
                    Insulin: parseInt(patientData.Insulin),
                    BMI: parseFloat(patientData.BMI),
                    DiabetesPedigreeFunction: parseFloat(patientData.DiabetesPedigreeFunction)

                })
            }
        );

        const result = await response.json();

        let message = `${patientData.name},

${result.reply}

Risk Score: ${result.risk}%`;

        if (result.risk >= 70) {
            message += "\n\nRecommendation:\n• Consult a healthcare professional.\n• Reduce sugar intake.\n• Exercise regularly.";
        } else {
            message += "\n\nRecommendation:\n• Maintain a healthy lifestyle.\n• Exercise regularly.";
        }

        addMessage(message, "bot");
        input.focus();

    }

}

document.getElementById("userInput")
    .addEventListener(
        "keypress",
        function (event) {

            if (event.key === "Enter") {
                sendMessage();
            }

        }
    );
