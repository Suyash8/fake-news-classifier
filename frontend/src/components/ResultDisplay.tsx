import React, { useEffect, useState, useRef } from "react";

interface ResultDisplayProps {
  result: "real" | "fake" | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fullText =
    result === "real"
      ? "ANALYSIS COMPLETE: REAL NEWS"
      : "ANALYSIS COMPLETE: FAKE NEWS";

  useEffect(() => {
    if (result) {
      if (intervalRef.current) clearInterval(intervalRef.current);

      setDisplayText("");
      setShowCursor(true);

      let i = 0;
      intervalRef.current = setInterval(() => {
        if (i <= fullText.length) {
          // Important: no callback, just directly set from fullText slice
          setDisplayText(fullText.slice(0, i));
          i++;
        } else {
          clearInterval(intervalRef.current!);
          setTimeout(() => setShowCursor(false), 500);
        }
      }, 50);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [result]);

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
