import { AiTwotoneSchedule } from "react-icons/ai";
import { BsBrowserSafari } from "react-icons/bs";
import { FaBook } from "react-icons/fa";



export default function HowItWork () {
  return (
    <div className="container mx-auto border bg-green-100 p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-bold text-green-950">How It Works</h1>
          <p className="font-semibold text-green-900">From browsing to booked in under a minute</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1 items-center border p-4 shadow-green-500 shadow-xs hover:shadow-md bg-green-300 text-center">
            <BsBrowserSafari size={25}/>
            <div className="flex flex-col items-center">
              <span className="font-bold text-green-950">STEP 1</span>
              <h1 className="font-semibold text-lg">Brows Rooms</h1>
            </div>
            <p>Filter by floor, capacity, amenities or hourly rate to find your fit.</p>
          </div>
          <div className="flex flex-col gap-1 items-center border p-4 shadow-green-500 shadow-xs hover:shadow-md bg-green-300 text-center">
            <AiTwotoneSchedule size={25}/>
            <div className="flex flex-col items-center">
              <span className="font-bold text-green-950">STEP 2</span>
              <h1 className="font-semibold text-lg">Pick a Time</h1>
            </div>
            <p>Choose a date and an open time slot, will prevent any conflicts.</p>
          </div>
          <div className="flex flex-col gap-1 items-center border p-4 shadow-green-500 shadow-xs hover:shadow-md bg-green-300 text-center">
            <FaBook size={25}/>
            <div className="flex flex-col items-center">
              <span className="font-bold text-green-950">STEP 3</span>
              <h1 className="font-semibold text-lg">Study Peacefully</h1>
            </div>
            <p>Get a confirmation, show up and focus. Manage everything from your dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
}