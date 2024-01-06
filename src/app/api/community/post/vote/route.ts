import { getUserSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { PostVoteValidator } from "@/lib/validators/vote";
import { CachedPost } from "@/types/redis";
import { NextResponse } from "next/server";
import { z } from "zod";

const CACHE_AFTER_UPVOTES = 1;

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const vote = PostVoteValidator.parse(body);
        const seesion = await getUserSession();

        if (!seesion?.user) {
            return new Response("Unauthorized", { status: 401 });
        }

        const existingVote = await db.vote.findFirst({
            where: {
                userId: seesion.user.id,
                postId: vote.postId,
            },
        });

        const post = await db.post.findFirst({
            where: {
                id: vote.postId,
            },
            include: {
                author: true,
                votes: true,
            },
        });

        if (!post) {
            return new Response("Post not found", { status: 404 });
        }

        if (existingVote) {
            if (existingVote.type === vote.voteType) {
                await db.vote.delete({
                    where: {
                        userId_postId: {
                            postId: vote.postId,
                            userId: seesion.user.id,
                        },
                    },
                });
                return new Response("ok");
            }

            await db.vote.update({
                where: {
                    userId_postId: {
                        postId: vote.postId,
                        userId: seesion.user.id,
                    },
                },
                data: {
                    type: vote.voteType,
                },
            });

            //recount the votes, and cache
            const votesAmt = post.votes.reduce((sum, vote) => {
                if (vote.type === "UP") sum + 1;
                if (vote.type === "DOWN") sum - 1;
                return sum;
            }, 0);

            if (votesAmt >= CACHE_AFTER_UPVOTES) {
                const cachePayload: CachedPost = {
                    authorUsername: post.author.username ?? "",
                    content: JSON.stringify(post.content),
                    id: post.id,
                    title: post.title,
                    currentVote: vote.voteType,
                    createdAt: post.createdAt,
                };

                await redis.hset(`post:${vote.postId}`, cachePayload);
            }
            return new Response("OK");
        }

        await db.vote.create({
            data: {
                type: vote.voteType,
                userId: seesion.user.id,
                postId: vote.postId,
            },
        });

        //recount the votes, and cache
        const votesAmt = post.votes.reduce((sum, vote) => {
            if (vote.type === "UP") sum + 1;
            if (vote.type === "DOWN") sum - 1;
            return sum;
        }, 0);

        if (votesAmt >= CACHE_AFTER_UPVOTES) {
            const cachePayload: CachedPost = {
                authorUsername: post.author.username ?? "",
                content: JSON.stringify(post.content),
                id: post.id,
                title: post.title,
                currentVote: vote.voteType,
                createdAt: post.createdAt,
            };

            await redis.hset(`post:${vote.postId}`, cachePayload);
        }
        return new Response("OK");
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse("Invalid request data passed", {
                status: 422,
            });
        }
        return new NextResponse(
            "Could not register your vote, please try again later",
            { status: 500 },
        );
    }
}
