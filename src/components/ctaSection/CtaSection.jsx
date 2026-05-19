import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";

export default function CtaSection() {
  return (
    <div className="container mx-auto">
      <figure className="relative w-full h-60 xs:h-70 md:h-75 lg:h-90 xl:110 border">
        <Image
          src={"/assets/images/cta_image.png"}
          alt="Cta image"
          fill
          priority
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-lg md:text-xl xl:text-2xl font-bold text-center text-green-950">
            Start Your Smart Learning Journey Today
          </h1>
          <div className="text-center mt-5">
            <Link href={"/register"}>
              <Button className="rounded-xs bg-green-500 font-bold">
                <span>Get Started</span>
                <MdArrowRightAlt />
              </Button>
            </Link>
          </div>
        </div>
      </figure>
    </div>
  );
}
