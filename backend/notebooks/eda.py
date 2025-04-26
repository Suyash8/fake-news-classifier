import pandas as pd

data = pd.read_csv('data/processed/cleaned_data.csv')

data.head()          # See first few rows
data.info()          # Column info, missing values
data.describe()      # Statistical summary for numerical columns
data['label'].value_counts()  # Number of fake vs real

data.isnull().sum()
data.duplicated().sum()
data = data.dropna(subset=['text'])  # Drop rows where text is missing


data['text_length'] = data['text'].apply(len)

import matplotlib.pyplot as plt
import seaborn as sns

plt.figure(figsize=(8, 6))
sns.histplot(data['text_length'], bins=50, kde=True)
plt.title('Text Length Distribution')
plt.show()

from wordcloud import WordCloud

# For fake news
fake_text = ' '.join(data[data['label'] == 1]['text'])
wordcloud = WordCloud(width=800, height=400).generate(fake_text)

plt.figure(figsize=(10, 5))
plt.imshow(wordcloud, interpolation='bilinear')
plt.axis('off')
plt.title('Common Words in Fake News')
plt.show()

from collections import Counter

words = ' '.join(data['text']).split()
common_words = Counter(words).most_common(20)
print(common_words)
