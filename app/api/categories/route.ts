import { NextResponse } from "next/server";
import { PRODUCT_CATEGORIES } from "@/constants/categories";

export async function GET() {
  try {
    return NextResponse.json(PRODUCT_CATEGORIES);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      {
        error: { message: "Failed to fetch categories", type: "SERVER_ERROR" },
      },
      { status: 500 },
    );
  }
}
