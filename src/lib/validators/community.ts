import { z } from "zod";

export const CommunityCreateValidator = z.object({
    name: z.string().min(3).max(21),
});

export const CommunitySubscriptionValidator = z.object({
    communityId: z.string(),
});

export type CreateCommunityPayload = z.infer<typeof CommunityCreateValidator>;
export type CommunitySubscriptionPayload = z.infer<
    typeof CommunitySubscriptionValidator
>;
