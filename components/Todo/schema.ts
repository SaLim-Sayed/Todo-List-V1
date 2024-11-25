import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});
export type TodoFormData = z.infer<typeof todoSchema>;
