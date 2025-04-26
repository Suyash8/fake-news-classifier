import pandas as pd
import re

stopwords = set()
with open('preprocessing/stopwords', 'r') as f:
    stopwords = set(f.read().splitlines())

# Function to clean text data
def clean_text(text):
    text = text.lower()  # Convert text to lowercase
    text = re.sub(r'[^a-zA-Z\s]', '', text)  # Remove special characters
    text = ' '.join([word for word in text.split() if word not in stopwords])  # Remove stopwords
    return text

# Load the raw data
fake_df = pd.read_csv('data/raw/Fake.csv')
true_df = pd.read_csv('data/raw/True.csv')

# Preprocess text columns
fake_df['text'] = fake_df['text'].apply(clean_text)
true_df['text'] = true_df['text'].apply(clean_text)

fake_df['title'] = fake_df['title'].apply(clean_text)
true_df['title'] = true_df['title'].apply(clean_text)

# Add labels: 1 for fake, 0 for true
fake_df['label'] = 1
true_df['label'] = 0

# Combine the datasets
data = pd.concat([fake_df[['title', 'text', 'label']], true_df[['title', 'text', 'label']]])

# Save the cleaned data
data.to_csv('data/processed/cleaned_data.csv', index=False)
