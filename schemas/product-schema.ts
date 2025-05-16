import { z } from "zod";

export const productFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  price: z.coerce
    .number()
    .min(0.01, { message: "Price must be greater than 0." }),
  stock: z.coerce
    .number()
    .int()
    .min(0, { message: "Stock cannot be negative." }),
  image: z.string().optional(),
});

export type TProductFormValues = z.infer<typeof productFormSchema>;
