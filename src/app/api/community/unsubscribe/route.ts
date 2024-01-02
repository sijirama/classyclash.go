import { getUserSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CommunitySubscriptionValidator } from "@/lib/validators/community";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const session = await getUserSession();
        if (!session?.user) {
            return new NextResponse("Unauthorised", { status: 401 });
        }
        const { communityId } = CommunitySubscriptionValidator.parse(
            await req.json(),
        );
        const subscriptionExists = await db.subscription.findFirst({
            where: {
                communityId,
                userId: session.user.id,
            },
        });
        if (!subscriptionExists) {
            return new NextResponse(
                "You are not subscribed to this community",
                {
                    status: 400,
                },
            );
        }

        // check if user is the creator of the community
        const creator = await db.community.findFirst({
            where: {
                id: communityId,
                creatorId: session.user.id,
            },
        });

        if (creator) {
            return new NextResponse(
                "You acnt unsubscribe from your own community",
                { status: 400 },
            );
        }

        await db.subscription.delete({
            where: {
                userId_communityId: {
                    communityId,
                    userId: session.user.id,
                },
            },
        });
        return new NextResponse(communityId);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse("Invalid request data passed", {
                status: 422,
            });
        }
        return new NextResponse(
            "Coult not unsubscribe to community, pls try again later",
            { status: 500 },
        );
    }
}
