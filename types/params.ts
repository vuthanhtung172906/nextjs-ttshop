export interface IProductParams {
  page?: number;
  limit?: number;
  sort?: 'createdAt' | '-createdAt' | 'price' | '-price' | '-sold';
  [key: string]: any;
}

export interface ICategory {
  name: string;
  _id: string;
  [key: string]: any;
}
