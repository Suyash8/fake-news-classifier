import React, { useEffect, useState } from "react";

interface ResultDisplayProps {
  result: "real" | "fake" | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const [showCursor, setShowCursor] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const fullText =
    result === "real"
      ? "ANALYSIS COMPLETE: REAL NEWS"
      : "ANALYSIS COMPLETE: FAKE NEWS";

  useEffect(() => {
    if (result) {
      setDisplayText("");
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setDisplayText((prev) => prev + fullText.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => setShowCursor(false), 500);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    }
  }, [result, fullText]);

  if (!result) return null;

  return (
    <div className="terminal-container py-8">
      <div className="flex justify-center items-center">
        <div
          className={`font-pixel text-lg sm:text-2xl relative inline-flex ${
            result === "fake" ? "text-terminal-red" : "text-terminal-green"
          } animate-flicker`}
        >
          {displayText}
          {showCursor && (
            <span className="inline-block w-3 h-6 ml-1 border-r-4 border-terminal-green animate-cursor-blink" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
