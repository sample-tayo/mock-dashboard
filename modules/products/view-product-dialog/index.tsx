"use client";

import { Calendar, Package, Tag, DollarSign, BarChart3 } from "lucide-react";
import type { IProduct } from "@/types/product";
import { formatCurrency, formatDate } from "@/utils/format-utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {product.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-md">
            <Image
              src={product.image || "/sample.jpg"}
              alt={product.name}
              width={500}
              height={500}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <div className="flex flex-col gap-2 xs:flex-row xs:items-center xs:justify-between">
              <Badge variant="outline" className="w-fit px-3 py-1 text-sm">
                {product.category}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                Added on {formattedDate}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Description
              </h3>
              <p className="text-sm">{product.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-3 xs:grid-cols-2">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Product ID
                </h3>
                <div className="flex items-center">
                  <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-mono text-sm">{product.id}</span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Category
                </h3>
                <div className="flex items-center">
                  <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{product.category}</span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Price
                </h3>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{formattedPrice}</span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Stock
                </h3>
                <div className="flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Badge
                    variant={product.stock > 10 ? "default" : "destructive"}
                  >
                    {product.stock} units
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
