export interface IProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt?: string;
  image?: string;
}

export interface IProductsResponse {
  products: IProduct[];
  totalPages: number;
  currentPage: number;
  totalProducts: number;
}

export type TProductFormValues = {
  id?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
};
