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
import SettingsIcon from "@mui/icons-material/Settings";

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

  const [showQualityOptions, setShowQualityOptions] = useState<boolean>(false);

  const handleQualityClick = (quality: string) => {
    const qualityClick = videoSource.filter(
      (videoQuality) => videoQuality.quality === quality
    )[0];
    setVideo(qualityClick);
    setShowQualityOptions(false);
  };

  return (
    <Player autoPlay>
      <HLSSource src={video.url} />
      <BigPlayButton position="center" />
      <LoadingSpinner />
      <ControlBar>
        <ReplayControl seconds={10} />
        <VolumeMenuButton vertical />
        <ForwardControl seconds={10} />
        <div className="relative">
          <button
            className="flex items-center justify-center"
            onClick={() => setShowQualityOptions(!showQualityOptions)}
          >
            <SettingsIcon className="text-white mt-[4.3px]" fontSize="small" />
          </button>
          {showQualityOptions && (
            <ul className="absolute top-[-450%] right-0 bg-[#2b2a2a] p-2 rounded shadow">
              {videoSource.map((source, index) => (
                <li
                  key={`${index}-quality-source`}
                  onClick={() => handleQualityClick(source.quality)}
                  className="cursor-pointer text-white py-1 px-2 hover:bg-[#414040]"
                >
                  {source.quality}
                </li>
              ))}
            </ul>
          )}
        </div>
      </ControlBar>
    </Player>
  );
};

export { VideoPlayer };
