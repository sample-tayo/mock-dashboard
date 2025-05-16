"use client";

import { Calendar, Package, Tag, DollarSign, BarChart3, X } from "lucide-react";
import type { IProduct } from "@/types/product";
import { formatCurrency, formatDate } from "@/utils/format-utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface IViewProductDialogProps {
  product: IProduct;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewProductDialog({
  product,
  open,
  onOpenChange,
}: IViewProductDialogProps) {
  const formattedPrice = formatCurrency(product.price);
  const formattedDate = formatDate(product.createdAt);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-0 sm:max-w-[650px]">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>

        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative h-64 w-full md:h-auto md:w-1/2">
            <Image
              src={product.image || "/sample.jpg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 md:hidden">
              <h2 className="text-xl font-semibold text-white">
                {product.name}
              </h2>
              <div className="mt-1 flex items-center justify-between">
                <Badge className="bg-white/90 text-primary">
                  {product.category}
                </Badge>
                <span className="font-semibold text-white">
                  {formattedPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-1 flex-col p-6">
            {/* Title section - only visible on desktop */}
            <div className="mb-4 hidden md:block">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold">
                  {product.name}
                </DialogTitle>
                <div className="mt-2 flex items-center gap-3">
                  <Badge variant="secondary" className="px-2 py-1 text-sm">
                    {product.category}
                  </Badge>
                  <span className="text-xl font-bold">{formattedPrice}</span>
                </div>
              </DialogHeader>
            </div>

            {/* Stock & Date */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Badge
                variant={product.stock > 10 ? "outline" : "destructive"}
                className="flex items-center gap-1 px-2 py-1"
              >
                <BarChart3 className="h-3 w-3" />
                <span>{product.stock} in stock</span>
              </Badge>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                Added {formattedDate}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Description */}
            <div className="mb-4">
              <h3 className="mb-2 text-sm font-medium">Description</h3>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>

            <Separator className="my-4" />

            {/* Product Details */}
            <div className="grid grid-cols-1 gap-y-4 xs:grid-cols-2 xs:gap-x-6">
              <div className="space-y-1">
                <h3 className="text-xs font-medium text-muted-foreground">
                  Product ID
                </h3>
                <div className="flex items-center">
                  <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="select-all font-mono text-xs">
                    {product.id}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs font-medium text-muted-foreground">
                  Category
                </h3>
                <div className="flex items-center">
                  <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{product.category}</span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs font-medium text-muted-foreground">
                  Price
                </h3>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{formattedPrice}</span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs font-medium text-muted-foreground">
                  Stock
                </h3>
                <div className="flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{product.stock} units</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto"
              >
                Close
              </Button>
              <Button variant="default" className="w-full sm:w-auto">
                Edit Product
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
