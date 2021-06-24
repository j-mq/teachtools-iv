import React from "react";

type Props = {
  results: {
    time: number;
    passed: boolean;
    taken: boolean;
  }[];
  retryQuestion: (time: number) => void;
  goToQuestion: (time: number) => void;
};

const Results: React.FC<Props> = ({ results, retryQuestion, goToQuestion }) => {
  return (
    <>
      {results.map((result, index) => (
        <div key={index}>
          Q{index + 1}({result.time}secs):{" "}
          {result.taken ? "TAKEN" : "NOT_ANSWERED"}
          {result.taken ? (result.passed ? " GOOD" : " BAD") : ""}{" "}
          {result.taken && (
            <button onClick={() => retryQuestion(result.time)}>Retry</button>
          )}
          <button onClick={() => goToQuestion(result.time)}>
            Go to question
          </button>
        </div>
      ))}
      Correctly answered:{" "}
      {results.filter((result) => result.passed && result.taken).length}/
      {results.length}
    </>
  );
};

export default Results;
