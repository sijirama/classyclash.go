import { useCustomToast } from "@/hooks/use-custom-toast";
import { usePrevious } from "@mantine/hooks";
import { VoteType } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { PostVoteType } from "@/lib/validators/vote";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

interface Props {
    postId: string;
    initialVotesAmount: number;
    initialVote?: VoteType | null;
}

function PostVoteClient({ postId, initialVotesAmount, initialVote }: Props) {
    const { loginToast } = useCustomToast();
    const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmount);
    const [currentVote, setCurrentVote] = useState(initialVote);
    const prevVote = usePrevious(currentVote);

    const router = useRouter();

    useEffect(() => {
        setCurrentVote(initialVote);
    }, [initialVote]);

    const { mutate: vote } = useMutation({
        mutationFn: async (voteType: VoteType) => {
            const payload: PostVoteType = {
                postId,
                voteType,
            };
            await axios.patch("/api/community/post/vote", payload);
        },
        onSuccess: () => {
            router.refresh();
        },
        onError: (err, voteType) => {
            if (voteType === "UP") setVotesAmt((prev) => prev - 1);
            else setVotesAmt((prev) => prev + 1);

            // reset current vote
            setCurrentVote(prevVote);

            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    return loginToast;
                }
            }

            return toast({
                title: "Something went wrong",
                description: "Your vote was not registered, please try again",
                variant: "destructive",
            });
        },
        onMutate: (type: VoteType) => {
            if (currentVote == type) {
                setCurrentVote(undefined);
                if (type == "UP") setVotesAmt((prev) => prev - 1);
                else if (type == "DOWN") setVotesAmt((prev) => prev + 1);
            } else {
                setCurrentVote(type);
                if (type === "UP")
                    setVotesAmt((prev) => prev + (currentVote ? 2 : 1));
                else if (type === "DOWN")
                    setVotesAmt((prev) => prev - (currentVote ? 2 : 1));
            }
        },
    });

    return (
        <div className="flex sm:flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0">
            <Button
                onClick={() => vote("UP")}
                size="sm"
                variant="ghost"
                aria-label="upvote"
            >
                <ArrowBigUp
                    className={cn("h-5 w-5 text-zinc-700", {
                        "text-emerald-500 fill-emerald-500 ":
                            currentVote === "UP",
                    })}
                />
            </Button>

            <p className="text-center py-2 font-medium text-sm text-zinc-900 ">
                {votesAmt}
            </p>
            <Button
                onClick={() => vote("DOWN")}
                size="sm"
                variant="ghost"
                aria-label="downvote"
            >
                <ArrowBigDown
                    className={cn("h-5 w-5 text-zinc-700", {
                        "text-red-500 fill-red-500 ": currentVote === "DOWN",
                    })}
                />
            </Button>
        </div>
    );
}

export default PostVoteClient;
