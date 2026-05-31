import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Link from "next/link";
import { GoPlus } from "react-icons/go";
import Card from "@/components/card/Card";

export default async function MyListingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { email } = session.user;
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/my_listings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
  const my_listings = await response.json();
  if (my_listings.length === 0) {
    return (
      <div className="min-h-screen container mx-auto border flex justify-center items-center bg-green-100">
        <h1 className="text-xl text-red-500">No Room Available Now!</h1>
      </div>
    );
  }
  return (
    <div className="container mx-auto border p-4 bg-green-100">
      <div className="flex flex-col md:flex-row md:justify-between justify-center items-center md:text-left text-center gap-2 p-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg xs:text-xl text-green-900 font-bold">
            My Listings
          </h1>
          <p className="font-semibold text-green-700">
            Rooms you currently host Study Nook
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Link href={"/add_room"}>
          <Button
            variant="outline"
            className="rounded-xs bg-green-500 text-white font-bold"
          >
            <GoPlus />
            <span>Add Room</span>
          </Button>
        </Link>
        <span className="font-bold text-lg text-green-950">You are added {my_listings.length} rooms</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {my_listings.map((room) => (
          <Card key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
}
