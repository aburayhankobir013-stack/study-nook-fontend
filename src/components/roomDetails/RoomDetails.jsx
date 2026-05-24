"use client";

import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import { FaUserEdit } from "react-icons/fa";
import { GiFloorHatch } from "react-icons/gi";
import { GrGroup } from "react-icons/gr";
import { IoBookmarks } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import UpdateDetails from "./UpdateDetails";
import {useOverlayState} from "@heroui/react";
import DeleteRoom from "./DeleteRoom";
import BookingForm from "./BookingForm";

export default function RoomDetails({ room, session }) {
  const updateState = useOverlayState({
    defaultOpen: false,
  });
  const deleteState = useOverlayState({
    defaultOpen: false,
  });
  const bookingState = useOverlayState({
    defaultOpen: false,
  });
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
    createdDate,
    user,
  } = room;

  const { name, email, image } = user;
  const {email: sessionEmail} = session.user;
    
  return (
    <div className="container mx-auto border p-4 bg-green-100">
      <div>
        <div className="flex flex-col gap-2 md:flex-row">
          {/* Top section */}
          <div className="p-4 border bg-white flex flex-col gap-2 md:flex-1 shadow-xs shadow-green-500 rounded-xs">
            <figure className="relative w-full h-50 xs:h-75">
              <Image
                src={image_url}
                alt={room_name}
                fill
                className="object-cover rounded-xs"
              />
            </figure>
            <div className="flex flex-col gap-2">
              <div>
                <h1 className="font-bolt text-lg font-bold text-green-950">{room_name}</h1>
                <p className="font-semibold text-green-700">
                  {new Date(createdDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <p className="font-semibold text-green-950">{description}</p>
              <div className="border p-4 rounded-xs flex flex-col gap-2">
                <h1 className="text-center font-bold text-lg text-green-950">Anemities</h1>
                <div className="grid grid-cols-2 gap-2">
                {anemities.map((anemitie, index) => (
                  <span
                    key={index}
                    className="border rounded-xs px-2 py-0.5 font-semibold bg-green-100 flex items-center justify-center text-xs"
                  >
                    {anemitie.toUpperCase()}
                  </span>
                ))}
              </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:flex-1">
            <div className="border flex flex-col gap-2 p-4 bg-white shadow-xs shadow-green-500 rounded-xs">
              <h1 className="font-bold text-lg text-green-950">
                ${rate} Per Hour
              </h1>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 border px-2 py-0.5 rounded-xs bg-green-100">
                  <GiFloorHatch size={15} />
                  <span className="font-bold text-green-950 text-xs xs:text-base">
                    {floor} Floor
                  </span>
                </div>
                <div className="flex items-center gap-1 border px-2 py-0.5 rounded-xs bg-green-100">
                  <GrGroup size={15} />
                  <span className="font-bold text-green-950 text-xs xs:text-base">
                    {capacity} Peoples
                  </span>
                </div>
                <div className="flex items-center gap-1 border px-2 py-0.5 rounded-xs bg-green-100">
                  <TbBrandBooking size={15} />
                  <span className="font-bold text-green-950 text-xs xs:text-base">
                    {total_booked} Bookings
                  </span>
                </div>
              </div>
              {
                sessionEmail === email
                &&
                <>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="rounded-xs flex-1 font-bold bg-green-500 text-white" onPress={updateState.open}>
                      <FaUserEdit />
                      <span>Edit</span>
                    </Button>
                    <Button variant="outline" className="rounded-xs flex-1 bg-red-500 text-white font-bold" onPress={deleteState.open}>
                      <MdDelete />
                      <span>Delete</span>
                    </Button>
                  </div>
                </>
              }
              <Button
                variant="outline"
                className="rounded-xs w-full bg-green-500 font-bold text-white"
              onPress={bookingState.open}>
                <IoBookmarks />
                <span>Book Now</span>
              </Button>
            </div>
            <div className="border flex flex-col items-center gap-2 p-4 bg-green-50 flex-1 shadow-xs shadow-green-500 rounded-xs">
              <h1 className="font-bold text-green-950">LISTED BY</h1>
              <div className="flex flex-col items-center gap-2">
                <Avatar>
                  <Avatar.Image alt={name} src={image} />
                  <Avatar.Fallback>{name.charAt(0)}</Avatar.Fallback>
                </Avatar>
                <div className="flex flex-col items-center text-center gap-1">
                  <h1 className="font-semibold text-green-950">{name}</h1>
                  <p className="italic text-green-700">{email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BookingForm bookingState = {bookingState} details = {{_id, rate, room_name, image_url, sessionEmail}}/>
      <UpdateDetails updateState = {updateState} session = {session} room = {room}/>
      <DeleteRoom deleteState = {deleteState} details = {{_id, image_url, room_name}}/>
    </div>
  );
}
