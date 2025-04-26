import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface InputSectionProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const InputSection = ({ onSubmit, isLoading }: InputSectionProps) => {
  const [newsText, setNewsText] = useState<string>("");
  const [newsUrl, setNewsUrl] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("text");
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchUrlContent = async () => {
    if (!newsUrl.trim()) return;

    setIsFetching(true);
    try {
      const response = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(newsUrl)}`
      );
      const data = await response.json();

      if (data && data.contents) {
        const tempEl = document.createElement("div");
        tempEl.innerHTML = data.contents;

        // Remove unwanted elements
        const tagsToRemove = [
          "script",
          "style",
          "noscript",
          "form",
          "footer",
          "nav",
          "aside",
        ];
        tagsToRemove.forEach((tag) => {
          tempEl.querySelectorAll(tag).forEach((el) => el.remove());
        });

        // Try to find the main content
        let mainContent =
          tempEl.querySelector("article") ||
          tempEl.querySelector("main") ||
          tempEl;

        // Extract text
        let extractedText =
          mainContent.textContent || mainContent.innerText || "";
        extractedText = extractedText.replace(/\s+/g, " ").trim();

        setNewsText(extractedText);
        setActiveTab("text");
      }
    } catch (error) {
      console.error("Error fetching URL content:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = () => {
    if (newsText.trim()) {
      onSubmit(newsText);
    }
  };

  return (
    <div className="terminal-container mb-6 transition-all duration-300">
      <Tabs
        defaultValue="text"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="flex w-full sm:flex-row sm:h-auto h-24 flex-col mb-4 bg-terminal-black border-2 border-terminal-green">
          <TabsTrigger
            value="text"
            className="data-[state=active]:bg-terminal-green w-full data-[state=active]:text-terminal-black font-pixel text-xs py-3 transition-colors duration-300"
          >
            Paste News Text
          </TabsTrigger>
          <TabsTrigger
            value="url"
            className="data-[state=active]:bg-terminal-green w-full data-[state=active]:text-terminal-black font-pixel text-xs py-3 transition-colors duration-300"
          >
            Provide News URL
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="text"
          className="animate-in fade-in-50 duration-300"
        >
          <div className="space-y-4">
            <div className="font-mono text-xs sm:text-sm text-white">
              &gt; Enter news text for analysis:
            </div>
            <Textarea
              placeholder="Paste news article text here..."
              className="terminal-input min-h-[150px] sm:min-h-[200px] font-mono text-sm sm:text-base text-white resize-y transition-all duration-300"
              value={newsText}
              onChange={(e) => setNewsText(e.target.value)}
            />
          </div>
        </TabsContent>

        <TabsContent value="url" className="animate-in fade-in-50 duration-300">
          <div className="space-y-4">
            <div className="font-mono text-xs sm:text-sm text-white">
              &gt; Enter news article URL:
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="url"
                placeholder="https://example.com/news-article"
                className="terminal-input font-mono text-sm text-white transition-all duration-300"
                value={newsUrl}
                onChange={(e) => setNewsUrl(e.target.value)}
              />
              <Button
                onClick={fetchUrlContent}
                disabled={isFetching || !newsUrl.trim()}
                className="terminal-button group transition-all duration-300 sm:hover:shadow-[0_0_10px_rgba(0,255,0,0.5)] text-xs"
              >
                {isFetching ? "Fetching..." : "Fetch Content"}
              </Button>
            </div>
            {isFetching && (
              <div className="text-terminal-blue animate-pulse font-mono text-xs">
                Extracting content from URL...
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <Button
          onClick={handleSubmit}
          disabled={isLoading || !newsText.trim()}
          className="terminal-button w-full group transition-all duration-300 sm:hover:shadow-[0_0_15px_rgba(0,255,0,0.5)] text-sm"
        >
          {isLoading ? "Analyzing..." : "ANALYZE"}
        </Button>
      </div>
    </div>
  );
};

export default InputSection;
