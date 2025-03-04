import type { MetaFunction } from "@remix-run/node";
import { Fragment, useEffect, useState } from "react";
import { fetcher } from "utils/helpers";
import { isFibonacci } from "utils/isFibonacci";
import { UnsplashPhoto } from "~/components/AdvertisementCard";
import VideoPlayer from "~/components/VideoPlayer";
import { MasonryLayout } from "~/layouts/MasonryLayout";

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
  const [combinedData, setCombinedData] = useState<
    (ImageData | UnsplashPhoto)[]
  >([]);
  const [currentVideo, setCurrentVideo] = useState("");

  useEffect(() => {
    Promise.all([
      fetcher("../data/current.json"),
      fetcher("../data/advertisement.json"),
    ])
      .then(([currentData, advertisementData]) => {
        const currentItems: ImageData[] = currentData.items || [];
        setCurrentVideo(currentData.video_link);
        const advertisementItems: UnsplashPhoto[] = advertisementData || [];

        let adIndex = 0;
        let currentIndex = 0;
        const finalData: (ImageData | UnsplashPhoto)[] = [];
        let i = 0;
        
        while (
          currentIndex < currentItems.length ||
          adIndex < advertisementItems.length
        ) {
          if (isFibonacci(i) && adIndex < advertisementItems.length) {
            finalData.push(advertisementItems[adIndex]);
            adIndex++;
          } else if (currentIndex < currentItems.length) {
            finalData.push(currentItems[currentIndex]);
            currentIndex++;
          }
          i++;
        }

        setCombinedData(finalData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <VideoPlayer src={currentVideo} />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
        style={{ gridAutoRows: "10px" }}
      >
        {combinedData.map((item, idx) => (
          <Fragment key={item.id}>
            <MasonryLayout combinedItem={item} index={idx} />
          </Fragment>
        ))}
      </div>
    </>
  );
}
