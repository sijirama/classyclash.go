import { Community, Post, User, Vote } from "@prisma/client";

export type ExtendedPost = Post & {
    votes: Vote[];
    author: User;
    community: Community;
};
