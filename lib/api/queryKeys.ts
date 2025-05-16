export const queryKeys = {
  products: {
    all: ["products"] as const,
    list: (params?: { search?: string; category?: string; page?: number }) =>
      [...queryKeys.products.all, params] as const,
    detail: (id: string) => [...queryKeys.products.all, id] as const,
  },
  categories: {
    all: ["categories"] as const,
  },
};
