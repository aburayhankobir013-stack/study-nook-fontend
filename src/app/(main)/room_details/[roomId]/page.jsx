import RoomDetails from "@/components/roomDetails/RoomDetails";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export default async function DetailsPage ({params}) {
  const {roomId} = await params;
  const session = await auth.api.getSession({
      headers: await headers(),
    });
  
  const response = await fetch(`http://localhost:5000/room_details/${roomId}`);
  const room = await response.json();
  return (
    <RoomDetails room = {room} session = {session}/>
  );
}