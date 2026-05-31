import RoomDetails from "@/components/roomDetails/RoomDetails";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export async function generateMetadata({ params }) {
  const { roomId } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/room_details/${roomId}`
  );

  const room = await response.json();

  return {
    title: room.room_name,
    description: room.description,
  };
}


export default async function DetailsPage ({params}) {
  const {roomId} = await params;
  const session = await auth.api.getSession({
      headers: await headers(),
    });
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/room_details/${roomId}`);
  const room = await response.json();
  return (
    <RoomDetails room = {room} session = {session}/>
  );
}