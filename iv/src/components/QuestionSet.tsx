import React from "react";
import { StopPoint } from "../shared/types";

type Props = {
  currentStopPoint: StopPoint;
};

const QuestionSet: React.FC<Props> = ({ currentStopPoint }) =>
  currentStopPoint && (
    <div className='m-2'>
      <div className='p-3'>{currentStopPoint.questionTitle}</div>
      <div className='d-flex justify-content-between p-3'>
        <button type='button' className='btn btn-primary'>
          First
        </button>
        <button type='button' className='btn btn-primary'>
          Second
        </button>
        <button type='button' className='btn btn-primary'>
          Third
        </button>
        <button type='button' className='btn btn-primary'>
          Fourth
        </button>
      </div>
    </div>
  );

export default QuestionSet;
