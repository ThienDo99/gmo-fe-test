/* eslint-disable jsx-a11y/media-has-caption */
import { ComponentProps } from "react";
import * as styles from "../styles/VideoPlayer.css";

export interface IVideoPlayerProps {
  src: string;
  videoRef: ComponentProps<"video">["ref"];
}

const VideoPlayer = ({ src, videoRef }: IVideoPlayerProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          className={styles.video}
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
