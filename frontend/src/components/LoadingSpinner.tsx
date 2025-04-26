const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="text-terminal-green font-pixel scale-15">
        <span className="inline-block animate-blink mx-1">.</span>
        <span
          className="inline-block animate-blink mx-1"
          style={{ animationDelay: "0.2s" }}
        >
          .
        </span>
        <span
          className="inline-block animate-blink mx-1"
          style={{ animationDelay: "0.4s" }}
        >
          .
        </span>
      </div>
      <div className="text-terminal-blue font-mono mt-2 text-sm sm:text-base">
        Running analysis module
      </div>
    </div>
  );
};

export default LoadingSpinner;
