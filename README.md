# Fake News Classifier

This is a full-stack web application that classifies news articles as either fake or real using a machine learning model built in Python, served via a Flask API, and a Next.js frontend.

## Live Demo (not deployed yet)

Frontend: [https://fake-news-classifier-1-0uqz.onrender.com](https://fake-news-classifier-1-0uqz.onrender.com)  
Backend API: [https://fake-news-classifier-n28s.onrender.com](https://fake-news-classifier-n28s.onrender.com)

## Tech Stack

### Backend

- Python
- Flask
- scikit-learn
- TF-IDF Vectorizer
- Render (for deployment)

### Frontend

- Vite (React + TypeScript)
- Tailwind CSS
- Render (for deployment)

## How It Works

1. User inputs a news article.
2. The frontend sends this input to a Flask API.
3. The model classifies the input as "Fake" or "Real".
4. The result is displayed to the user.

## Dataset

I use the "Fake and Real News Dataset" from Kaggle:  
https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset

## Running Locally

Run the setup script (Linux/macOS):

```bash
bash setup.sh
```

Alternatively, run manually:

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## License

MIT License - use this freely!
