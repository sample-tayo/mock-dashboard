import { NextResponse } from "next/server";
import { PRODUCT_CATEGORIES } from "@/constants/categories";
import { getCategoryImage } from "@/utils/image-utils";
import type { IProduct } from "@/types/product";

// mock data for products
const mockProducts: IProduct[] = Array.from({ length: 50 }, (_, i) => {
  const category =
    PRODUCT_CATEGORIES[Math.floor(Math.random() * PRODUCT_CATEGORIES.length)];
  return {
    id: `PROD-${(i + 1).toString().padStart(4, "0")}`,
    name: `Product ${i + 1}`,
    description: `This is a description for Product ${i + 1}. It contains all the details about the product including features, specifications, and usage instructions.`,
    category,
    price: Number.parseFloat((Math.random() * 1000 + 10).toFixed(2)),
    stock: Math.floor(Math.random() * 100),
    createdAt: new Date(
      Date.now() - Math.floor(Math.random() * 10000000000),
    ).toISOString(),
    image: getCategoryImage(category),
  };
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id;
    const product = mockProducts.find((p) => p.id === id);

    if (!product) {
      return NextResponse.json(
        { error: { message: "Product not found", type: "RESOURCE_NOT_FOUND" } },
        { status: 404 },
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: { message: "Failed to fetch product", type: "SERVER_ERROR" } },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id;
    const updates = await request.json();

    const index = mockProducts.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: { message: "Product not found", type: "RESOURCE_NOT_FOUND" } },
        { status: 404 },
      );
    }

    // update product
    const updatedProduct: IProduct = {
      ...mockProducts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    mockProducts[index] = updatedProduct;

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: { message: "Failed to update product", type: "SERVER_ERROR" } },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id;

    const index = mockProducts.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: { message: "Product not found", type: "RESOURCE_NOT_FOUND" } },
        { status: 404 },
      );
    }

    // remove product
    mockProducts.splice(index, 1);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: { message: "Failed to delete product", type: "SERVER_ERROR" } },
      { status: 500 },
    );
  }
}
