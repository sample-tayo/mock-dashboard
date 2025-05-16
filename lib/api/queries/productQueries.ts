/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductService } from "@/http/services/product-service";
import { queryKeys } from "@/lib/api/queryKeys";
import type { UseQueryOptions } from "@tanstack/react-query";
import type { IProductsResponse } from "@/types/product";

const productService = new ProductService();

export const fetchProducts = async (
  page = 1,
  pageSize = 10,
  searchQuery = "",
  categoryFilter = "all",
): Promise<IProductsResponse> => {
  return productService.getProducts(
    page,
    pageSize,
    searchQuery,
    categoryFilter,
  );
};

export const fetchProductById = async (id: string) => {
  return productService.getProductById(id);
};

export const fetchCategories = async (): Promise<string[]> => {
  return productService.getCategories();
};

export const getProductsQuery = (
  page = 1,
  pageSize = 10,
  searchQuery = "",
  categoryFilter = "all",
  options?: Omit<UseQueryOptions<IProductsResponse>, "queryKey" | "queryFn">,
) => ({
  queryKey: queryKeys.products.list({
    page,
    search: searchQuery,
    category: categoryFilter,
  }),
  queryFn: () => fetchProducts(page, pageSize, searchQuery, categoryFilter),
  ...options,
});

export const getProductByIdQuery = (
  id: string,
  options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">,
) => ({
  queryKey: queryKeys.products.detail(id),
  queryFn: () => fetchProductById(id),
  ...options,
});

export const getCategoriesQuery = (
  options?: Omit<UseQueryOptions<string[]>, "queryKey" | "queryFn">,
) => ({
  queryKey: queryKeys.categories.all,
  queryFn: fetchCategories,
  ...options,
});
