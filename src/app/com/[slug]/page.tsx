import MiniCreatePost from "@/components/MiniCreatePost";
import { PostFeed } from "@/components/PostFeed";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { getUserSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface Props {
    params: {
        slug: string;
    };
}

export default async function page({ params }: Props) {
    const { slug } = params;
    const session = await getUserSession();
    const community = await db.community.findFirst({
        where: {
            name: slug,
        },
        include: {
            posts: {
                include: {
                    author: true,
                    votes: true,
                    comments: true,
                    community: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS,
    });

    if (!community) {
        return notFound();
    }
    return (
        <main>
            <h1 className="font-bold text-2xl md:text-3xl h-14">
                <span className="text-zinc-400">com/</span>
                {community.name}
            </h1>
            <MiniCreatePost session={session} />
            {/* TODO: show posts from feed */}
            <PostFeed
                initialPost={community.posts}
                communityName={community.name}
            />
        </main>
    );
}
