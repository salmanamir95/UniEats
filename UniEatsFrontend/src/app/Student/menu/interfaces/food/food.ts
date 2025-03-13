import { Review } from "../review/review";

export interface Food {
    id: number;
  name: string;
  price: number;
  reviews: Review[];
}
