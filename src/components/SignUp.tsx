import Link from "next/link";
import React from "react";
import { IoPeopleCircleSharp } from "react-icons/io5";
import UserAuthForm from "./UserAuthForm";

function SignUp() {
    return (
        <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <div className="flex flex-col space-y-2 text-center">
                <IoPeopleCircleSharp className="text-zinc-800 text-2xl md:text-3xl lg:text-4xl mx-auto" />
                <h1 className="text-2xl font-semibold tracking-tight ">
                    Create an Account
                </h1>
                <p className="text-sm max-w-xs mx-auto">
                    By continuing, you are setting up a new Alma account and
                    agree to our User Agreement and Privacy Policy.
                </p>

                <UserAuthForm />

                <p className="px-8 text-center text-sm text-zinc-700">
                    returning to Alma?{" "}
                    <Link
                        href={"/signin"}
                        className="hover:text-zinc-800 text-sm underline underline-offset-4 "
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
