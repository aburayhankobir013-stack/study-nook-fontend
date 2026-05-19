"use client";
import { GiHamburgerMenu, GiOpenBook } from "react-icons/gi";
import NavLink from "../navlink/NavLink";
import MobileView from "./MobileView";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Avatar, Button } from "@heroui/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending, error, refetch } = authClient.useSession();
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };
  return (
    <header className="container mx-auto border w-full sticky top-0 z-50 bg-white">
      <nav className="flex items-center justify-between px-2 py-1">
        {/* Logo section */}
        <div className="flex items-center gap-2 flex-none">
          <GiOpenBook size={25} className="text-green-500" />
          <span className="hidden md:inline font-bold text-lg bg-linear-to-r from-green-600 to-indigo-600 bg-clip-text text-transparent">
            Study Nook
          </span>
        </div>
        {/* Hamburger icon */}
        <span className="md:hidden flex-1 font-bold text-lg bg-linear-to-r from-green-600 to-indigo-600 bg-clip-text text-transparent text-center">
          Study Nook
        </span>
        <div className="md:hidden flex-0">
          {isOpen ? (
            <>
              <RxCross2
                className="cursor-pointer"
                onClick={() => setIsOpen((prevCondition) => !prevCondition)}
              />
            </>
          ) : (
            <>
              <GiHamburgerMenu
                className="cursor-pointer"
                onClick={() => setIsOpen((prevCondition) => !prevCondition)}
              />
            </>
          )}
        </div>
        {session ? (
          <>
            <ul className="hidden md:flex items-center gap-2">
              <li>
                <NavLink href={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink href={"/rooms"}>Rooms</NavLink>
              </li>
              <li>
                <NavLink href={"/add_room"}>Add Room</NavLink>
              </li>
              <li>
                <NavLink href={"/my_listings"}>My Listings</NavLink>
              </li>
              <li>
                <NavLink href={"/my_bookings"}>My Bookings</NavLink>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul className="hidden md:flex items-center gap-2">
              <li>
                <NavLink href={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink href={"/rooms"}>Rooms</NavLink>
              </li>
            </ul>
          </>
        )}
        <div>
          {session ? (
            <>
              <div className="hidden md:flex items-center gap-2">
                <Avatar>
                  <Avatar.Image
                    alt={session?.user.name}
                    src={session?.user.image}
                  />
                  <Avatar.Fallback>
                    {session?.user.name.charAt(0)}
                  </Avatar.Fallback>
                </Avatar>
                <h1 className="font-semibold text-green-500 text-center">
                  {`Hi, ${session?.user.name}`}
                </h1>
                <Button
                  variant="outline"
                  className="rounded-xs px-2 py-1 font-bold bg-green-500 text-white"
                  onClick={handleSignOut}
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="hidden md:flex items-center gap-1">
                <Link href={"/register"}>
                  <Button
                    variant="outline"
                    className="rounded-xs bg-green-500 font-bold text-white"
                  >
                    Register
                  </Button>
                </Link>
                <Link href={"/login"}>
                  <Button variant="outline" className="rounded-xs font-bold">
                    Login
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </nav>
      {isOpen && (
        <>
          <MobileView session={session} handleSignOut={handleSignOut}/>
        </>
      )}
    </header>
  );
}
