"use client";
import { Modal } from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GiOpenBook } from "react-icons/gi";
import { toast } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function UpdateDetails({ updateState, session, room }) {
  const {
    _id,
    room_name,
    description,
    image_url,
    floor,
    capacity,
    rate,
    anemities,
  } = room;
  const data = {
    room_name,
    description,
    image_url,
    floor,
    capacity,
    rate,
    anemities,
  };
  const { register, handleSubmit, formState, reset, watch, setValue } =
    useForm();

  useEffect(() => {
    reset(data);
  }, [reset]);

  const [message, setMessage] = useState("Update Room");
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();
  const { errors } = formState;

  const imageUrl = watch("image_url");
  const fallBackImage =
    "https://plus.unsplash.com/premium_photo-1703701579660-8481915a7991";

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const preview_url = isValidUrl(imageUrl) ? imageUrl : fallBackImage;
  useEffect(() => {
    if (imageUrl && !isValidUrl(imageUrl)) {
      setValue("image_url", fallBackImage);
    }
  }, [imageUrl]);

  const handleOnSubmit = async (formData) => {
    setIsDisabled(true);
    const { name, email, image } = session.user;
    const roomData = {
      ...formData,
      total_booked: 0,
      createdDate: new Date(),
      user: {
        name,
        email,
        image,
      },
    };
    try {
      setMessage("Room updating...");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/room_details/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(roomData),
        },
      );
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message);
      }

      setMessage(data.message);
      toast.success(data.message);
      setTimeout(() => {
        router.push(`/room_details/${_id}`);
        setMessage("Update Room");
        setIsDisabled(false);
        updateState.close();
      }, 3000);
    } catch (error) {
      setMessage("Update Room");
      toast.danger(error.message);
      setIsDisabled(false);
    }
  };
  return (
    <Modal isOpen={updateState.isOpen} onOpenChange={updateState.setOpen}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="rounded-xs p-0 w-full xs:max-w-md md:max-w-lg lg:max-w-xl">
            <Modal.CloseTrigger />
            <Modal.Body>
              <div className="flex flex-col justify-center items-center bg-green-100 p-4 gap-4">
                {/* Main container */}
                <div className="flex flex-col items-center text-center gap-1 px-4">
                  {/* Heading container */}
                  <GiOpenBook size={50} className="text-green-500" />
                  <h1 className="font-bold text-xl text-green-900">
                    Edit Room Details
                  </h1>
                </div>
                <form
                  className="border flex flex-col gap-2 w-full xs:max-w-md md:max-w-lg lg:max-w-xl bg-white p-4 rounded-xs shadow-xs shadow-green-500"
                  onSubmit={handleSubmit(handleOnSubmit)}
                >
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="room_name"
                      className="font-bold text-green-500"
                    >
                      Room Name
                    </label>
                    <input
                      type="text"
                      id="room_name"
                      placeholder="Enter room name"
                      className={`border px-2 py-1 rounded-xs font-semibold outline-green-500 bg-green-50 ${errors.room_name && `border-red-500`}`}
                      {...register("room_name", {
                        required: "Room name is required!",
                      })}
                    />
                    {errors.room_name && (
                      <>
                        <p className="text-red-500">
                          {errors.room_name.message}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="description"
                      className="font-bold text-green-500"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      placeholder="Enter room description"
                      className={`border outline-green-500 px-2 py-1 rounded-xs font-semibold bg-green-50 ${errors.description && `border-red-500`}`}
                      {...register("description", {
                        required: "Description is required!",
                      })}
                    ></textarea>
                    {errors.description && (
                      <>
                        <p className="text-red-500">
                          {errors.description.message}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="image_url"
                      className="font-bold text-green-500"
                    >
                      Image URL
                    </label>
                    <input
                      type="text"
                      id="image_url"
                      placeholder="Enter image url"
                      className={`border outline-green-500 px-2 py-1 rounded-xs font-semibold bg-green-50 ${errors.image_url && `border-red-500`}`}
                      {...register("image_url", {
                        required: "Image url is required!",
                      })}
                    />
                    {errors.image_url && (
                      <>
                        <p className="text-red-500">
                          {errors.image_url.message}
                        </p>
                      </>
                    )}
                    {imageUrl && (
                      <>
                        <figure className="relative w-full h-50 md:h-75">
                          <Image
                            src={preview_url}
                            alt="Study room image"
                            fill
                            priority
                            className="object-cover rounded-xs"
                          />
                        </figure>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col border p-4 rounded-xs gap-2">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="floor"
                        className="font-bold text-green-500"
                      >
                        Floor
                      </label>
                      <input
                        type="number"
                        id="floor"
                        placeholder="Enter floor number"
                        className={`border rounded-xs px-2 py-1 outline-green-500 font-semibold bg-green-50 ${errors.floor && `border-red-500`}`}
                        {...register("floor", {
                          required: "You must entered floor number!",
                          min: {
                            value: 1,
                            message: "Floor number must be positive",
                          },
                          validate: (value) =>
                            value > 0 || "Only positive number allowed!",
                        })}
                      />
                      {errors.floor && (
                        <>
                          <p className="text-red-500">{errors.floor.message}</p>
                        </>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="capacity"
                        className="font-bold text-green-500"
                      >
                        Capacity
                      </label>
                      <input
                        type="number"
                        id="capacity"
                        placeholder="Enter total capacity"
                        className={`border rounded-xs px-2 py-1 outline-green-500 font-semibold bg-green-50 ${errors.capacity && `border-red-500`}`}
                        {...register("capacity", {
                          required: "You must entered total capacity!",
                          min: {
                            value: 1,
                            message: "Capacity must be positive number!",
                          },
                          validate: (value) =>
                            value > 0 || "Only positive number allowed!",
                        })}
                      />
                      {errors.capacity && (
                        <>
                          <p className="text-red-500">
                            {errors.capacity.message}
                          </p>
                        </>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="rate"
                        className="font-bold text-green-500"
                      >
                        Hourly Rate in dollar
                      </label>
                      <input
                        type="number"
                        id="rate"
                        placeholder="Enter rate"
                        className={`border rounded-xs px-2 py-1 outline-green-500 font-semibold bg-green-50 ${errors.rate && `border-red-500`}`}
                        {...register("rate", {
                          valueAsNumber: true,
                          required: "Room rate is required!",
                          min: {
                            value: 0,
                            message: "Rate can be 0 or greater than 0!",
                          },
                          validate: (value) =>
                            value >= 0 || "Rate can be 0 or greater than 0!",
                        })}
                      />
                      {errors.rate && (
                        <>
                          <p className="text-red-500">{errors.rate.message}</p>
                        </>
                      )}
                    </div>
                  </div>
                  <div
                    className={`flex flex-col items-center border rounded-xs p-2 gap-2 ${errors.anemities && `border-red-500`}`}
                  >
                    <span className="font-bold text-green-500">Anemities</span>
                    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-1 w-full">
                      <div className="flex items-center gap-1 border px-2 py-1 rounded-xs bg-green-50">
                        <input
                          type="checkbox"
                          id="whiteboard"
                          value="whiteboard"
                          {...register("anemities", {
                            validate: (value) =>
                              value?.length > 0 ||
                              "At least one anemitie must be selected",
                          })}
                        />
                        <label htmlFor="whiteboard" className="font-semibold">
                          Whiteboard
                        </label>
                      </div>
                      <div className="flex items-center gap-1 border px-2 py-1 rounded-xs bg-green-50">
                        <input
                          type="checkbox"
                          id="projector"
                          value="projector"
                          {...register("anemities")}
                        />
                        <label htmlFor="projector" className="font-semibold">
                          Projector
                        </label>
                      </div>
                      <div className="flex items-center gap-1 border px-2 py-1 rounded-xs bg-green-50">
                        <input
                          type="checkbox"
                          id="wi_fi"
                          value="wi-fi"
                          {...register("anemities")}
                        />
                        <label htmlFor="wi_fi" className="font-semibold">
                          Wi-Fi
                        </label>
                      </div>
                      <div className="flex items-center gap-1 border px-2 py-1 rounded-xs bg-green-50">
                        <input
                          type="checkbox"
                          id="power_outlets"
                          value="power outlets"
                          {...register("anemities")}
                        />
                        <label
                          htmlFor="power_outlets"
                          className="font-semibold"
                        >
                          Power Outlets
                        </label>
                      </div>
                      <div className="flex items-center gap-1 border px-2 py-1 rounded-xs bg-green-50">
                        <input
                          type="checkbox"
                          id="quiet_zone"
                          value="quiet zone"
                          {...register("anemities")}
                        />
                        <label htmlFor="quiet_zone" className="font-semibold">
                          Quiet Zone
                        </label>
                      </div>
                      <div className="flex items-center gap-1 border px-2 py-1 rounded-xs bg-green-50">
                        <input
                          type="checkbox"
                          id="air_conditioning"
                          value="air conditioning"
                          {...register("anemities")}
                        />
                        <label
                          htmlFor="air_conditioning"
                          className="font-semibold"
                        >
                          Air Conditioning
                        </label>
                      </div>
                    </div>
                    {errors.anemities && (
                      <>
                        <p className="text-red-500">
                          {errors.anemities.message}
                        </p>
                      </>
                    )}
                  </div>
                  <div>
                    <input
                      type="button"
                      value="Reset"
                      className="bg-blue-500 w-full px-2 py-1 rounded-xs font-bold text-white shadow-xs hover:shadow-md shadow-blue-300 cursor-pointer"
                      onClick={() => reset()}
                    />
                  </div>
                  <div>
                    <input
                      type="submit"
                      value={message}
                      disabled={isDisabled}
                      className={`bg-green-500 shadow-xs hover:shadow-md shadow-green-300 w-full px-2 py-1 font-bold text-white rounded-xs cursor-pointer ${isDisabled && `bg-red-500`}`}
                    />
                  </div>
                </form>
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
