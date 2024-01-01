"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CreateCommunityPayload } from "@/lib/validators/community";
import { toast } from "@/hooks/use-toast";
import { useCustomToast } from "@/hooks/use-custom-toast";

function page() {
    const [input, setInput] = useState<string>("");
    const router = useRouter();
    const { loginToast } = useCustomToast();

    // create community logic
    const { mutate: createCommunity, isLoading } = useMutation({
        mutationFn: async () => {
            const payload: CreateCommunityPayload = {
                name: input,
            };
            const { data } = await axios.post("/api/community", payload);
            return data as string;
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 409) {
                    return toast({
                        title: "Commnunity already exists",
                        description: "Please choose a different community name",
                        variant: "destructive",
                    });
                }
                if (err.response?.status === 422) {
                    setInput("");
                    return toast({
                        title: "Invalid community name",
                        description:
                            "Please choose a community name between 1 and 3 characters",
                        variant: "destructive",
                    });
                }
                if (err.response?.status === 401) {
                    return loginToast();
                }
            }
            toast({
                title: "There was an error",
                description: "Could not create subreddit",
            });
        },
        onSuccess: (community) => {
            router.push(`/com/${community}`);
        },
    });

    const Loading = input.length <= 3 || isLoading;

    return (
        <div className="container flex items-center h-full max-w-3xl mx-auto">
            <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold ">
                        Create a community
                    </h1>
                </div>
                <hr className="bg-zinc-500 h-px" />
                <div>
                    <p className="text-lg font-medium">Name</p>
                    <p className="text-xs pb-4 text-zinc-800 tracking-wide">
                        Community names including capitalization cannot be
                        changed
                    </p>
                    <div className="relative">
                        <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-700 pl-2">
                            com/
                        </p>
                        <Input
                            className="pl-11"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-end gap-4">
                    <Button
                        className="bg-red-500"
                        variant="destructive"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={Loading}
                        onClick={() => createCommunity()}
                    >
                        Create Community
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default page;
