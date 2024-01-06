"use client";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/lib/config";
import { ExtendedPost } from "@/types/db";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import Post from "./Post";

interface PostFeedProps {
    initialPost: ExtendedPost[];
    communityName?: string;
}

export function PostFeed({ initialPost, communityName }: PostFeedProps) {
    const lastPostRef = useRef<HTMLElement>(null);
    const { ref, entry } = useIntersection({
        root: lastPostRef.current,
        threshold: 1,
    });

    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        ["infinite-query"],
        async ({ pageParam = 1 }) => {
            const query =
                `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` +
                (!!communityName ? `&communityName=${communityName}` : "");
            const { data } = await axios.get(query);
            return data as ExtendedPost[];
        },
        {
            getNextPageParam: (_, pages) => {
                return pages.length + 1;
            },
            initialData: { pages: [initialPost], pageParams: [1] },
        },
    );

    const posts = data?.pages.flatMap((page) => page) ?? initialPost;

    const session = useSession();

    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchNextPage();
        }
    }, [entry, fetchNextPage]);

    return (
        <ul className="flex flex-col col-span-2 space-y-6 mt-4">
            {posts.map((post, index) => {
                const votesAmtount = post.votes.reduce((sum, vote) => {
                    if (vote.type === "UP") return sum + 1;
                    if (vote.type === "DOWN") return sum - 1;
                    return sum;
                }, 0);

                const currentVote = post.votes.find(
                    (vote) => vote.userId === session.data?.user.id,
                );

                if (index == posts.length - 1) {
                    return (
                        <li key={post.id} ref={ref}>
                            <Post
                                commentAmount={post.comments.length}
                                post={post}
                                communityName={post.community.name}
                                currentVote={currentVote}
                                votesAmt={votesAmtount}
                            />
                        </li>
                    );
                } else {
                    return (
                        <Post
                            key={post.id}
                            commentAmount={post.comments.length}
                            post={post}
                            communityName={post.community.name}
                            currentVote={currentVote}
                            votesAmt={votesAmtount}
                        />
                    );
                }
            })}
        </ul>
    );
}
