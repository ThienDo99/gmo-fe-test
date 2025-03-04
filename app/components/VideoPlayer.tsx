/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef, useState } from "react";

export interface IVideoPlayerProps {
  src: string;
}

const getEmbedUrl = (src: string): string | null => {
  const youtubeMatch = src.match(
    /(?:youtu\.be\/|youtube\.com\/(?:.*v=|embed\/|v\/))([\w-]{11})/
  );
  return youtubeMatch
    ? `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&mute=1`
    : null;
};

const VideoPlayer = ({ src }: IVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPausedManually, setIsPausedManually] = useState(false);
  const embedUrl = getEmbedUrl(src);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (embedUrl) {
            if (!isPausedManually) {
              iframeRef.current?.setAttribute("src", embedUrl);
            }
          } else {
            if (!isPausedManually) {
              videoRef.current?.play();
            }
          }
        } else {
          if (embedUrl) {
            iframeRef.current?.setAttribute("src", "");
          } else {
            videoRef.current?.pause();
          }
        }
      },
      { threshold: 0.5 }
    );

    if (embedUrl && iframeRef.current) {
      observer.observe(iframeRef.current);
    } else if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [embedUrl, isPausedManually]);

  const handlePause = () => {
    setIsPausedManually(true);
    videoRef.current?.pause();
  };

  return (
    <div className="w-full mx-auto p-2">
      <div className="relative w-full pt-[56.25%]">
        {embedUrl ? (
          <iframe
            ref={iframeRef}
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
            src=""
            title="Embedded Video"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
            src={src}
            onPause={handlePause}
            autoPlay
            muted
            controls
            loop
          />
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
