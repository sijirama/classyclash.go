import { getUserSession } from "@/lib/auth";
import { PostVoteValidator } from "@/lib/validators/vote";

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const vote = PostVoteValidator.parse(body);
        const seesion = await getUserSession();

        if (!seesion?.user) {
            return new Response("Unauthorized", { status: 401 });
        }

        

    } catch (error) {}
}
