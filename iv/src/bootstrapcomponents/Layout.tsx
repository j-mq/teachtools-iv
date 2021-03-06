import VideoControls from "./VideoControls";
import QuestionSet from "./QuestionSet";
import Results from "./Results";
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

  const initialResults = orderedStopPoints.map((stopPoint) => {
    return {
      time: stopPoint.time,
      passed: false,
      taken: false,
    };
  });

  const [playedSeconds, setPlayedSeconds] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [allStopPoints, setAllStopPoints] =
    useState<StopPoint[]>(orderedStopPoints);
  const [results, setResults] =
    useState<
      {
        time: number;
        passed: boolean;
        taken: boolean;
      }[]
    >(initialResults);
  const [currentStopPoint, setCurrentStopPoint] = useState<StopPoint>(
    orderedStopPoints[0]
  );
  const [player, setPlayer] = useState<any | null>(null);

  useEffect(() => {
    stopOnPoint(playedSeconds);
  }, [playedSeconds]);

  const stopOnPoint = (playedSeconds: number) => {
    if (allStopPoints.length > 0) {
      allStopPoints.forEach((point) => {
        if (Math.trunc(playedSeconds) === point.time) {
          setCurrentStopPoint(point);
          setPlaying(false);
        }
      });
    }
  };

  const answerQuestion = (point: StopPoint, correctAnswer: boolean) => {
    const newAllStopPoints = allStopPoints.filter(
      (stopPoint) => stopPoint.time !== point.time
    );
    setAllStopPoints(newAllStopPoints);
    const newResults = results.map((result) => {
      return result.time === point.time
        ? { ...result, passed: correctAnswer, taken: true }
        : result;
    });
    setResults(newResults);
    setPlaying(true);
  };

  const retryQuestion = (time: number) => {
    const question = orderedStopPoints.filter(
      (stopPoint) => stopPoint.time === time
    )[0];
    const newAllStopPoints = [...allStopPoints, question];
    setAllStopPoints(newAllStopPoints);
    const newResults = results.map((result) => {
      return result.time === time
        ? { ...result, passed: false, taken: false }
        : result;
    });
    setResults(newResults);
    if (player) {
      player.seekTo(time);
    }
  };

  const goToQuestion = (time: number) => {
    if (player) {
      player.seekTo(time);
    }
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
            setPlayer={(player) => setPlayer(player)}
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
          <Results
            results={results}
            retryQuestion={retryQuestion}
            goToQuestion={goToQuestion}
          />
        </div>
        <div className='col'></div>
      </div>
    </div>
  );
};

export default Layout;
