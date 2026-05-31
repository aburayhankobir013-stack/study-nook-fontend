import Card from "@/components/card/Card";

export const metadata = {
  title: "All Rooms Page",
};

export default async function RoomsPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/rooms`,
  );
  const rooms = await response.json();
  if (rooms.length === 0) {
    <div className="min-h-screen container mx-auto border flex justify-center items-center bg-green-100">
      <h1 className="text-xl text-red-500">No Rooms Available Now!</h1>
    </div>;
  }
  return (
    <div className="container mx-auto border p-4 bg-green-100">
      <div className="flex flex-col md:flex-row md:justify-between justify-center items-center md:text-left text-center gap-2 p-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg xs:text-xl text-green-900 font-bold">
            All Study Rooms
          </h1>
          <p className="font-semibold text-green-700">
            You can brows all rooms now!
          </p>
        </div>
        <div className="border px-2 py-1 rounded-xs bg-green-400  text-lg font-bold text-white">
          Total {rooms.length} Rooms Created
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <Card key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
}
