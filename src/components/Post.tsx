import { formatTimeToNow } from "@/lib/utils";
import { Post, User, Vote } from "@prisma/client";
import { format } from "date-fns";

interface PostProps {
    communityName: string;
    post: Post & {
        author: User;
        votes: Vote[];
    };
}

export default function Post({ communityName, post }: PostProps) {
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
                        {"  "}
                        {formatTimeToNow(new Date(post.createdAt))}
                    </div>
                    <a href={`com/${communityName}/post/${post.id}`}>
                        <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
                            {post.title}
                        </h1>
                    </a>
                </div>
            </div>
        </div>
    );
}
