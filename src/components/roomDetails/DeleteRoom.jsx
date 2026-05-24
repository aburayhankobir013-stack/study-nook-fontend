"use client";
import { Button, Modal, toast } from "@heroui/react";
import { RiDeleteBin6Line, RiSkull2Fill } from "react-icons/ri";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function DeleteRoom({ deleteState, details }) {
  const {_id, image_url, room_name } = details;
  const router = useRouter();
  const [message, setMessage] = useState("Permanently Delete");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleDelete = async (_id) => {
    setIsDisabled(true);
    setMessage("Deleting permanently...");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/room_details/${_id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message);
      }

      if (data.success) {
        setMessage(data.message);
        toast.success(data.message);
        setTimeout(() => {
          router.push("/my_listings");
          setMessage("Permanently Delete");
          setIsDisabled(false);
        }, 3000);
      }
    } catch (error) {
      setMessage(error.message);
      toast.danger(error.message);
        setTimeout (() => {
          setMessage("Permanently Delete");
          setIsDisabled(false);
        }, 3000);
    }
  };
  return (
    <Modal isOpen={deleteState.isOpen} onOpenChange={deleteState.setOpen}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="rounded-xs bg-green-100 p-2">
            <Modal.CloseTrigger className="bg-green-300 text-green-950"/>
            <div className="flex flex-col items-center gap-1 mb-2">
              <RiSkull2Fill size={30} className="text-red-500" />
              <h1 className="text-lg text-red-500 font-semibold">
                You are going to perform a dangerous operation!
              </h1>
            </div>
            <Modal.Body  className="flex flex-col gap-2">
              <figure className="relative w-full h-50">
                <Image
                  src={image_url}
                  alt={room_name}
                  fill
                  className="object-cover rounded-xs"
                />
              </figure>
              <h1 className="font-bold text-lg text-green-950">{room_name}</h1>
            </Modal.Body>
            <Modal.Footer className="flex-col">
              <p className="text-red-500 font-bold">Do you want delete it permanently?</p>
              <Button className={`w-full rounded-xs bg-red-500 ${isDisabled && `bg-black`}`} onClick={() => handleDelete(_id)}>
                <span>{message}</span>
                <RiDeleteBin6Line />
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
