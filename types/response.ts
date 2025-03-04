import { TooltipProps } from "@mui/material";

interface IItem {
  id: string;
  url: string;
  altText: string;
  products: {
    price: number;
    id: string;
    dotCoordinates: {
      x: number;
      y: number;
    };
    tagPosition: TooltipProps["placement"];
  }[];
}

export interface IData {
  video_link: string;
  items: IItem[];
}
