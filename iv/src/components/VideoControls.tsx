import React from "react";
import ReactPlayer from "react-player";

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
};

const VideoControls: React.FC<Props> = ({
  url,
  getPlaying,
  setPlaying,
  getPlayedState,
}) => (
  <ReactPlayer
    url={url}
    playing={setPlaying}
    onProgress={getPlayedState}
    onPlay={getPlaying}
    onStart={getPlaying}
    controls={true}
  />
);

export default VideoControls;
