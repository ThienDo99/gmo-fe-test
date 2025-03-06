import { style } from "@vanilla-extract/css";

export const gridContainer = style({
  display: "grid",
  gridColumnGap: "1.25rem",
  gridRowGap: "1.25rem",
  gridTemplateColumns: " repeat(6, minmax(0, 1fr))",
  "@media": {
    "(max-width: 768px)": {
      gridColumnGap: "0.75rem",
      gridRowGap: "0.75rem",
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    },
  },
  selectors: {
    "& > :nth-child(1) > div": {
      aspectRatio: "3 / 5",
    },

    "& > :nth-child(3) > div": {
      aspectRatio: "3 / 5",
    },
  },
});

export const gridItem = style({
  gridColumn: "span 2",
  gridRow: "span 4",
  selectors: {
    "&:nth-child(2)": {
      gridRow: "span 3",
    },
  },
});
