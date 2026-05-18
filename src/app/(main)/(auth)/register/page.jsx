"use client";

import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { FaRegImage, FaUser } from "react-icons/fa";
import { GiOpenBook } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill, RiResetLeftFill } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import { VscEyeClosed } from "react-icons/vsc";

export default function RegisterPage() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="border min-h-screen container mx-auto flex justify-center items-center bg-slate-200">
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center text-center gap-2 px-4">
          <GiOpenBook size={50} />
          <h1 className="font-bold text-xl xs:text-2xl lg:text-3xl bg-linear-to-r from-green-600 to-indigo-600 bg-clip-text text-transparent">
            Join Study Nook
          </h1>
          <p className="font-semibold text-sm xs:text-base md:text-base text-neutral-500">
            Start managing your study resources, notes, and library access in
            one place.
          </p>
        </div>
        <div className="max-w-xs w-full xs:max-w-md p-4 bg-white rounded-xs shadow-xs flex flex-col gap-2">
          <form className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-neutral-700" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <input
                className="border px-6 py-1 rounded-xs font-semibold outline-green-500 w-full"
                type="text"
                id="username"
                placeholder="Enter your full name"
              />
              <FaUser size={15} className="absolute top-1/2 -translate-y-1/2 left-1"/>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-neutral-700" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <input
                className="border px-6 py-1 rounded-xs font-semibold outline-green-500 w-full"
                type="email"
                id="email"
                placeholder="Enter your email address"
              />
              <MdEmail size={15} className="absolute top-1/2 -translate-y-1/2 left-1"/>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-neutral-700" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                className="border px-6 py-1 rounded-xs font-semibold outline-green-500 w-full"
                type={isOpen ? "password" : "text"}
                id="password"
                placeholder="Enter a strong password"
              />
              <RiLockPasswordFill size={15} className="absolute top-1/2 -translate-y-1/2 left-1"/>
              {
                isOpen ?
                <>
                  <RxEyeOpen size={18} className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-2" onClick={() => setIsOpen((prevCondition) => !prevCondition)}/>
                </>
                :
                <>
                  <VscEyeClosed size={18} className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-2" onClick={() => setIsOpen((prevCondition) => !prevCondition)}/>
                </>
              }
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="font-bold text-neutral-700"
                htmlFor="confirm_password"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                className="border px-6 py-1 rounded-xs font-semibold outline-green-500 w-full"
                type="password"
                id="confirm_password"
                placeholder="Validate your password"
              />
              <RiLockPasswordFill size={15} className="absolute top-1/2 -translate-y-1/2 left-1"/>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-neutral-700" htmlFor="image_url">
                Image URL
              </label>
              <div className="relative">
                <input
                className="border px-6 py-1 rounded-xs font-semibold outline-green-500 w-full"
                type="text"
                id="image_url"
                placeholder="Enter your image url"
              />
              <FaRegImage size={15} className="absolute top-1/2 -translate-y-1/2 left-1"/>
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="flex items-center justify-center w-full bg-green-500 px-2 py-1 rounded-xs gap-1 font-bold text-white cursor-pointer">
                <RiResetLeftFill size={20} />
                <input
                  type="button"
                  value="Reset Form"
                  className="cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-center w-full bg-green-500 px-2 py-1 rounded-xs gap-1 font-bold text-white cursor-pointer">
                <input
                  type="submit"
                  value="Create Account"
                  className="cursor-pointer"
                />
              </div>
            </div>
          </form>
          <Button className="w-full rounded-xs" variant="outline">
            <Icon icon="devicon:google" />
            Sign Up With Google
          </Button>
        </div>
      </div>
    </div>
  );
}
