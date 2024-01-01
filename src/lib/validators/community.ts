import { z } from "zod";

export const CommunityCreateValidator = z.object({
    name: z.string().min(3).max(21),
});

export type CreateCommunityPayload = z.infer<typeof CommunityCreateValidator>;
