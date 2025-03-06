/* eslint-disable jsx-a11y/media-has-caption */
import { ComponentProps } from "react";
import { container, video, videoWrapper } from "./style.css";

export interface IVideoPlayerProps {
  src: string;
  videoRef: ComponentProps<"video">["ref"];
}

export const Index = ({ src, videoRef }: IVideoPlayerProps) => {
  return (
    <div className={container}>
      <div className={videoWrapper}>
        <video
          ref={videoRef}
          className={video}
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
