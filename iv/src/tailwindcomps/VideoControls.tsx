import React from "react";
import ReactPlayer from "react-player";
import { useRef, useEffect } from "react";

type Props = {
  url: string;
  setPlaying: boolean;
  getPlaying: () => void;
  getPlayedState: (state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => void;

  setPlayer: (player: any) => void;
};

const VideoControls: React.FC<Props> = ({
  url,
  getPlaying,
  setPlaying,
  getPlayedState,
  setPlayer,
}) => {
  const player = useRef(null);

  useEffect(() => {
    if (player.current) {
      setPlayer(player.current);
    }
  }, [player]);

  return (
    <ReactPlayer
      url={url}
      playing={setPlaying}
      onProgress={getPlayedState}
      onPlay={getPlaying}
      onStart={getPlaying}
      controls={true}
      ref={player}
    />
  );
};

export default VideoControls;
