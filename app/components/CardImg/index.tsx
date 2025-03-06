/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Tooltip } from "@mui/material";
import { useState } from "react";
import useIsMobile from "../../hooks/useIsMobile";
import { IProduct } from "../../types/response";
import {
  cardImgContainer,
  imageStyle,
  tagDot,
  tagInner,
  tooltipContent,
} from "./style.css";
import { LazyImage } from "../LazyImage";

interface CardImgProps {
  url: string;
  altText: string;
  height?: number;
  products: IProduct[];
  id: string;
}

export const Index = ({ url, altText, products, id }: CardImgProps) => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [clickedTags, setClickedTags] = useState<string[]>([]);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [isImageClicked, setIsImageClicked] = useState(false);

  const toggleClick = (tagId: string) => {
    setClickedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleImageClick = () => {
    if (isMobile) {
      setIsImageClicked((prev) => !prev);
      setClickedTags([]);
      setHoveredImage((prev) => (prev ? null : id));
    }
  };

  return (
    <div
      className={cardImgContainer}
      role="button"
      tabIndex={0}
      onClick={isMobile ? handleImageClick : undefined}
      onMouseEnter={!isMobile ? () => setHoveredImage(id) : undefined}
      onMouseLeave={
        !isMobile
          ? () => {
              setHoveredImage(null);
              setClickedTags([]);
            }
          : undefined
      }
    >
      <>
        <LazyImage src={url} alt={altText} className={imageStyle} />
        {(hoveredImage === id || isImageClicked) &&
          products?.map(
            ({ id: productId, dotCoordinates, price, tagPosition }) => {
              const isTooltipOpen =
                clickedTags.includes(productId) || hoveredTag === productId;
              return (
                <Tooltip
                  key={productId}
                  title={<div className={tooltipContent}>${price}</div>}
                  arrow
                  placement={tagPosition}
                  disableInteractive={false}
                  open={isTooltipOpen}
                >
                  <div
                    className={tagDot}
                    style={{
                      top: `${dotCoordinates.y}%`,
                      left: `${dotCoordinates.x}%`,
                    }}
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleClick(productId);
                    }}
                    onMouseEnter={
                      !isMobile ? () => setHoveredTag(productId) : undefined
                    }
                    onMouseLeave={
                      !isMobile ? () => setHoveredTag(null) : undefined
                    }
                  >
                    <div className={tagInner}></div>
                  </div>
                </Tooltip>
              );
            }
          )}
      </>
    </div>
  );
};
