import { style } from "@vanilla-extract/css";

export const cardImgContainer = style({
  position: "relative",
  padding: "0",
  borderRadius: "0.5rem",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-in-out",
  color: "white",
  cursor: "pointer",
  display: "inline-block",
  width: "100%",
  aspectRatio: "3 / 4",
});

export const imgStyle = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "0.5rem",
  position: "absolute",
});
