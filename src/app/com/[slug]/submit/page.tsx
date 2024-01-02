import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
    params: {
        slug: string;
    };
}

async function page({ params }: Props) {
    const { slug } = params;

    const community = await db.community.findFirst({
        where: {
            name: slug,
        },
    });
    if (!community) return notFound();

    return (
        <div className="flex flex-col items-start gap-6">
            <div className="border-b border-gray-300 pb-5">
                <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
                    <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
                        Create Post
                    </h3>
                    <p className="ml-2 mt-1 truncate text-sm text-gray-500">
                        in com/{community.name}
                    </p>
                </div>
            </div>
            {/*the fucking form.*/}
            <Editor communityId={community.id} />

            {/*the submit button.*/}
            <div className="w-full flex justify-end">
                <Button
                    type="submit"
                    className="w-full"
                    form="community-post-form"
                >
                    Post
                </Button>
            </div>
        </div>
    );
}

export default page;
