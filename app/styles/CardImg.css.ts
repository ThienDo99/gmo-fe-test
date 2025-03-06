import { style } from "@vanilla-extract/css";

export const cardContainer = style({
  position: "relative",
  overflow: "hidden",
  display: "inline-block",
  width: "100%",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  cursor: "pointer",
});

export const image = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
  borderRadius: "8px",
});

export const tooltipContent = style({
  backgroundColor: "white",
  color: "black",
  padding: "4px 8px",
  margin: "2px",
  borderRadius: "4px",
});

export const tagDot = style({
  position: "absolute",
  transform: "translate(-50%, -50%)",
  width: "30px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(51, 48, 48, 0.2)",
  border: "3px solid white",
  borderRadius: "50%",
});

export const tagInner = style({
  width: "18px",
  height: "18px",
  backgroundColor: "white",
  borderRadius: "50%",
});

export const masonryGrid = style({
  display: "flex",
  marginLeft: "-8px",
});

export const masonryColumn = style({
  paddingLeft: "8px",
  backgroundClip: "padding-box",
});

export const masonryItem = style({
  marginBottom: "8px",
});
