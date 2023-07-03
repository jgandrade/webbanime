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
import { useState } from "react";

const VideoPlayer = ({
  videoSource,
}: {
  videoSource: {
    url: string;
    isM3U8: boolean;
    quality: string;
  }[];
}) => {
  const [video, setVideo] = useState<{
    url: string;
    isM3U8: boolean;
    quality: string;
  }>({
    url: videoSource[0].url,
    isM3U8: videoSource[0].isM3U8,
    quality: videoSource[0].quality,
  });

  const handleQualityClick = (quality: string) => {
    const qualityClick = videoSource.filter(
      (videoQuality) => videoQuality.quality === quality
    )[0];
    setVideo(qualityClick);
  };

  return (
    <Player autoPlay={false}>
      <HLSSource src={video.url} />
      <BigPlayButton position="center" />
      <LoadingSpinner />
      <ControlBar>
        <ReplayControl seconds={10} />
        <VolumeMenuButton vertical />
        <ForwardControl seconds={10} />
        <ul>
          {videoSource.map((source, index) => {
            return (
              <li
                onClick={() => handleQualityClick(source.quality)}
                key={`${index}-quality-source`}
              >
                {source.quality}
              </li>
            );
          })}
        </ul>
      </ControlBar>
    </Player>
  );
};

export { VideoPlayer };
