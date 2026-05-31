import MyBookings from "@/components/myBookings/MyBookings";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const {email} = session.user;
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/my_bookings?email=${email}`);
  const all_bookings = await response.json();
  if(all_bookings.length === 0) {
    return (
      <div className="min-h-screen container mx-auto border flex justify-center items-center bg-green-100">
        <h1 className="text-xl text-red-500">No Bookings Available Now!</h1>
      </div>
    );
  }
  return <MyBookings all_bookings = {all_bookings}/>;
}
