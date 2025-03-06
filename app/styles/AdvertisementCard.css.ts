import { style, keyframes } from "@vanilla-extract/css";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const card = style({
  position: "relative",
  breakInside: "avoid",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  cursor: "pointer",
});

export const loadingCard = style({
  backgroundColor: "white",
  border: "1px solid #D1D5DB",
});

export const loadedCard = style({
  color: "white",
  ":hover": {
    opacity: 0.8,
  },
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

export const image = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "8px",
});

export const loadingContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
});

export const spinner = style({
  width: "24px",
  height: "24px",
  border: "2px solid rgba(0, 0, 0, 0.1)",
  borderTopColor: "transparent",
  borderRadius: "50%",
  animation: `${spin} 1s linear infinite`,
});
