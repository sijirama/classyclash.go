import { getUserSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CommunityCreateValidator } from "@/lib/validators/community";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request, res: Response) {
    console.log("WE ARE HITTING");
    try {
        const session = await getUserSession();
        if (!session?.user) {
            return new NextResponse("Unauthorised", { status: 401 });
        }
        const { name } = CommunityCreateValidator.parse(await req.json());
        const communityExists = await db.community.findFirst({
            where: {
                name: name,
            },
        });
        if (communityExists) {
            return new NextResponse("Community already exists", {
                status: 409,
            });
        }

        const community = await db.community.create({
            data: {
                name: name,
                creatorId: session.user.id,
            },
        });

        await db.subscription.create({
            data: {
                userId: session.user.id,
                communityId: community.id,
            },
        });

        return new NextResponse(community.name, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(error.message, { status: 422 });
        }
        return new NextResponse("Coult not create community", { status: 500 });
    }
}
