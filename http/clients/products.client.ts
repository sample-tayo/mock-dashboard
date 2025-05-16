import type { IProduct, IProductsResponse } from "@/types/product";
import { BaseApiClient } from "./base.client";

export class ProductClient extends BaseApiClient {
  constructor(token?: string) {
    super("/api", token);
  }

  // Get all products with filtering and pagination
  async getProducts(
    page = 1,
    pageSize = 10,
    search = "",
    category = "all",
  ): Promise<IProductsResponse> {
    const params: Record<string, unknown> = {
      page,
      pageSize,
    };

    if (search) {
      params.search = search;
    }

    if (category && category !== "all") {
      params.category = category;
    }

    return this.get<IProductsResponse>("/products", { params });
  }

  // Get a single product by ID
  async getProductById(id: string): Promise<IProduct> {
    return this.get<IProduct>(`/products/${id}`);
  }

  // Create a new product
  async createProduct(product: Partial<IProduct>): Promise<IProduct> {
    return this.post<IProduct, Partial<IProduct>>("/products", product);
  }

  // Update an existing product
  async updateProduct(product: IProduct): Promise<IProduct> {
    return this.put<IProduct, IProduct>("/products", product);
  }

  // Update specific fields of a product
  async patchProduct(
    id: string,
    updates: Partial<IProduct>,
  ): Promise<IProduct> {
    return this.patch<IProduct, Partial<IProduct>>(`/products/${id}`, updates);
  }

  // Delete a product
  async deleteProduct(id: string): Promise<void> {
    return this.delete<void>(`/products/${id}`);
  }

  // Get all categories
  async getCategories(): Promise<string[]> {
    return this.get<string[]>("/categories");
  }
}
