import { Fragment, useEffect, useRef, useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { fetcher } from "utils/helpers";
import { isFibonacci } from "utils/isFibonacci";
import { UnsplashPhoto } from "~/components/AdvertisementCard";
import { MasonryLayout } from "~/layouts/MasonryLayout";
import VideoPlayer from "~/components/VideoPlayer";
import InfiniteScroll from "components/InfiniteScroll";
import { FETCH_URL, totalPage } from "utils/constants";
import { IData } from "types/response";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export interface ImageData {
  id: string;
  url: string;
  altText: string;
}

export default function Index() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [data, setData] = useState<IData[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [advertisementData, setAdvertisementData] = useState<UnsplashPhoto[]>(
    []
  );

  const mapData = (currentData = []) => {
    let adIndex = 0;
    let currentIndex = 0;
    const finalData: (ImageData | UnsplashPhoto)[] = [];
    let i = 0;

    while (
      currentIndex < currentData.length ||
      adIndex < advertisementData.length
    ) {
      if (isFibonacci(i) && adIndex < advertisementData.length) {
        finalData.push(advertisementData[adIndex]);
        adIndex++;
      } else if (currentIndex < currentData.length) {
        finalData.push(currentData[currentIndex]);
        currentIndex++;
      }
      i++;
    }
    return finalData;
  };

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

  useEffect(() => {
    fetcher("../data/advertisement.json").then((data) => {
      setAdvertisementData(data);
    });
  }, []);

  useEffect(
    () => {
      currentPage &&
        fetcher(FETCH_URL.get(currentPage) as string).then((newData) => {
          const mappedData = {
            video_link: newData.video_link,
            items: mapData(newData.items),
          };
          setData((prev) => [...prev, mappedData] as IData[]);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPage]
  );

  const onLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <InfiniteScroll hasMore={currentPage < totalPage} onLoadMore={onLoadMore}>
      {data.map(({ video_link, items }, index) => (
        <div key={index}>
          <VideoPlayer
            videoRef={(el) => (videoRefs.current[index] = el)}
            src={video_link}
          />
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
            style={{ gridAutoRows: "10px" }}
          >
            {(items || []).map((item, idx) => (
              <Fragment key={item.id}>
                <MasonryLayout combinedItem={item} index={idx} />
              </Fragment>
            ))}
          </div>
        </div>
      ))}
    </InfiniteScroll>
  );
}
