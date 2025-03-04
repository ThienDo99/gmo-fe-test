import React from "react";

interface CardImgProps {
  url: string;
  altText: string;
  isLoading: boolean;
  onClick: () => void;
  height?: number;
}

export const CardImg = ({
  url,
  altText,
  isLoading,
  onClick,
  height = 150,
}: CardImgProps) => {
  return (
    <div
      className={`relative break-inside-avoid p-4 rounded-lg shadow-lg transition-all duration-300 ${
        isLoading
          ? "bg-white border border-gray-300"
          : "text-white cursor-pointer hover:opacity-80"
      }`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={() => {}}
      style={{
        gridRowEnd: `span ${Math.ceil(height / 10)}`,
      }}
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="w-6 h-6 border-1 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <img
          src={url}
          alt={altText}
          className="w-full h-full object-cover rounded-lg"
        />
      )}
    </div>
  );
};
