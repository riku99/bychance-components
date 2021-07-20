export type Recommendation = {
  id: number;
  name: string;
  avatar: string | null;
  title: string;
  text: string;
  images: string[];
  coupon: boolean;
  distance?: number;
  url: string | null;
  instagram: string | null;
  twitter: string | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
};

export { RecommendationList } from "./Recommendations/List";
export { RecommendationDetail } from "./Recommendations/Detail";
export { RecommendationItem } from "./Recommendations/Item";
