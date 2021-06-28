import React from "react";

type Props = {
  results: {
    time: number;
    passed: boolean;
    taken: boolean;
    question: string;
  }[];
  retryQuestion: (time: number) => void;
  goToQuestion: (time: number) => void;
};

const Results: React.FC<Props> = ({ results, retryQuestion, goToQuestion }) => {
  console.log("THE RESULTS", results);

  return (
    <>
      {results.map((result, index) => (
        <div key={index} className='flex justify-start text-left text-xs mb-3'>
          <button
            className={`${
              !result.taken ? "text-gray-400" : ""
            } hover:text-gray-700`}
            onClick={() => goToQuestion(result.time)}
          >
            Q{index + 1}. {result.question}
          </button>

          <div className='flex justify-center items-center text-lg w-5 ml-auto mr-2'>
            {result.taken && (
              <i
                className={`${
                  result.passed
                    ? "text-red-400 fa fa-check-circle"
                    : "text-blue-400 fa fa-times"
                }`}
              ></i>
            )}
          </div>

          {result.taken && !result.passed && (
            <button
              className='bg-pink-400 py-2 pl-2 pr-4 hover:bg-pink-200 -mr-14'
              onClick={() => retryQuestion(result.time)}
            >
              Retry
            </button>
          )}
          {/* Q{index + 1}({result.time}secs):{" "}
          {result.taken ? "TAKEN" : "NOT_ANSWERED"}
          {result.taken ? (result.passed ? " GOOD" : " BAD") : ""}{" "}
          {result.taken && (
            <button onClick={() => retryQuestion(result.time)}>Retry</button>
          )}
          <button onClick={() => goToQuestion(result.time)}>
            Go to question
          </button> */}
        </div>
      ))}
      {/* Correctly answered:{" "}
      {results.filter((result) => result.passed && result.taken).length}/
      {results.length} */}
    </>
  );
};

export default Results;
