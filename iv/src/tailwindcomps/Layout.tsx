import VideoControls from "./VideoControls";
import QuestionSet from "./QuestionSet";
import Results from "./Results";
import VideoData from "../videoData.json";
import { useState, useEffect } from "react";
import { Answer, StopPoint } from "../shared/types";

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
      question: stopPoint.questionTitle,
    };
  });

  const [playedSeconds, setPlayedSeconds] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [allStopPoints, setAllStopPoints] =
    useState<StopPoint[]>(orderedStopPoints);
  const [results, setResults] = useState<
    {
      time: number;
      passed: boolean;
      taken: boolean;
      question: string;
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

  const answerQuestion = (point: StopPoint, answer: Answer) => {
    const newAllStopPoints = allStopPoints.filter(
      (stopPoint) => stopPoint.time !== point.time
    );
    setAllStopPoints(newAllStopPoints);
    const newResults = results.map((result) => {
      return result.time === point.time
        ? {
            ...result,
            passed: answer.correctAnswer,
            taken: true,
          }
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
    <div className='bg-gray-800 min-h-screen min-w-screen'>
      <div className='container mx-auto flex-row justify-center'>
        <div className='flex justify-center pt-8'>
          <VideoControls
            url={url}
            getPlayedState={getPlayedState}
            setPlaying={playing}
            getPlaying={() => setPlaying(true)}
            setPlayer={(player) => setPlayer(player)}
          />
        </div>
        <div className='flex justify-center mt-4 max-w-screen-md mx-auto'>
          <div className='bg-yellow-100 rounded-tr-xl absolute overflow-x-hidden bottom-0 sm:w-10/12 sm:overflow-visible'>
            <div className='flex flex-row'>
              <div className='flex flex-column w-2/3 text-left p-3'>
                {playedSeconds > 0 && (
                  <QuestionSet
                    currentStopPoint={currentStopPoint}
                    answerQuestion={answerQuestion}
                    playing={playing}
                  />
                )}
              </div>
              <div className='flex flex-column w-1/3 bg-yellow-200 text-left p-3 mr-5 mb-5'>
                <Results
                  results={results}
                  retryQuestion={retryQuestion}
                  goToQuestion={goToQuestion}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
