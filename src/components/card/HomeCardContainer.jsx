import { Button } from "@heroui/react";
import Card from "./Card";
import Link from "next/link";

export default async function HomeCardContainer() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}`);
  const limitedRooms = await response.json();
  return (
    <div className="container mx-auto border p-4 bg-green-100">
      <div className="flex flex-col md:flex-row md:justify-between justify-center items-center md:text-left text-center gap-2 p-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg xs:text-xl text-green-900 font-bold">
            Available Study Rooms
          </h1>
          <p className="font-semibold text-green-700">
            Hand-picked rooms recently added to Study Nook
          </p>
        </div>
        <Link href={"/rooms"}>
          <Button
            variant="outline"
            className="rounded-xs bg-green-500 text-white font-bold"
          >
            <span>All Rooms</span>
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {limitedRooms.map((room) => (
          <Card key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
}
