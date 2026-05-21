import Card from "./Card";


export default async function HomeCardContainer () {
  const response = await fetch(`http://localhost:5000`);
  const limitedRooms = await response.json();
  return (
    <div className="container mx-auto border grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4 bg-green-100">
      {limitedRooms.map((room) => <Card key={room._id} room={room}/>)}
    </div>
  );
}