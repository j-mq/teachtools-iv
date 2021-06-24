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
        <button
          type='button'
          key={index}
          className='btn btn-primary'
          onClick={() => answerQuestion(stopPoint, answer.correctAnswer)}
        >
          {answer.title}
        </button>
      );
    });

  return currentStopPoint && !playing ? (
    <div className='m-2'>
      <div className='p-3'>{currentStopPoint.questionTitle}</div>
      <div className='d-flex justify-content-between p-3'>
        {answers(currentStopPoint)}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default QuestionSet;
