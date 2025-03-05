interface IItem {
  id: string;
  url: string;
  altText: string;
  products: {
    id: string;
    dotCoordinates: {
      x: number;
      y: number;
    };
    tagPosition: string;
  }[];
}

export interface IData {
  video_link: string;
  items: IItem[];
}
