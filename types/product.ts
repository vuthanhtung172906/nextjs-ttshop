export interface IProduct {
  product_id?: string;
  title: string;
  price: number | string;
  description: string;
  content: string;
  images: Array<ImageType>;
  checked?: boolean;
  sold?: number | string;
  category: string;
  inStock?: number | string;
  _id?: string;
  quantity?: number;
  color?: string[];
  capacity?: string[];
}

export interface ImageType {
  public_id: string;
  url: string;
}

export interface IProductResponse {
  products: IProduct[];
  pagination: {
    _page: number;
    _limit: number;
    _totalCount: number;
  };
}
