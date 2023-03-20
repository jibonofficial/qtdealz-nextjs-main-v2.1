export interface UploadReviewImagesResponse {
  success: boolean;
  data: ReviewImageData;
}

export interface ReviewImageData {
  name: string;
  original_name: string;
  size: number;
  type: string;
}

export interface CreateReviewRequest {
  models: CreateReviewModels;
}

export interface CreateReviewModels {
  parent_id: string;
  product_rating: number;
  product_review: string;
  location_id: string;
  location_name: string;
  posted_user: string;
  review_images: ReviewImageData[];
}

export interface ReviewsResponse {
  total: number;
  data: Review[];
  nextPage?: number;
  previousPage?: number;
  rating_summery: RatingSummery[];
}

export interface Review {
  review_images: ReviewImage[];
  _id: string;
  parent_id: string;
  location_id: string;
  location_name: string;
  posted_user: string;
  product_rating: number;
  product_review: string;
  product_name: string;
  parent_sku: string;
  image_name: string;
  posted_by: string;
  posted_date: Date;
  __v: number;
}

export interface ReviewImage {
  name: string;
  original_name: string;
  size: number;
  type: string;
}

export interface RatingSummery {
  total_reviews: number;
  "review_10%": number;
  "review_20%": number;
  "review_50%": number;
  "review_75%": number;
  "review_100%": number;
  average_rating: number;
}
