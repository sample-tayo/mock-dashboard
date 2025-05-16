"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  Edit,
  Trash,
  Copy,
  Eye,
  ImageIcon,
} from "lucide-react";
import { getProductsQuery } from "@/lib/api/queries/productQueries";
import { useProductActions } from "@/hooks/useProductActions";
import type { IProduct } from "@/types/product";
import { formatCurrency } from "@/utils/format-utils";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableSkeleton } from "./table-skeleton";

interface IProductsTableProps {
  searchQuery: string;
  categoryFilter: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function ProductsTable({
  searchQuery,
  categoryFilter,
  currentPage,
  onPageChange,
}: IProductsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [editProduct, setEditProduct] = useState<IProduct | null>(null);
  const [viewProduct, setViewProduct] = useState<IProduct | null>(null);
  const [deleteProductData, setDeleteProductData] = useState<IProduct | null>(
    null,
  );
  const pageSize = 10;

  const { handleCopyId, deleteProduct } = useProductActions();

  const { data, isLoading, isError } = useQuery(
    getProductsQuery(currentPage, pageSize, searchQuery, categoryFilter),
  );

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  const columns: ColumnDef<IProduct>[] = [
    {
      accessorKey: "image",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src={row.original.image} alt={row.original.name} />
            <AvatarFallback>
              <ImageIcon className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <div className="flex">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="px-0"
            >
              Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div
          className="max-w-[200px] truncate font-medium"
          title={row.getValue("name")}
        >
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: () => <div className="text-center">Category</div>,
      cell: ({ row }) => (
        <div className="text-center">
          <Badge variant="outline">{row.getValue("category")}</Badge>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <div className="text-right">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="px-0"
            >
              Price
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const price = Number.parseFloat(row.getValue("price"));
        return (
          <div className="text-right font-medium">{formatCurrency(price)}</div>
        );
      },
    },
    {
      accessorKey: "stock",
      header: () => <div className="text-center">Stock</div>,
      cell: ({ row }) => {
        const stock = Number.parseInt(row.getValue("stock"));
        return (
          <div className="text-center">
            <Badge variant={stock > 10 ? "default" : "destructive"}>
              {stock}
            </Badge>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleCopyId(product.id)}>
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
        );
      },
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  if (isLoading) {
    return <TableSkeleton columns={columns.length} />;
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
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="transition-colors hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

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
