import { NextResponse } from "next/server";
import { PRODUCT_CATEGORIES } from "@/constants/categories";
import { getCategoryImage } from "@/utils/image-utils";
import type { IProduct } from "@/types/product";

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1");
    const pageSize = Number.parseInt(searchParams.get("pageSize") || "10");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "all";

    // search filter
    let filteredProducts = [...mockProducts];
    if (search) {
      const query = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query),
      );
    }

    // category filter
    if (category && category !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category,
      );
    }

    // calculate pagination
    const totalPages = Math.ceil(filteredProducts.length / pageSize);
    const startIndex = (page - 1) * pageSize;
    const paginatedProducts = filteredProducts.slice(
      startIndex,
      startIndex + pageSize,
    );

    return NextResponse.json({
      products: paginatedProducts,
      totalPages,
      currentPage: page,
      totalProducts: filteredProducts.length,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: { message: "Failed to fetch products", type: "SERVER_ERROR" } },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const productData = await request.json();

    if (
      !productData.name ||
      !productData.category ||
      productData.price === undefined
    ) {
      return NextResponse.json(
        {
          error: {
            message: "Missing required fields",
            type: "VALIDATION_ERROR",
          },
        },
        { status: 400 },
      );
    }

    // Create a new product with generated ID and timestamp
    const newProduct: IProduct = {
      id: `PROD-${(mockProducts.length + 1).toString().padStart(4, "0")}`,
      name: productData.name,
      description: productData.description || "",
      category: productData.category,
      price: productData.price,
      stock: productData.stock || 0,
      createdAt: new Date().toISOString(),
      image: getCategoryImage(productData.category),
    };

    // add and update our mock data
    mockProducts.unshift(newProduct);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: { message: "Failed to create product", type: "SERVER_ERROR" } },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const productData: IProduct = await request.json();

    if (!productData.id) {
      return NextResponse.json(
        {
          error: {
            message: "Product ID is required",
            type: "VALIDATION_ERROR",
          },
        },
        { status: 400 },
      );
    }

    const index = mockProducts.findIndex((p) => p.id === productData.id);

    if (index === -1) {
      return NextResponse.json(
        { error: { message: "Product not found", type: "RESOURCE_NOT_FOUND" } },
        { status: 404 },
      );
    }

    const updatedProduct: IProduct = {
      ...productData,
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
