"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle, Grid, List } from "lucide-react";
import { PRODUCT_STATS } from "@/constants/navigation";
import { getCategoriesQuery } from "@/lib/api/queries/productQueries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductsTable } from "@/modules/products/products-table";
import { ProductsGrid } from "@/modules/products/products-grid";
import { CreateProductModal } from "@/modules/products/create-product-dialog";
import { StatsCard } from "@/modules/dashboard/stats-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProductsDashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const { data: categories = [] } = useQuery(getCategoriesQuery());

  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col gap-4 px-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            Products
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your product inventory, add new products, and more.
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {PRODUCT_STATS.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-medium">Product Inventory</h3>
              <p className="text-sm text-muted-foreground">
                Manage and organize your product catalog.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Tabs
                value={viewMode}
                onValueChange={(value) => setViewMode(value as "list" | "grid")}
                className="w-[200px]"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="list" className="flex items-center gap-2">
                    <List className="h-4 w-4" />
                    <span className="hidden sm:inline">List</span>
                  </TabsTrigger>
                  <TabsTrigger value="grid" className="flex items-center gap-2">
                    <Grid className="h-4 w-4" />
                    <span className="hidden sm:inline">Grid</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
              <Input
                placeholder="Search products..."
                className="w-full sm:w-[200px] md:w-[300px]"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
              <Select
                value={selectedCategory}
                onValueChange={(value) => {
                  setSelectedCategory(value);
                  setCurrentPage(1); // Reset to first page on category change
                }}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Render the appropriate view based on the viewMode state */}
        {viewMode === "list" ? (
          <ProductsTable
            searchQuery={searchQuery}
            categoryFilter={selectedCategory}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        ) : (
          <ProductsGrid
            searchQuery={searchQuery}
            categoryFilter={selectedCategory}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <CreateProductModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        categories={categories}
      />
    </div>
  );
}
