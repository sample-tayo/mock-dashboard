"use client";

import type { IProduct } from "@/types/product";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditProductForm } from "./form";

interface IEditProductDialogProps {
  product: IProduct;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditProductDialog({
  product,
  open,
  onOpenChange,
}: IEditProductDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to the product information below.
          </DialogDescription>
        </DialogHeader>
        <EditProductForm product={product} onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}
