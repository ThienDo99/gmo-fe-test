import { style } from "@vanilla-extract/css";

export const imageStyle = style({
  opacity: 0,
  transition: "opacity 0.7s ease-in-out",
  width: "100%",
});

export const imageVisible = style({
  opacity: 1,
});
