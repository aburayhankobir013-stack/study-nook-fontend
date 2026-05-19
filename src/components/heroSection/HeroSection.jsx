import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";



export default function HeroSection () {
  return (
    <div className="container mx-auto border flex flex-col">
      <figure className="relative w-full h-75 xs:h-100 md:h-125 lg:h-150 xl:h-180">
        <Image src={"/assets/images/hero_image.png"} alt="Hero image" fill/>
      </figure>
      <div className="bg-green-100 py-2 flex items-center justify-center gap-2">
        <Link href={"/register"}>
          <Button className="bg-green-400 rounded-xs font-semibold">Go To Register</Button>
        </Link>
        <Link href={"/login"}>
          <Button variant="outline" className="rounded-xs bg-white font-semibold">Go To Login</Button>
        </Link>
      </div>
    </div>
  );
}