import * as z from "zod";

export const commentSchema = z
  .object({
    content: z.string().min(1, {
      message: "Comment content is required",
    }),
    id_post: z.number(),
  })
  .required();
