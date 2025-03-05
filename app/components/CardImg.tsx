import { Tooltip } from "@mui/material";
import { useState } from "react";
import { IProduct } from "types/response";

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

  const toggleClick = (tagId: string) => {
    setClickedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };
  return (
    <div
      className="relative p-0 rounded-lg shadow-lg transition-all duration-300 text-white cursor-pointer inline-block w-full"
      role="button"
      tabIndex={0}
      style={{
        gridRowEnd: `span ${Math.ceil(height / 10)}`,
      }}
    >
      <div
        onMouseEnter={() => setHoveredImage(id)}
        onMouseLeave={() => {
          setHoveredImage(null);
          setClickedTags([]);
        }}
      >
        <img
          src={url}
          alt={altText}
          className="w-full h-full object-cover rounded-lg absolute"
        />
        {hoveredImage === id &&
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
                    key={productId}
                    style={{
                      position: "absolute",
                      top: `${dotCoordinates.y}%`,
                      left: `${dotCoordinates.x}%`,
                      transform: "translate(-50%, -50%)",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(51, 48, 48, 0.2)",
                      border: "2px solid white",
                      borderRadius: "50%",
                    }}
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleClick(productId)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        toggleClick(productId);
                      }
                    }}
                    onMouseEnter={() => setHoveredTag(productId)}
                    onMouseLeave={() => {
                      setHoveredTag(null);
                    }}
                  >
                    <div
                      style={{
                        width: "15px",
                        height: "15px",
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
    </div>
  );
};
