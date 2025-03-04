import React, { useEffect, useRef } from "react";
import type { MetaFunction } from "@remix-run/node";
import { fetcher } from "utils/helpers";
import InfiniteScroll from "components/InfiniteScroll";
import { FETCH_URL, totalPage } from "utils/constants";
import { IData } from "types/response";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [data, setData] = React.useState<IData[]>([]);
  const [currentPage, setCurrentPage] = React.useState(0);

  const fetchData = (url: string) => {
    fetcher(url).then((newData) => {
      setData((prev) => [...prev, newData]);
    });
  };

  useEffect(() => {
    currentPage && fetchData(FETCH_URL.get(currentPage) as string);
  }, [currentPage]);

  const onLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  // control video play/pause based on visibility
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    videoRefs.current.forEach((video) => {
      if (!video) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        },
        { threshold: 0.5, root: null }
      );

      observer.observe(video);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [data.length]);

  return (
    <InfiniteScroll hasMore={currentPage < totalPage} onLoadMore={onLoadMore}>
      {data.map(({ video_link, items }, index) => (
        <div key={index}>
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            width="100%"
            height="315"
            autoPlay
            muted
            controls
            loop
          >
            <source src={video_link} type="video/mp4" />
          </video>

          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
              width: "20%",
              marginTop: "1rem",
            }}
          >
            {(items || []).map(({ id, url, altText }) => (
              <li key={id}>
                <img src={url} alt={altText} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </InfiniteScroll>
  );
}
