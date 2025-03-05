/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Tooltip } from "@mui/material";
import { useState } from "react";
import { IProduct } from "types/response";
import useIsMobile from "~/hooks/useIsMobile";

interface CardImgProps {
  url: string;
  altText: string;
  height?: number;
  products: IProduct[];
  id: string;
}

export const CardImg = ({
  url,
  altText,
  height = 150,
  products,
  id,
}: CardImgProps) => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [clickedTags, setClickedTags] = useState<string[]>([]);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [isImageClicked, setIsImageClicked] = useState(false); // Track mobile click

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
      className="relative p-0 rounded-lg shadow-lg transition-all duration-300 text-white cursor-pointer inline-block w-full"
      role="button"
      tabIndex={0}
      style={{
        gridRowEnd: `span ${Math.ceil(height / 10)}`,
      }}
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
      <img
        src={url}
        alt={altText}
        className="w-full h-full object-cover rounded-lg absolute"
      />

      {(hoveredImage === id || isImageClicked) &&
        products?.map(
          ({ id: productId, dotCoordinates, price, tagPosition }) => {
            const isTooltipOpen =
              clickedTags.includes(productId) || hoveredTag === productId;

            return (
              <Tooltip
                key={productId}
                title={
                  <div className="text-black bg-white p-1 m-2">${price}</div>
                }
                arrow
                placement={tagPosition}
                disableInteractive={false}
                open={isTooltipOpen}
              >
                <div
                  style={{
                    position: "relative",
                    top: `${dotCoordinates.y}%`,
                    left: `${dotCoordinates.x}%`,
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(51, 48, 48, 0.2)",
                    border: isMobile ? "2px solid white" : "3px solid white",
                    borderRadius: "50%",
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
                  <div
                    style={{
                      width: isMobile ? "20px" : "18px",
                      height: isMobile ? "20px" : "18px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    }}
                  ></div>
                </div>
              </Tooltip>
            );
          }
        )}
    </div>
  );
};
