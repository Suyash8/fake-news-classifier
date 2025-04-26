import TerminalHeader from "@/components/TerminalHeader";
import InputSection from "@/components/InputSection";
import { useState } from "react";
import { toast } from "sonner";
import { proxyFetch } from "@/pages/api-proxy";
import LoadingSpinner from "@/components/LoadingSpinner";
import ResultDisplay from "@/components/ResultDisplay";
import Disclaimer from "@/components/Disclaimer";
// import { playErrorBeep } from "@/lib/sounds";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<"real" | "fake" | null>(null);

  const analyzeText = async (text: string) => {
    setIsLoading(true);
    setResult(null);

    try {
      const prediction = await proxyFetch(text);

      if (prediction) {
        setResult(prediction);
        // playErrorBeep();
      } else {
        // playErrorBeep();
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      toast("Analysis Error", {
        description: "Failed to analyze the text. Please try again.",
        // variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-terminal-black px-4 py-8">
      <div className="container max-w-3xl mx-auto space-y-6">
        <TerminalHeader />

        <InputSection onSubmit={analyzeText} isLoading={isLoading} />
        <div className="min-h-[200px] flex items-center justify-center">
          {isLoading ? <LoadingSpinner /> : <ResultDisplay result={result} />}
        </div>
        <Disclaimer />
      </div>
    </div>
  );
};

export default Index;
