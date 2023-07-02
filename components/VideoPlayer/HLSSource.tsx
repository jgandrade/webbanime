import React, { useEffect } from "react";
import Hls from "hls.js";

interface HLSSourceProps {
  src: string;
  type?: string;
}

const HLSSource: React.FC<HLSSourceProps> = ({
  src,
  type = "application/x-mpegURL",
}) => {
  let hls: Hls | null = null;

  useEffect(() => {
    const video = document.querySelector("video");

    if (!video) {
      return;
    }

    hls = new Hls();
    if (Hls.isSupported()) {
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return <source src={src} type={type} />;
};

export default HLSSource;
