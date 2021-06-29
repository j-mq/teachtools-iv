import React from "react";
import { Answer, StopPoint } from "../shared/types";

type Props = {
  currentStopPoint: StopPoint;
  playing: boolean;
  answerQuestion: (stopPoint: StopPoint, answer: Answer) => void;
};

const QuestionSet: React.FC<Props> = ({
  currentStopPoint,
  answerQuestion,
  playing,
}) => {
  const answers = (stopPoint: StopPoint) =>
    stopPoint.answers.map((answer, index) => {
      return (
        <>
          <button
            type='button'
            key={index}
            onClick={() => answerQuestion(stopPoint, answer)}
            className='flex items-center text-sm text-left'
          >
            <div className='font-bold text-2xl text-white bg-purple-600 hover:bg-purple-400 py-2 px-3 mr-3 rounded-md shadow-sm'>
              {index}
            </div>
            {answer.title}
          </button>
        </>
      );
    });

  return currentStopPoint ? (
    //&& !playing
    <>
      <div className='font-bold text-2xl mb-4'>
        {currentStopPoint.questionTitle}
      </div>
      <div className='grid grid-flow-row sm:grid-cols-2 grid-rows-2 gap-4'>
        {answers(currentStopPoint)}
      </div>
    </>
  ) : (
    <></>
  );
};

export default QuestionSet;
