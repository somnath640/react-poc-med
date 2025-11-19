// app/types/products.ts
import type { ImageSourcePropType } from "react-native";
export type Slide = {
    id: string;
    title?: string;              // optional (some slides may not have a title)
    image?: ImageSourcePropType;
    description?: string;
    keyPoints?: string[];
  };
  
  export type Product = {
    id: string;
    name: string;
    tagline?: string;
    indication?: string;
    slides: Slide[];
  };
  