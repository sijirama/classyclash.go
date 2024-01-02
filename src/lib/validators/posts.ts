import { z } from "zod";

export const PostValidator = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be more than 3 characters" })
        .max(128, { message: "Title must not be more than 128 characters" }),
    communityId: z.string(),
    content: z.any(),
});

export type PostType = z.infer<typeof PostValidator>;
