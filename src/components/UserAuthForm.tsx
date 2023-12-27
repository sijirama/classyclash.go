"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

function UserAuthForm({ className, ...props }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const loginWithGoogle = async () => {
        setIsLoading(true);
        try {
            await signIn("google");
        } catch (error) {
            toast({
                title: "Uh oh!",
                description: "There was en error logging in with Google",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn("flex justify-center ", className)} {...props}>
            <Button
                onClick={loginWithGoogle}
                disabled={isLoading}
                className="w-full disabled:bg-zinc-700 flex items-center justify-center gap-[0.08rem]"
                size="sm"
            >
                {!isLoading ? (
                    <FaGoogle className="text-white text-lg" />
                ) : null}
                oogle
            </Button>
        </div>
    );
}

export default UserAuthForm;
