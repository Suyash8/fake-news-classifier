import { toast } from "sonner";

export const proxyFetch = async (text: string) => {
  try {
    // Use a CORS proxy service to make the request
    // const corsProxyUrl = "https://corsproxy.io/?";
    const targetUrl = "https://fake-news-classifier-n28s.onrender.com/predict";

    // const response = await fetch(corsProxyUrl + encodeURIComponent(targetUrl), {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    // Parse the response correctly based on the API response structure
    if (data && data.prediction) {
      const prediction = data.prediction.toLowerCase();
      return prediction === "real" ? "real" : "fake";
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Analysis failed:", error);
    toast("Analysis Error", {
      description: "Failed to analyze the text. Please try again.",
      //   variant: "destructive",
    });
    return null;
  }
};
