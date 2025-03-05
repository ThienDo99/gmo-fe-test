import { style } from "@vanilla-extract/css";

export const pullToRefresh = style({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    backgroundColor: "#F1F5F9",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    margin: "8px",
    padding: "16px",
    color: "black",
});

export const gridContainer = style({
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "8px",
    padding: "0 8px",
    gridAutoRows: "10px",
    "@media": {
        "screen and (min-width: 640px)": {
            padding: "16px",
        },
        "screen and (min-width: 1024px)": {
            gridTemplateColumns: "repeat(3, 1fr)",
        },
    },
});
