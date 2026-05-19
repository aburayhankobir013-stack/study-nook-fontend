import { useState } from "react";
import NavLink from "../navlink/NavLink";
import { Avatar, Button } from "@heroui/react";
import Link from "next/link";

export default function MobileView() {
  const [isSession, setIsSession] = useState(true);
  return (
    <div className="border absolute bg-white w-full flex flex-col items-center gap-2 p-2 z-50 md:hidden">
      {/* Main container */}
      {isSession ? (
        <>
          <ul className="flex flex-col items-center gap-1">
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
          <ul className="flex flex-col items-center gap-1">
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
        {isSession ? (
          <>
            <div className="flex flex-col items-center gap-1"> 
              <Avatar>
                <Avatar.Image
                  alt="John Doe"
                  src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
                />
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar>
              <h1 className="font-semibold text-green-500">Abu Rayhan Kobir</h1>
              <Button variant="outline" className="rounded-xs px-2 py-1 font-bold bg-green-500 text-white">Logout</Button>
            </div>
            
          </>
        ) : (
          <>
            <div className="flex items-center gap-1">
              <Link href = {"/register"}>
                <Button variant="outline" className="rounded-xs bg-green-500 font-bold text-white">Register</Button>
                
              </Link>
              <Link href={"/login"}>
                <Button variant="outline" className="rounded-xs font-bold">Login</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
