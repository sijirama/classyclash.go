import { getUserSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validators/posts";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const session = await getUserSession();
        if (!session?.user) {
            return new NextResponse("Unauthorised", { status: 401 });
        }
        const { communityId, content, title } = PostValidator.parse(
            await req.json(),
        );

        const subscriptionExists = await db.subscription.findFirst({
            where: {
                communityId,
                userId: session.user.id,
            },
        });

        if (!subscriptionExists) {
            return new NextResponse("Subscribe to post.", {
                status: 400,
            });
        }

        await db.post.create({
            data: {
                title,
                communityId,
                content,
                authorId: session.user.id,
            },
        });

        return new NextResponse("OK");
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse("Invalid request data passed", {
                status: 422,
            });
        }
        return new NextResponse(
            "Coult not post to community, pls try again later",
            { status: 500 },
        );
    }
}
