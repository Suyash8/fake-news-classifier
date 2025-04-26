const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to Fake News Classifier
      </h1>
      <p className="text-xl text-gray-600 mb-4">
        This is a full-stack web application that classifies news articles as
        either fake or real using a machine learning model built in Python,
        served via a Flask API, and a Next.js frontend.
      </p>
      <a href="/" className="text-blue-500 hover:text-blue-700 underline">
        Return to Home
      </a>
    </div>
  );
};

export default Index;
