import { formatTimeToNow } from "@/lib/utils";
import { Post, User, Vote } from "@prisma/client";
import { useRef } from "react";
import { FiMessageSquare } from "react-icons/fi";
import EditorOutput from "./EditorOutput";

interface PostProps {
    communityName: string;
    post: Post & {
        author: User;
        votes: Vote[];
    };
    commentAmount: number;
}

export default function Post({
    communityName,
    post,
    commentAmount,
}: PostProps) {
    const pRef = useRef<HTMLDivElement>(null);
    return (
        <div className="rounded-md shadow bg-white">
            <div className="px-6 py-4 flex justify-between">
                {/* post votes */}

                <div className="w-0 flex-1">
                    <div className="max-h-40 mt-1 text-xs text-gray-500">
                        {communityName ? (
                            <>
                                <a
                                    className="hover:underline text-zinc-900 text-sm underline-offset-2"
                                    href={`/com/${communityName}`}
                                >
                                    com/{communityName}
                                </a>

                                <span className="px-1">•</span>
                            </>
                        ) : null}
                        <span>Posted by {post.author.name}</span>
                        <span className="px-1">•</span>
                        {formatTimeToNow(new Date(post.createdAt))}
                    </div>
                    <a href={`com/${communityName}/post/${post.id}`}>
                        <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
                            {post.title}
                        </h1>
                    </a>
                    <div
                        className="relative text-sm max-h-40 w-full overflow-clip"
                        ref={pRef}
                    >
                        <EditorOutput content={post.content} />
                        {pRef.current?.clientHeight === 160 ? (
                            <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent" />
                        ) : null}
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 z-20 text-sm p-4 sm:px-6">
                <a
                    className="w-fit flex items-center gap-2"
                    href={`com/${communityName}/post/${post.id}`}
                >
                    <FiMessageSquare className="w-4 h-4" />
                    {commentAmount > 0 ? commentAmount : null}
                    {""}
                    {commentAmount > 0 ? "comments" : "no comments"}
                </a>
            </div>
        </div>
    );
}
