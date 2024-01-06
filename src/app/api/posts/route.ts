import { getUserSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const session = await getUserSession();
    let followedCommunitiesId: string[] = [];

    if (session) {
        const followedCommunities = await db.subscription.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                community: true,
            },
        });
        followedCommunitiesId = followedCommunities.map(
            ({ community }) => community.id,
        );
    }

    try {
        const { limit, page, communityName } = z
            .object({
                limit: z.string(),
                page: z.string(),
                communityName: z.string().nullish().optional(),
            })
            .parse({
                communityName: url.searchParams.get("communityName"),
                limit: url.searchParams.get("limit"),
                page: url.searchParams.get("limit"),
            });
        let whereClause = {};
        if (communityName) {
            whereClause = {
                community: {
                    name: communityName,
                },
            };
        } else if (session) {
            whereClause = {
                community: {
                    id: {
                        in: followedCommunitiesId,
                    },
                },
            };
        }

        const post = await db.post.findMany({
            take: parseInt(limit),
            skip: (parseInt(page) - 1) * parseInt(limit),
            orderBy: {
                createdAt: "desc",
            },
            include: {
                community: true,
                votes: true,
                author: true,
                comments: true,
            },
            where: whereClause,
        });

        return new Response(JSON.stringify(post));
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse("Invalid request data passed", {
                status: 422,
            });
        }
        return new NextResponse(
            "Coult not fetch more posts",
            { status: 500 },
        );
    }
}
