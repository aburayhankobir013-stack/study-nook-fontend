"use client";

import { Modal, toast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function BookingForm({ bookingState, details }) {
  const {_id, rate, room_name, image_url, sessionEmail} = details;
  const [price, setPrice] = useState(rate);
  const [message, setMessage] = useState("Confirm Booking");
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bookingDate: `${today}`,
      startTime: "10",
      endTime: "11",
    },
  });

  const startTime = watch("startTime");
  const endTime = watch("endTime");
  
  useEffect(() => {
    if (!startTime) return;

    const start = parseInt(startTime);
    const next = start + 1;

    if (next <= 18) {
      setValue("endTime", next.toString(), {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      setValue("endTime", "", {
        shouldValidate: true,
      });
    }
  }, [startTime, setValue]);

  useEffect(() => {
    if (!startTime || !endTime) return;
    const duration = parseInt(endTime) - parseInt(startTime);
    if (duration > 0) {
      setPrice(duration * rate);
    } else {
      setPrice(0);
    }
  }, [startTime, endTime, rate]);


  const handleOnSubmit = async (formData) => {
    setIsDisabled(true);
    setMessage("Booking...");
    const bookingData = {
      price,
      startTime: parseInt(startTime),
      endTime: parseInt(endTime),
      status: "confirmed",
      bookingDate: formData.bookingDate,
      roomDetails: {
        _id,
        room_name,
        image_url
      },
      user: {sessionEmail},
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/room_details/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingData),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message);
      } else {
        setMessage(data.message);
        toast.success(data.message);
        setTimeout(() => {
          setMessage("Confirme Booking");
          setIsDisabled(false);
          router.push("/my_bookings");
        }, 1000);
      }
    } catch (error) {
      setMessage("Confirme Booking");
      toast.danger(error.message);
      setIsDisabled(false);
    }
  };

  return (
    <Modal isOpen={bookingState.isOpen} onOpenChange={bookingState.setOpen}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="rounded-xs bg-green-100 py-4 px-2">
            <Modal.CloseTrigger />

            <div className="flex flex-col items-center mb-2">
              <h1 className="font-bold text-lg text-green-900">
                {room_name}
              </h1>
              <p className="font-semibold text-green-700">
                Available every day between 10:00 - 18:00 (UTC+06:00)
              </p>
            </div>

            <Modal.Body>
              <form
                className="bg-white p-2 rounded-xs shadow-xs shadow-green-100 border border-green-500 flex flex-col gap-2"
                onSubmit={handleSubmit(handleOnSubmit)}
              >
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-green-950">Date</label>

                  <input
                    type="date"
                    min={today}
                    {...register("bookingDate", {
                      required: "Date is required!",
                      validate: (value) =>
                        value >= today || "Past date is not allowed!",
                    })}
                    className={`w-full px-2 py-1 border rounded-xs outline-green-500 ${
                      errors.bookingDate ? "border-red-500" : ""
                    }`}
                  />

                  {errors.bookingDate && (
                    <p className="text-red-500 text-sm">
                      {errors.bookingDate.message}
                    </p>
                  )}
                </div>
                <div
                  className={`flex flex-col items-center gap-2 border p-2 rounded-xs ${
                    errors.endTime ? "border-red-500" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="flex-1 flex flex-col gap-1">
                      <label className="font-bold text-green-950">
                        Start
                      </label>

                      <select
                        {...register("startTime")}
                        className="w-full border px-2 py-1 rounded-xs cursor-pointer font-semibold outline-green-500"
                      >
                        <option value="10">10:00</option>
                        <option value="11">11:00</option>
                        <option value="12">12:00</option>
                        <option value="13">13:00</option>
                        <option value="14">14:00</option>
                        <option value="15">15:00</option>
                        <option value="16">16:00</option>
                        <option value="17">17:00</option>
                        <option value="18">18:00</option>
                      </select>
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <label className="font-bold text-green-950">End</label>

                      <select
                        {...register("endTime", {
                          required: "End time is required!",
                          validate: (value) =>
                            parseInt(value) > parseInt(startTime) ||
                            "End time must be greater than start time!",
                        })}
                        className="w-full border px-2 py-1 rounded-xs cursor-pointer font-semibold outline-green-500"
                      >
                        <option value="11">11:00</option>
                        <option value="12">12:00</option>
                        <option value="13">13:00</option>
                        <option value="14">14:00</option>
                        <option value="15">15:00</option>
                        <option value="16">16:00</option>
                        <option value="17">17:00</option>
                        <option value="18">18:00</option>
                      </select>
                    </div>
                  </div>

                  {errors.endTime && (
                    <p className="text-red-500 text-sm">
                      {errors.endTime.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between border px-2 py-1 rounded-xs">
                  <span className="font-bold text-green-900 text-lg">
                    Total Cost
                  </span>
                  <span className="font-bold text-green-900 text-lg">${price}</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="button"
                    value="Cancel"
                    onClick={() => bookingState.setOpen(false)}
                    className="border p-3 rounded-xs flex-1 cursor-pointer font-bold bg-black text-white"
                  />

                  <input
                    type="submit"
                    value={message}
                    disabled={isDisabled}
                    className={`border p-3 rounded-xs flex-1 cursor-pointer font-bold bg-green-500 text-white ${isDisabled && `bg-red-500`}`}
                  />
                </div>
              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}