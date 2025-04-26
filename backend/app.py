from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re

# Load model and vectorizer
model = joblib.load('model/model.pkl')
tfidf = joblib.load('model/tfidf.pkl')

# Load stopwords
with open('preprocessing/stopwords', 'r') as f:
    stopwords = set(f.read().splitlines())

# Text preprocessing function (same as training time)
def preprocess_input_text(text):
    text = text.lower()  # Lowercase
    text = re.sub(r'[^a-zA-Z\s]', '', text)  # Remove special characters
    text = ' '.join([word for word in text.split() if word not in stopwords])  # Remove stopwords
    return text

# Initialize Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

# Prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    raw_text = data.get('text', '')

    # Preprocess the incoming text
    cleaned_text = preprocess_input_text(raw_text)

    # Vectorize
    text_vector = tfidf.transform([cleaned_text])

    # Predict
    prediction = model.predict(text_vector)[0]
    result = "Fake" if prediction == 1 else "Real"

    return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(debug=True)
