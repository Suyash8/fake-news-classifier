const TerminalHeader = () => {
  return (
    <div className="my-8">
      <h1 className="terminal-header text-xl sm:text-3xl">
        FAKE NEWS CLASSIFIER
      </h1>
      <div className="terminal-divider"></div>
      <p className="text-center text-terminal-blue font-mono text-xs sm:text-sm mt-2 mb-4">
        v1.0.0 // NEURAL ANALYSIS MODULE LOADED
      </p>
    </div>
  );
};

export default TerminalHeader;
