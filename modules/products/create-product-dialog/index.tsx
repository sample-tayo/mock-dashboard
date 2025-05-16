"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateProductForm } from "./form";

interface ICreateProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: string[];
}

export function CreateProductModal({
  open,
  onOpenChange,
  categories,
}: ICreateProductModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new product in your inventory.
          </DialogDescription>
        </DialogHeader>
        <CreateProductForm
          onOpenChange={onOpenChange}
          categories={categories}
        />
      </DialogContent>
    </Dialog>
  );
}
