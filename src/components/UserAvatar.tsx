import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { AvatarProps } from "@radix-ui/react-avatar";

interface UserAccountNavProps extends AvatarProps {
    user: Pick<User, "name" | "image">;
}
export function UserAvatar({ user, ...props }: UserAccountNavProps) {
    return (
        <Avatar {...props}>
            {user.image ? (
                <div className="relative aspect-square h-full w-full">
                    <Image
                        fill
                        src={user.image}
                        alt="profile picture"
                        referrerPolicy="no-referrer"
                    />
                </div>
            ) : (
                <AvatarFallback>
                    <span className="sr-only">{user.name}</span>
                </AvatarFallback>
            )}
        </Avatar>
    );
}
