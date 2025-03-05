import { Fragment, useEffect, useRef, useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { fetcher } from "utils/helpers";
import { isFibonacci } from "utils/isFibonacci";
import { UnsplashPhoto } from "~/components/AdvertisementCard";
import { MasonryLayout } from "~/layouts/MasonryLayout";
import VideoPlayer from "~/components/VideoPlayer";
import InfiniteScroll from "~/components/InfiniteScroll";
import { DOMAIN_URL, FETCH_URL, totalPage } from "utils/constants";
import { IData } from "types/response";
import { useLoaderData } from "@remix-run/react";
import useIsMobile from "~/hooks/useIsMobile";
import Loader from "~/components/Loader";

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

export const loader = async () => {
  const advertisements = await fetcher(`${DOMAIN_URL}/data/advertisement.json`);
  return { advertisements };
};
const PullToRefresh = () => {
  return (
    <div
      className={`flex items-center justify-center w-auto bg-slate-100 rounded-lg shadow-lg m-2 p-4`}
    >
      <div className="text-black">↓ Pull to refresh</div>
    </div>
  );
};

export default function Index() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [data, setData] = useState<IData[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { advertisements } = useLoaderData<typeof loader>();
  const isMobile = useIsMobile();
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const [isPulling, setIsPulling] = useState(false);
  const [isLoadingPrev, setIsLoadingPrev] = useState(false);

  const mapData = (currentData = []) => {
    let adIndex = 0;
    let currentIndex = 0;
    const finalData: (ImageData | UnsplashPhoto)[] = [];
    let i = 0;

    while (
      currentIndex < currentData.length ||
      adIndex < advertisements.length
    ) {
      if (isFibonacci(i) && adIndex < advertisements.length) {
        finalData.push(advertisements[adIndex]);
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

  useEffect(
    () => {
      if (!isMobile) return;

      const handleTouchStart = (e: TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
        setIsPulling(false);
      };

      const handleTouchMove = (e: TouchEvent) => {
        const distance = e.touches[0].clientY - touchStartY.current;

        if (distance > 20 && window.scrollY === 0) {
          setIsPulling(true);
        }
      };

      const handleTouchEnd = (e: TouchEvent) => {
        touchEndY.current = e.changedTouches[0].clientY;
        const distance = touchEndY.current - touchStartY.current;

        if (distance > 50 && window.scrollY === 0 && !isLoadingPrev) {
          setIsLoadingPrev(true);
          setIsPulling(false);

          setTimeout(() => {
            fetcher("../data/next.json")
              .then((res) => {
                const mappedData = {
                  video_link: res.video_link,
                  items: mapData(res.items),
                };
                setData((prev) => [mappedData, ...prev] as IData[]);
              })
              .finally(() => {
                setIsLoadingPrev(false);
              });
          }, 0);
        } else {
          setIsPulling(false);
        }
      };

      document.addEventListener("touchstart", handleTouchStart);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.removeEventListener("touchstart", handleTouchStart);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMobile, isLoadingPrev]
  );

  return (
    <>
      {isPulling && <PullToRefresh />}
      <InfiniteScroll hasMore={currentPage < totalPage} onLoadMore={onLoadMore}>
        {isLoadingPrev && <Loader />}
        {data.map(({ video_link, items }, index) => (
          <div key={index}>
            <VideoPlayer
              videoRef={(el) => (videoRefs.current[index] = el)}
              src={video_link}
            />
            <div
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 px-2 sm:p-4"
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
    </>
  );
}
