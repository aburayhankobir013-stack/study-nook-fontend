import { AiOutlineFileProtect } from "react-icons/ai";
import { MdManageAccounts } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";



export default function WhyStudyNook () {
  return (
    <div className="container mx-auto border bg-green-100 flex flex-col gap-5 items-center text-center p-4">
      <div>
        <h1 className="text-lg font-bold text-green-950">Why Study Nook</h1>
        <p className="font-semibold text-green-900">Build around the way real students study quiet, focused and on your schedule.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex gap-1 flex-col items-center p-4 bg-green-300 rounded-xs shadow-green-500 shadow-xs hover:shadow-md">
          <TbBrandBooking size={30}/>
          <h1 className="text-lg font-semibold text-green-950">Easy Booking</h1>
          <p>Pick a date, choose an hour, see the cost done. No back-and-forth emials paperwork.</p>
        </div>
        <div className="flex gap-1 flex-col items-center p-4 bg-green-300 rounded-xs shadow-green-500 shadow-xs hover:shadow-md">
          <AiOutlineFileProtect size={25}/>
          <h1 className="text-lg font-semibold text-green-950">Conflict Free Scheduling</h1>
          <p>Smart overlap detection prevents double-bookings, so the room you reserve in the room you get.</p>
        </div>
        <div className="flex gap-1 flex-col items-center p-4 bg-green-300 rounded-xs shadow-green-500 shadow-xs hover:shadow-md">
          <MdManageAccounts size={25}/>
          <h1 className="text-lg font-semibold text-green-950">Manage Your Listings</h1>
          <p>Own a room? List it, set your hourly rate, and keep full control from your dashboard.</p>
        </div>
      </div>
    </div>
  );
}