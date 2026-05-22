import RoomDetails from "@/components/roomDetails/RoomDetails";


export default async function DetailsPage ({params}) {
  const {roomId} = await params;
  
  const response = await fetch(`http://localhost:5000/room_details/${roomId}`);
  const room = await response.json();
  return (
    <RoomDetails room = {room}/>
  );
}