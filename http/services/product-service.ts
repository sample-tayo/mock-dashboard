import type { IProduct, IProductsResponse } from "@/types/product";
import { ProductClient } from "../clients/products.client";

export class ProductService {
  private client: ProductClient;

  constructor(token?: string) {
    this.client = new ProductClient(token);
  }

  // Get all products with filtering and pagination
  async getProducts(
    page = 1,
    pageSize = 10,
    search = "",
    category = "all",
  ): Promise<IProductsResponse> {
    return this.client.getProducts(page, pageSize, search, category);
  }

  // Get a single product by ID
  async getProductById(id: string): Promise<IProduct> {
    return this.client.getProductById(id);
  }

  // Create a new product
  async createProduct(product: Partial<IProduct>): Promise<IProduct> {
    return this.client.createProduct(product);
  }

  // Update an existing product
  async updateProduct(product: IProduct): Promise<IProduct> {
    return this.client.updateProduct(product);
  }

  // Update specific fields of a product
  async patchProduct(
    id: string,
    updates: Partial<IProduct>,
  ): Promise<IProduct> {
    return this.client.patchProduct(id, updates);
  }

  // Delete a product
  async deleteProduct(id: string): Promise<void> {
    return this.client.deleteProduct(id);
  }

  // Get all categories
  async getCategories(): Promise<string[]> {
    return this.client.getCategories();
  }
}
