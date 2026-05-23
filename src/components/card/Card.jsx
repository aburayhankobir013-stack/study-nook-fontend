import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { GiFloorHatch } from "react-icons/gi";
import { GrGroup } from "react-icons/gr";
import { TbBrandBooking } from "react-icons/tb";

export default function Card({ room }) {
  const {
    _id,
    room_name,
    description,
    image_url,
    floor,
    capacity,
    rate,
    anemities,
    total_booked,
  } = room;
  return (
    <div className="flex flex-col gap-2 w-full border p-4 bg-white rounded-xs shadow-xs shadow-green-500 hover:shadow-md">
      <div>
        <figure className="relative w-full h-50 xs:h-75">
          <Image
            src={image_url}
            alt={room_name}
            fill
            className="object-cover rounded-xs"
          />
        </figure>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-lg text-green-900">{room_name}</h1>
          <span className="bg-green-500 text-white font-bold flex justify-center items-center rounded-xs px-2 py-1 text-xs xs:text-base">${rate}/hour</span>
        </div>
        <p className="font-semibold text-green-700">{description}</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border px-2 py-0.5 rounded-xs bg-green-100">
            <GiFloorHatch size={15}/>
            <span className="font-bold text-green-950 text-xs xs:text-base">{floor}th Floor</span>
          </div>
          <div className="flex items-center gap-1 border px-2 py-0.5 rounded-xs bg-green-100">
            <GrGroup size={15}/>
            <span className="font-bold text-green-950 text-xs xs:text-base">{capacity} Peoples</span>
          </div>
          <div className="flex items-center gap-1 border px-2 py-0.5 rounded-xs bg-green-100">
            <TbBrandBooking size = {15} />
            <span className="font-bold text-green-950 text-xs xs:text-base">{total_booked} Bookings</span>
          </div>
        </div>
        <div className="border grid grid-cols-2 gap-2 p-4 rounded-xs">
          {anemities.map((anemitie, index) => <span key={index} className="border rounded-xs px-2 py-0.5 font-semibold bg-green-100 flex items-center justify-center text-xs xs:text-base">{anemitie.toUpperCase()}</span>)}
        </div>
      </div>
      <div>
        <Link href={`/room_details/${_id}`}>
          <Button variant="outline" className="rounded-xs w-full font-bold bg-green-200 hover:bg-green-300 shadow-xs hover:shadow-md shadow-green-300 text-green-950">View Details</Button>
        </Link>
      </div>
    </div>
  );
}
