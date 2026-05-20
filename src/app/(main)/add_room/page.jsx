import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export default async function AddRoomPage() {
  const {token} = await auth.api.getToken({
    headers: await headers(),
  });
  
  console.log(token);

  return (
    <div className="min-h-screen container mx-auto border">
      I am add room page!
    </div>
  );
}