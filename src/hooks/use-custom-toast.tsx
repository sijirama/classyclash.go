import Link from "next/link";
import { toast } from "./use-toast";
import { buttonVariants } from "@/components/ui/button";

export const useCustomToast = () => {
    const loginToast = () => {
        const { dismiss } = toast({
            title: "Login required",
            description: "You need to be logged in do that",
            variant: "destructive",
            action: (
                <Link
                    href="/signin"
                    className={buttonVariants({ variant: "default" })}
                    onClick={() => dismiss()}
                >
                    Login
                </Link>
            ),
        });
    };

    return { loginToast };
};
