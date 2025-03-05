/* eslint-disable jsx-a11y/media-has-caption */
import { ComponentProps } from "react";

export interface IVideoPlayerProps {
  src: string;
  videoRef: ComponentProps<"video">["ref"];
}

const VideoPlayer = ({ src, videoRef }: IVideoPlayerProps) => {
  return (
    <div className="w-full mx-auto p-2">
      <div className="relative w-full pt-[56.25%]">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          src={src}
          autoPlay
          muted
          controls
          loop
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
