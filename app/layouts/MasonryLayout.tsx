import { CardImg } from "../components/CardImg";
import {
  AdvertisementCard,
  UnsplashPhoto,
} from "../components/AdvertisementCard";
import { IProduct } from "types/response";

export interface ImageData {
  id: string;
  url: string;
  altText: string;
  products: IProduct[];
}

export const MasonryLayout = ({
  combinedItem,
  index,
}: {
  combinedItem: ImageData | UnsplashPhoto;
  index: number;
}) => {
  const heights = [100, 400, 200, 250, 300, 350, 400, 450, 500];

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
      id={combinedItem.id}
      products={combinedItem.products}
      height={heights[index]}
    />
  );
};
