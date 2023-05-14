export interface TopCategoryType {
  title: string;
  value: string;
  imageName: string;
}

export interface CategoryType {
  location_id: string[];
  location_name: string[];
  no_of_products: number;
  parent_id: null;
  image_url: string;
  _id: string;
  category_name: string;
  posted_by: string;
  posted_user: string;
  posted_date: Date;
  __v: number;
  slug?: string;
  items:any;
}
