import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, ConfusionMatrixDisplay, roc_curve, auc
import matplotlib.pyplot as plt
import joblib

# Load cleaned data
data = pd.read_csv('data/processed/cleaned_data.csv')

# Drop rows with missing values in 'text'
data = data.dropna(subset=['text'])

# Features and labels
X = data['text']
y = data['label']

# Split into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# TF-IDF Vectorization
vectorizer = TfidfVectorizer(stop_words='english', max_df=0.7)
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

# Train Logistic Regression with verbose output
model = LogisticRegression(max_iter=500, verbose=1)
model.fit(X_train_tfidf, y_train)

# Predict on test set
y_pred = model.predict(X_test_tfidf)

# Evaluation metrics
print("\n🔍 Classification Report:")
print(classification_report(y_test, y_pred))

# # Confusion Matrix
# cm = confusion_matrix(y_test, y_pred)
# disp = ConfusionMatrixDisplay(confusion_matrix=cm)
# disp.plot()
# plt.title("Confusion Matrix")
# plt.show()

# # ROC Curve
# y_proba = model.predict_proba(X_test_tfidf)[:, 1]
# fpr, tpr, _ = roc_curve(y_test, y_proba)
# roc_auc = auc(fpr, tpr)

# plt.figure()
# plt.plot(fpr, tpr, color='darkorange', lw=2, label=f"ROC curve (AUC = {roc_auc:.2f})")
# plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
# plt.xlabel("False Positive Rate")
# plt.ylabel("True Positive Rate")
# plt.title("Receiver Operating Characteristic")
# plt.legend(loc="lower right")
# plt.show()

# Save model and vectorizer
joblib.dump(model, 'model/model.pkl')
joblib.dump(vectorizer, 'model/tfidf.pkl')

print("✅ Model and vectorizer saved successfully!")