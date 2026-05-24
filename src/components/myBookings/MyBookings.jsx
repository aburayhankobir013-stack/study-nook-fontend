"use client";
import { Avatar, Button, Table, toast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";


export default function MyBookings({ all_bookings }) {
  const router = useRouter();
  const handleUpdateStatus = async (_id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/my_bookings/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "cancelled",
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Something went wrong!");
      } else {
        toast.success(data.message);
        router.push("/my_bookings");
      }
    } catch (error) {
      toast.danger(error.message);
    }
  };

  const handleBookingDelete = async (_id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/my_bookings/${_id}`, {
        method: "DELETE"
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Something went wrong!");
      } else {
        toast.success(data.message);
        router.push("/my_bookings");
      }
    } catch (error) {
      toast.danger(error.message);
    }
  }
  return (
    <div className="container mx-auto min-h-screen bg-green-100">
      <div className="text-center p-4">
        <h1 className="text-lg font-bold text-green-950">My Bookings</h1>
        <p className="font-semibold text-green-700">
          Manage your upcoming and past room reservations.
        </p>
      </div>
      <Table className="rounded-none  px-2 py-0 bg-transparent">
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Team members"
            className="min-w-5xl rounded-xs"
          >
            <Table.Header className="bg-green-500 border">
              <Table.Column
                isRowHeader
                className="text-white font-semibold text-base"
              >
                Room
              </Table.Column>
              <Table.Column className="text-white font-semibold text-base">
                Date
              </Table.Column>
              <Table.Column className="text-white font-semibold text-base">
                Time
              </Table.Column>
              <Table.Column className="text-white font-semibold text-base">
                Cost
              </Table.Column>
              <Table.Column className="text-white font-semibold text-base">
                Status
              </Table.Column>
              <Table.Column className="text-white font-semibold text-base">
                Action
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {all_bookings.map((booking) => {
                return (
                  <Table.Row
                    key={booking._id}
                    className="hover:bg-green-500 cursor-pointer"
                  >
                    <Table.Cell className="rounded-xs">
                      <div className="w-fit flex flex-col items-center gap-1">
                        <Avatar className="size-15 rounded-xs">
                          <Avatar.Image
                            alt={booking.roomDetails.room_name}
                            src={booking.roomDetails.image_url}
                          />
                          <Avatar.Fallback>
                            {booking.roomDetails.room_name.charAt(0)}
                          </Avatar.Fallback>
                        </Avatar>
                        <p>{booking.roomDetails.room_name}</p>
                      </div>
                    </Table.Cell>
                    <Table.Cell>{booking.bookingDate}</Table.Cell>
                    <Table.Cell>{`${booking.startTime} - ${booking.endTime}`}</Table.Cell>
                    <Table.Cell>${booking.price}</Table.Cell>
                    <Table.Cell>
                      <div
                        className={`bg-green-300 w-fit px-2 py-1 rounded-xs ${booking.status === "cancelled" && `bg-red-300 text-red-700`}`}
                      >
                        {booking.status}
                      </div>
                    </Table.Cell>
                    <Table.Cell className="rounded-xs">
                      <div className="flex items-center gap-2">
                        {booking.status === "confirmed" && (
                          <Button
                            variant="outline"
                            className="rounded-xs"
                            onClick={(event) => handleUpdateStatus(booking._id)}
                          >
                            Cancel
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          className="rounded-xs bg-red-500 text-white" onClick={() => handleBookingDelete(booking._id)}
                        >
                          <RiDeleteBin6Line />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
