import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createProductMutation,
  deleteProductMutation,
  updateProductMutation,
} from "@/lib/api/mutations/productMutations";
import { queryKeys } from "@/lib/api/queryKeys";

export function useProductActions() {
  const queryClient = useQueryClient();

  const createProduct = useMutation({
    ...createProductMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
        toast.success("Product created", {
          description: "Your product has been created successfully.",
        });
      },
      onError: () => {
        toast.error("Error", {
          description: "Failed to create product. Please try again.",
        });
      },
    }),
  });

  const updateProduct = useMutation({
    ...updateProductMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
        toast.success("Product updated", {
          description: "Your product has been updated successfully.",
        });
      },
      onError: () => {
        toast.error("Error", {
          description: "Failed to update product. Please try again.",
        });
      },
    }),
  });

  const deleteProduct = useMutation({
    ...deleteProductMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
        toast.success("Product deleted", {
          description: "The product has been deleted successfully.",
        });
      },
      onError: () => {
        toast.error("Error", {
          description: "Failed to delete product. Please try again.",
        });
      },
    }),
  });

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.info("ID Copied", {
      description: `Product ID ${id} copied to clipboard.`,
      duration: 2000,
    });
  };

  return {
    createProduct,
    updateProduct,
    deleteProduct,
    handleCopyId,
  };
}
