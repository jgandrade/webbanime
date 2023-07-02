import {
  Player,
  VolumeMenuButton,
  BigPlayButton,
  ControlBar,
  ForwardControl,
  ReplayControl,
  LoadingSpinner,
} from "video-react";
import "node_modules/video-react/dist/video-react.css";
import HLSSource from "./HLSSource";

const VideoPlayer = ({ videoSource }: { videoSource: string }) => {
  return (
    <Player autoPlay={false}>
      <HLSSource src={videoSource} />
      <BigPlayButton position="center" />
      <LoadingSpinner />
      <ControlBar>
        <ReplayControl seconds={10} />
        <VolumeMenuButton vertical />
        <ForwardControl seconds={10} />
      </ControlBar>
    </Player>
  );
};

export { VideoPlayer };
