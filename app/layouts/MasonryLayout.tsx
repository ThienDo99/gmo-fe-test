import {
  UnsplashPhoto,
  Index as AdvertisementCard,
} from "~/components/AdvertisementCard";
import { Index as CardImg } from "../components/CardImg";

import { IProduct } from "~/types/response";
import { gridContainer, gridItem } from "./style.css";

export interface ImageData {
  id: string;
  url: string;
  altText: string;
  products: IProduct[];
}

export const MasonryLayout = ({
  combinedItems,
}: {
  combinedItems: ImageData[] | UnsplashPhoto[];
}) => {
  return (
    <div className={gridContainer}>
      {(combinedItems || []).map((item) => (
        <div key={item.id} className={gridItem}>
          {"slug" in item ? (
            <AdvertisementCard
              slug={item.slug}
              description={item.description}
              urls={item.urls}
              alt_description={item.alt_description}
            />
          ) : (
            <CardImg
              key={item.id}
              url={item.url}
              altText={item.altText}
              id={item.id}
              products={item.products}
            />
          )}
        </div>
      ))}
    </div>
  );
};
