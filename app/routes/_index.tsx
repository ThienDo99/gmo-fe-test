import { useEffect, useRef, useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { fetcher } from "utils/helpers";
import InfiniteScroll from "components/InfiniteScroll";
import { FETCH_URL, totalPage } from "utils/constants";
import { IData } from "types/response";
import Tooltip from "@mui/material/Tooltip";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [data, setData] = useState<IData[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

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
        <div key={index} style={{ marginBottom: "2rem", position: "relative" }}>
          {/* Video Section */}
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

          {/* Masonry Layout for Images */}
          <ul
            style={{
              columnCount: 3,
              columnGap: "1rem",
              marginTop: "1rem",
            }}
          >
            {(items || []).map(({ id, url, altText, products }) => (
              <li
                key={id}
                style={{
                  breakInside: "avoid",
                  marginBottom: "1rem",
                  position: "relative",
                }}
                onMouseEnter={() => setHoveredImage(id)}
                onMouseLeave={() => {
                  setHoveredImage(null);
                }}
              >
                <img
                  src={url}
                  alt={altText}
                  loading="lazy"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    display: "block",
                  }}
                />
                {/* Product Tags (Only Show When Hovered) */}
                {hoveredImage === id &&
                  products?.map(
                    ({ id, dotCoordinates, price, tagPosition }) => (
                      <Tooltip
                        key={id}
                        title={
                          <div className="text-black bg-white p-1 m-2">${price}</div>
                        }
                        placement={tagPosition}
                      >
                        <div
                          key={id}
                          style={{
                            position: "absolute",
                            top: `${dotCoordinates.y}%`,
                            left: `${dotCoordinates.x}%`,
                            transform: "translate(-50%, -50%)",
                            width: "30px",
                            height: "30px",
                            backgroundColor: "blue",
                            borderRadius: "50%",
                            opacity: "inherit",
                            // boxShadow: "0 0 8px rgba(0, 37, 204, 0.8)",
                            cursor: "pointer",
                          }}
                        ></div>
                      </Tooltip>
                    )
                  )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </InfiniteScroll>
  );
}
