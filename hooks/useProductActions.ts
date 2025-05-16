import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
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
        toast({
          title: "Product created",
          description: "Your product has been created successfully.",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to create product. Please try again.",
          variant: "destructive",
        });
      },
    }),
  });

  const updateProduct = useMutation({
    ...updateProductMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
        toast({
          title: "Product updated",
          description: "Your product has been updated successfully.",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to update product. Please try again.",
          variant: "destructive",
        });
      },
    }),
  });

  const deleteProduct = useMutation({
    ...deleteProductMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
        toast({
          title: "Product deleted",
          description: "The product has been deleted successfully.",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to delete product. Please try again.",
          variant: "destructive",
        });
      },
    }),
  });

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      title: "ID Copied",
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
