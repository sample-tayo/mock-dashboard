import { ProductService } from "@/http/services/product-service";
import type { IProduct } from "@/types/product";
import type { UseMutationOptions } from "@tanstack/react-query";

const productService = new ProductService();

export const createProduct = async (
  productData: Partial<IProduct>,
): Promise<IProduct> => {
  return productService.createProduct(productData);
};

export const updateProduct = async (
  productData: IProduct,
): Promise<IProduct> => {
  return productService.updateProduct(productData);
};

export const deleteProduct = async (productId: string): Promise<void> => {
  return productService.deleteProduct(productId);
};

// mutations functions
export const createProductMutation = (
  options?: Omit<
    UseMutationOptions<IProduct, Error, Partial<IProduct>>,
    "mutationFn"
  >,
) => ({
  mutationFn: createProduct,
  ...options,
});

export const updateProductMutation = (
  options?: Omit<UseMutationOptions<IProduct, Error, IProduct>, "mutationFn">,
) => ({
  mutationFn: updateProduct,
  ...options,
});

export const deleteProductMutation = (
  options?: Omit<UseMutationOptions<void, Error, string>, "mutationFn">,
) => ({
  mutationFn: deleteProduct,
  ...options,
});
