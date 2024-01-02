"use client";
import React, { startTransition } from "react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { CommunitySubscriptionPayload } from "@/lib/validators/community";
import axios, { AxiosError } from "axios";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Props {
    communityId: string;
    communityName: string;
}

function SubscribeLeaveToggle({ communityId, communityName }: Props) {
    const isSubscribed = false;

    const { loginToast } = useCustomToast();
    const router = useRouter();

    const {} = useMutation({
        mutationFn: async () => {
            const payload: CommunitySubscriptionPayload = {
                communityId,
            };
            const { data } = await axios.post(
                "/api/community/subscribe",
                payload,
            );
            return data as string;
        },

        onSuccess: (data) => {
            startTransition(() => {
                router.refresh();
            });

            return toast({
                title: "Subscribed",
                description: `You are now subscribed to com/${communityName}`,
            });
        },

        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    return loginToast();
                }
            }

            return toast({
                title: "There was a problem trying to subscribe ",
                description: `Could not subscribe to ${communityName}, Please try again later`,
                variant: "destructive",
            });
        },
    });

    return isSubscribed ? (
        <Button className="w-full mt-1 mb-4">Leave community</Button>
    ) : (
        <Button className="w-full mt-1 mb-4">Join community</Button>
    );
}

export default SubscribeLeaveToggle;
