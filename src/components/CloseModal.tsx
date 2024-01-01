"use client";
import React from "react";
import { Button } from "./ui/button";
import { MdOutlineClose } from "react-icons/md";
import { useRouter } from "next/navigation";

function CloseModal() {
    const route = useRouter();

    return (
        <button onClick={() => route.back()}>
            <MdOutlineClose className="h-6 w-6 text-black font-bold" />
        </button>
    );
}

export default CloseModal;
