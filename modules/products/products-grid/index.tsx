"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Eye, Edit, Trash, MoreHorizontal, Copy } from "lucide-react";
import { getProductsQuery } from "@/lib/api/queries/productQueries";
import { useProductActions } from "@/hooks/useProductActions";
import type { IProduct } from "@/types/product";
import { formatCurrency } from "@/utils/format-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditProductDialog } from "@/modules/products/edit-product-dialog";
import { ViewProductDialog } from "@/modules/products/view-product-dialog";
import { DeleteProductDialog } from "@/modules/products/delete-product-dialog";
import { GridSkeleton } from "./grid-skeleton";
import Image from "next/image";

interface IProductsGridProps {
  searchQuery: string;
  categoryFilter: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function ProductsGrid({
  searchQuery,
  categoryFilter,
  currentPage,
  onPageChange,
}: IProductsGridProps) {
  const [editProduct, setEditProduct] = useState<IProduct | null>(null);
  const [viewProduct, setViewProduct] = useState<IProduct | null>(null);
  const [deleteProductData, setDeleteProductData] = useState<IProduct | null>(
    null,
  );
  const pageSize = 12; // More products per page for grid view

  const { handleCopyId, deleteProduct } = useProductActions();

  const { data, isLoading, isError } = useQuery(
    getProductsQuery(currentPage, pageSize, searchQuery, categoryFilter),
  );

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  if (isLoading) {
    return <GridSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-destructive">
          Error loading products. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden transition-all hover:shadow-md"
          >
            <div className="aspect-square w-full overflow-hidden">
              <Image
                src={product.image || "/sample.jpg"}
                alt={product.name}
                width={500}
                height={500}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="px-2 py-1 text-xs">
                    {product.category}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => handleCopyId(product.id)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy ID
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setViewProduct(product)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEditProduct(product)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => setDeleteProductData(product)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <h3 className="line-clamp-1 text-lg font-semibold">
                  {product.name}
                </h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {product.description}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="font-medium">{formatCurrency(product.price)}</div>
              <Badge variant={product.stock > 10 ? "default" : "destructive"}>
                {product.stock} in stock
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="flex h-40 items-center justify-center rounded-md border">
          <p className="text-muted-foreground">No products found.</p>
        </div>
      )}

      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{products.length}</span> of{" "}
          <span className="font-medium">{data?.totalProducts || 0}</span>{" "}
          products
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="text-sm">
            Page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      {editProduct && (
        <EditProductDialog
          product={editProduct}
          open={!!editProduct}
          onOpenChange={(open) => !open && setEditProduct(null)}
        />
      )}

      {viewProduct && (
        <ViewProductDialog
          product={viewProduct}
          open={!!viewProduct}
          onOpenChange={(open) => !open && setViewProduct(null)}
        />
      )}

      {deleteProductData && (
        <DeleteProductDialog
          product={deleteProductData}
          open={!!deleteProductData}
          onOpenChange={(open) => !open && setDeleteProductData(null)}
          onConfirm={() => {
            deleteProduct.mutate(deleteProductData.id);
          }}
          isDeleting={deleteProduct.isPending}
        />
      )}
    </div>
  );
}
