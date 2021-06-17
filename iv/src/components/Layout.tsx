import VideoControls from "./VideoControls";
import QuestionSet from "./QuestionSet";
import VideoData from "../videoData.json";
import { useState, useEffect } from "react";
import { StopPoint } from "../shared/types";

const Layout = () => {
  const { url, stopPoints } = VideoData.videoData;

  const orderedStopPoints = [
    ...stopPoints.sort((a, b) => {
      return a["time"] - b["time"];
    }),
  ];
  const [playedSeconds, setPlayedSeconds] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [allStopPoints, setAllStopPoints] =
    useState<StopPoint[]>(orderedStopPoints);
  const [currentStopPoint, setCurrentStopPoint] = useState<StopPoint>(
    orderedStopPoints[0]
  );

  console.log("IS IT PLAYING", playing);

  useEffect(() => {
    stopOnPoint(playedSeconds, currentStopPoint);
    console.log(
      "THE PLAYED SECONDS",
      playedSeconds,
      "THE CURRENT STOP PONTS",
      currentStopPoint
    );
  }, [playedSeconds]);

  const stopOnPoint = (playedSeconds: number, point: StopPoint) => {
    if (allStopPoints.length > 0) {
      if (playedSeconds >= point.time) {
        setPlaying(false);
      }
    }
  };

  const answerQuestion = (point: StopPoint, correctAnswer: boolean) => {
    const newAllStopPoints = allStopPoints.filter(
      (stopPoint) => stopPoint.time !== point.time
    );
    setAllStopPoints(newAllStopPoints);
    setCurrentStopPoint(newAllStopPoints[0]);
    if (correctAnswer) {
      console.log("COOL");
    } else {
      console.log("BAD");
    }
    setPlaying(true);
  };

  const getPlayedState = (state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    setPlayedSeconds(state.playedSeconds);
  };

  return (
    <div className='container-fluid p-3'>
      <div className='row'>
        <div className='col'></div>
        <div className='col-12 col-md-8 d-flex justify-content-center'>
          <VideoControls
            url={url}
            getPlayedState={getPlayedState}
            setPlaying={playing}
            getPlaying={() => setPlaying(true)}
          />
        </div>
        <div className='col'></div>
      </div>
      <div className='row'>
        <div className='col'></div>
        <div className='col-12 col-md-8'>
          {playedSeconds > 0 && (
            <QuestionSet
              currentStopPoint={currentStopPoint}
              answerQuestion={answerQuestion}
              playing={playing}
            />
          )}
        </div>
        <div className='col'></div>
      </div>
    </div>
  );
};

export default Layout;
