import * as z from "zod";

export const addPostSchema = z
  .object({
    categories: z.array(z.number()).min(1, {
      message: "Please choose at least 1 category",
    }),
    title: z.string().min(3, {
      message: "Title must have at least 3 characters",
    }),
    image: z.custom<File>().nullable(),
    content: z.string().min(20, {
      message: "Content must have at least 20 characters",
    }),
  })
  .required();
