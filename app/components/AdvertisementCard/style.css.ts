import { style, styleVariants } from "@vanilla-extract/css";

export const imageStyle = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "0.5rem",
});

export const centerItemStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
});

export const cardBase = style({
  position: "relative",
  breakInside: "avoid",
  padding: "1rem",
  borderRadius: "0.5rem",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-in-out",
  aspectRatio: "3 / 4",
});

export const cardStyle = styleVariants({
  loading: [
    cardBase,
    {
      backgroundColor: "white",
      border: "1px solid #D1D5DB",
    },
  ],
  notLoading: [
    cardBase,
    {
      color: "white",
      cursor: "pointer",
      ":hover": {
        opacity: 0.8,
      },
    },
  ],
});

export const slugLabel = style({
  position: "absolute",
  top: "1rem",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "white",
  padding: "4px 12px",
  fontSize: "0.875rem",
  fontWeight: "600",
  borderRadius: "4px",
});
