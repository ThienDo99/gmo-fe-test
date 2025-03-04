import { useState } from "react";
import { CardImg } from "../components/CardImg";
import {
  AdvertisementCard,
  UnsplashPhoto,
} from "../components/AdvertisementCard";

export interface ImageData {
  id: string;
  url: string;
  altText: string;
}

export const MasonryLayout = ({
  combinedItem,
  index,
}: {
  combinedItem: ImageData | UnsplashPhoto;
  index: number;
}) => {
  const [loadingItems, setLoadingItems] = useState<string[]>([]);
  const heights = [100, 400, 200, 250, 300, 350, 400, 450, 500];

  const handleOnClick = (id: string) => {
    setLoadingItems((prev) => [...prev, id]);

    setTimeout(() => {
      setLoadingItems((prev) => prev.filter((itemId) => itemId !== id));
    }, 2000);
  };

  return "slug" in combinedItem ? (
    <AdvertisementCard
      slug={combinedItem.slug}
      description={combinedItem.description}
      urls={combinedItem.urls}
      alt_description={combinedItem.alt_description}
      height={heights[index]}
    />
  ) : (
    <CardImg
      key={combinedItem.id}
      url={combinedItem.url}
      altText={combinedItem.altText}
      isLoading={loadingItems.includes(combinedItem.id)}
      onClick={() => handleOnClick(combinedItem.id)}
      height={heights[index]}
    />
  );
};
