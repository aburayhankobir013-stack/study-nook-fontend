import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session && !session?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/add_room", "/my_listings", "/my_bookings"],
};
