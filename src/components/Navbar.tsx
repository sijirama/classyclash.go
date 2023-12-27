import Link from "next/link"
import { IoPeopleCircleSharp } from "react-icons/io5";
import { buttonVariants } from "./ui/button";

export const Navbar = () => {
    return <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
        <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
            {/* logo */}
            <Link href={"/"} className="flex gap-0 items-center ">
                <IoPeopleCircleSharp className="text-zinc-800 text-2xl md:text-3xl" />
                <p className="hidden text-zinc-800 text-sm font-semibold md:block">alma</p>
            </Link>
            {/* searchbar */}


            {/* auth stuff*/}
            <Link href={"signin"} className={buttonVariants()}>sign in</Link>

        </div>
    </div>
}
