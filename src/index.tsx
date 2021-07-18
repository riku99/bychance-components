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
  address: string;
  lat: number;
  lng: number;
};

export { RecommendationList } from "./Recommendations/List";
export { RecommendationDetail } from "./Recommendations/Detail";
