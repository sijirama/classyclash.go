import { NextAuthOptions } from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import { db } from "./db";

export const authOptions: NextAuthOptions = {
    adapter:PrismaAdapter(db),
    providers: [],

};
