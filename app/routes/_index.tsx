import { Fragment, useEffect, useRef, useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { isFibonacci } from "~/utils/isFibonacci";
import { UnsplashPhoto } from "~/components/AdvertisementCard";
import { MasonryLayout } from "~/layouts/MasonryLayout";
import VideoPlayer from "~/components/VideoPlayer";
import InfiniteScroll from "~/components/InfiniteScroll";
import { DOMAIN_URL, FETCH_URL, totalItem } from "~/utils/constants";
import { IData } from "~/types/response";
import { useLoaderData } from "@remix-run/react";
import useIsMobile from "~/hooks/useIsMobile";
import PullToRefresh from "~/components/PullToRefresh";
import { fetcher } from "~/utils/helpers";

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

export default function Index() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [data, setData] = useState<IData[]>([]);
  const { advertisements } = useLoaderData<typeof loader>();
  const isMobile = useIsMobile();
  const currentPage = useRef(1);
  const isFetchPreviousApi = useRef(false);
  const currentTotalItem = data.reduce(
    (acc, { items }) => acc + items.length,
    0
  );

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

  const fetchData = async (url: string) => {
    return fetcher(url).then((newData) => {
      const mappedData = {
        video_link: newData.video_link,
        items: mapData(newData.items),
      };
      setData((prev) => [...prev, mappedData] as IData[]);
    });
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

  const onLoadMore = () => {
    fetchData(FETCH_URL.get(currentPage.current) as string).finally(() => {
      currentPage.current = currentPage.current + 1;
    });
  };
  const onRefresh = async () => {
    const PREV_API_KEY = 3;

    !isFetchPreviousApi.current &&
      fetchData(FETCH_URL.get(PREV_API_KEY) as string).finally(() => {
        isFetchPreviousApi.current = true;
      });
  };

  return (
    <>
      {isMobile && <PullToRefresh onRefresh={onRefresh} />}
      <InfiniteScroll
        hasMore={currentTotalItem <= totalItem}
        onLoadMore={onLoadMore}
      >
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
