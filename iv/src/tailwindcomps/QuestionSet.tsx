import React from "react";
import { StopPoint } from "../shared/types";

type Props = {
  currentStopPoint: StopPoint;
  playing: boolean;
  answerQuestion: (stopPoint: StopPoint, correctAnswer: boolean) => void;
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
            onClick={() => answerQuestion(stopPoint, answer.correctAnswer)}
            className='flex items-center'
          >
            <div className='font-bold text-2xl text-white bg-purple-600 hover:bg-purple-400 py-2 px-3 mr-3 rounded-md shadow-sm'>
              {index}
            </div>
            {answer.title}
          </button>
        </>
      );
    });

  return currentStopPoint && !playing ? (
    <>
      <div className='font-bold text-2xl mb-3'>
        {currentStopPoint.questionTitle}
      </div>
      <div className='grid grid-flow-col grid-cols-2 grid-rows-2 gap-3'>
        {answers(currentStopPoint)}
      </div>
    </>
  ) : (
    <></>
  );
};

export default QuestionSet;
