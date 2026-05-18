import { Button } from "@heroui/react";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { FaBookOpen } from "react-icons/fa";



export default function NotFound () {
  return (
    <div className="px-4 container mx-auto min-h-screen flex flex-col justify-center items-center bg-black text gap-4 lg:gap-5">
      <h1 className="text-xl xs:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
        Page Not Found!
      </h1>
      <div className="flex items-center gap-2">
        <Link href={"/"}>
          <Button className="flex items-center rounded-xs font-bold bg-green-500">
          <AiFillHome />
          <span>Go Home</span>
        </Button>
        </Link>
        <Link href={"/rooms"}>
          <Button className="flex items-center rounded-xs font-bold bg-green-500">
          <FaBookOpen />
          <span>Go Rooms</span>
        </Button>
        </Link>
      </div>
    </div>
  );
}