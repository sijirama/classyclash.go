import SubscribeLeaveToggle from "@/components/SubscribeLeaveToggle";
import { buttonVariants } from "@/components/ui/button";
import { getUserSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";

const Layout = async ({
    children,
    params: { slug },
}: {
    children: React.ReactNode;
    params: { slug: string };
}) => {
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
                },
            },
        },
    });

    if (!community) return notFound();

    const subsrciption = !session?.user
        ? undefined
        : await db.subscription.findFirst({
              where: {
                  community: {
                      name: slug,
                  },
                  user: {
                      id: session.user.id,
                  },
              },
          });

    const isSubscribed = !!subsrciption;

    const memberCount = await db.subscription.count({
        where: {
            community: {
                name: slug,
            },
        },
    });

    return (
        <div className="sm:container max-w-7xl mx-auto h-full pt-12">
            <div>
                {/* Todo: button to take us back to feed bitch  */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-5 py-6 ">
                    <div className="flex flex-col col-span-2 space-y-6">
                        {children}
                    </div>
                    {/*info side bar*/}
                    <div className="hidden md:block overflow-hidden h-fit rounded-lg border border-gray-300 order-first md:order-last">
                        <div className="px-6 py-4">
                            <p className="font-semibold py-3 ">
                                About com/{community.name}
                            </p>
                        </div>
                        <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
                            <div className="flex justify-between gap-x-4 py-3">
                                <dt className="text-gray-500">Created</dt>
                                <dt className="text-gray-700">
                                    <time
                                        dateTime={community.createdAt.toDateString()}
                                    >
                                        {format(
                                            community.createdAt,
                                            "MMMM d, yyyy",
                                        )}
                                    </time>
                                </dt>
                            </div>
                            <div className="flex justify-between gap-x-4 py-3">
                                <dt className="text-gray-500">Members</dt>
                                <dt className="text-gray-700">{memberCount}</dt>
                            </div>

                            {community.creatorId === session?.user.id ? (
                                <div className="flex justify-between gap-x-4 py-3">
                                    <p className="text-gray-500">
                                        You created this community.
                                    </p>
                                </div>
                            ) : null}

                            {community.creatorId !== session?.user.id ? (
                                <SubscribeLeaveToggle
                                    communityId={community.id}
                                    communityName={community.name}
                                    isSubscribed={isSubscribed}
                                />
                            ) : null}

                            <Link
                                href={`/com/${slug}/submit`}
                                className={buttonVariants({
                                    variant: "outline",
                                    className: "w-full mb-6",
                                })}
                            >
                                Create a Post.
                            </Link>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
