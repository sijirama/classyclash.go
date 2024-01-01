"use client";

import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { UserAvatar } from "./UserAvatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FaImages } from "react-icons/fa6";
import { PiLink } from "react-icons/pi";

interface Props {
    session: Session | null;
}

function MiniCreatePost({ session }: Props) {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <li className="overflow-hidden rounded-md bg-white shadow">
            <div className="h-full px-6 py-4 sm:flex sm:justify-between gap-3">
                <div className="relative">
                    <UserAvatar
                        user={{
                            name: session?.user.name,
                            image: session?.user.image,
                        }}
                    />
                    <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white"></span>
                </div>
                <Input
                    readOnly
                    onClick={() => {
                        router.push(pathname + "/submit");
                    }}
                    placeholder="Create a Post"
                />
                <Button
                    variant="ghost"
                    onClick={() => {
                        router.push(pathname + "/submit");
                    }}
                >
                    <FaImages />
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => {
                        router.push(pathname + "/submit");
                    }}
                >
                    <PiLink />
                </Button>
            </div>
        </li>
    );
}

export default MiniCreatePost;
