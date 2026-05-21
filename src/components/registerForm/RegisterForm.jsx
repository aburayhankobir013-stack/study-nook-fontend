"use client";

import { toast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegImage, FaUser } from "react-icons/fa";
import { GiOpenBook } from "react-icons/gi";
import { GoArrowRight } from "react-icons/go";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill, RiResetLeftFill } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import { VscEyeClosed } from "react-icons/vsc";

export default function RegisterForm() {
  const { register, handleSubmit, formState, watch, reset } = useForm();
  const { errors } = formState;
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const [message, setMessage] = useState("Create Account");
  const [isDisabled, setIsDisabled] = useState(false);

  const password = watch("password", "");

  const passwordRules = {
    required: "Password is required!",
    validate: (value) => {
      const hasMinLength = value.length >= 6;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);

      if (!hasMinLength) {
        return "At least 6 charecters required!";
      }
      if (!hasUpperCase) {
        return "At least 1 uppercase letter required!";
      }
      if (!hasLowerCase) {
        return "At least 1 lowercase letter required!";
      }
      return true;
    },
  };

  const handleOnSubmit = async (formData) => {
    setIsDisabled(true);
    await authClient.signUp.email(
      {
        email: formData.email,
        password: formData.password,
        name: formData.username,
        image: formData.image_url,
      },
      {
        onRequest: () => {
          setMessage("Account creating...");
        },
        onSuccess: () => {
          setMessage("Account Successfully Created!");
          toast.success("Account Successfully Created!");
          setTimeout(() => {
            router.push("/");
            setMessage("Create Account");
            setIsDisabled(false);
          }, 3000);
        },
        onError: (ctx) => {
          setMessage("Something Went Wrong!");
          toast.danger(ctx.error.message);
          setTimeout(() => {
            setMessage("Create Account");
            setIsDisabled(false);
          }, 3000);
        },
      },
    );
    reset();
  };
  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };
  return (
    <div className="border min-h-screen container mx-auto flex justify-center items-center bg-green-100">
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center text-center gap-2 px-4">
          <GiOpenBook size={50} className="text-green-500" />
          <h1 className="font-bold text-xl xs:text-2xl lg:text-3xl bg-linear-to-r from-green-600 to-indigo-600 bg-clip-text text-transparent">
            Join Study Nook
          </h1>
          <p className="font-semibold text-sm xs:text-base md:text-base text-neutral-500">
            Start managing your study resources, notes, and library access in
            one place.
          </p>
          <h1 className="font-bold text-xl xs:text-2xl lg:text-3xl text-green-700">
            Register Form
          </h1>
        </div>
        <div className="max-w-xs w-full xs:max-w-md p-4 bg-white rounded-xs shadow-xs shadow-green-500 flex flex-col gap-2">
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(handleOnSubmit)}
          >
            <div className="flex flex-col gap-1">
              <label className="font-bold text-neutral-700" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <input
                  className={`border px-6 py-1 rounded-xs font-semibold outline-green-500 w-full ${errors.username && `border-red-500`}`}
                  type="text"
                  id="username"
                  {...register("username", {
                    required: "Username is required!",
                  })}
                  placeholder="Enter your full name"
                />
                <FaUser
                  size={15}
                  className="absolute top-1/2 -translate-y-1/2 left-1"
                />
              </div>
              {errors.username && (
                <>
                  <p className="text-red-500">{errors.username.message}</p>
                </>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-neutral-700" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <input
                  className={`border px-6 py-1 rounded-xs font-semibold outline-green-500 w-full ${errors.username && `border-red-500`}`}
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required!",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Enter your email address"
                />

                <MdEmail
                  size={15}
                  className="absolute top-1/2 -translate-y-1/2 left-1"
                />
              </div>
              {errors.email && (
                <>
                  <p className="text-red-500">{errors.email.message}</p>
                </>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-neutral-700" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  className={`border px-6 py-1 rounded-xs font-semibold outline-green-500 w-full ${errors.password && `border-red-500`}`}
                  type={isOpen ? "password" : "text"}
                  id="password"
                  {...register("password", passwordRules)}
                  placeholder="Enter a strong password"
                />
                <RiLockPasswordFill
                  size={15}
                  className="absolute top-1/2 -translate-y-1/2 left-1"
                />
                {isOpen ? (
                  <>
                    <RxEyeOpen
                      size={18}
                      className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-2"
                      onClick={() =>
                        setIsOpen((prevCondition) => !prevCondition)
                      }
                    />
                  </>
                ) : (
                  <>
                    <VscEyeClosed
                      size={18}
                      className={`cursor-pointer absolute top-1/2 -translate-y-1/2 right-2 ${errors.password && `border-red-500`}`}
                      onClick={() =>
                        setIsOpen((prevCondition) => !prevCondition)
                      }
                    />
                  </>
                )}
              </div>
              {errors.password && (
                <>
                  <p className="text-red-500">{errors.password.message}</p>
                </>
              )}
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
                  className={`border px-6 py-1 rounded-xs font-semibold outline-green-500 w-full ${errors.confirm_password && `border-red-500`}`}
                  type="password"
                  id="confirm_password"
                  {...register("confirm_password", {
                    required: "Confirm password is required!",
                    validate: (value) => {
                      return value === password || "Password do not match!";
                    },
                  })}
                  placeholder="Validate your password"
                />
                <RiLockPasswordFill
                  size={15}
                  className="absolute top-1/2 -translate-y-1/2 left-1"
                />
              </div>
              {errors.confirm_password && (
                <>
                  <p className="text-red-500">
                    {errors.confirm_password.message}
                  </p>
                </>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-neutral-700" htmlFor="image_url">
                Image URL
              </label>
              <div className="relative">
                <input
                  className={`border px-6 py-1 rounded-xs font-semibold outline-green-500 w-full ${errors.username && `border-red-500`}`}
                  type="text"
                  id="image_url"
                  {...register("image_url", {
                    required: "Image url is required!",
                  })}
                  placeholder="Enter your image url"
                />
                <FaRegImage
                  size={15}
                  className="absolute top-1/2 -translate-y-1/2 left-1"
                />
              </div>
              {errors.image_url && (
                <>
                  <p className="text-red-500">{errors.image_url.message}</p>
                </>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="flex items-center justify-center w-full bg-green-500 px-2 py-1 rounded-xs gap-1 font-bold text-white cursor-pointer">
                <RiResetLeftFill size={20} />
                <input
                  type="button"
                  value="Reset Form"
                  className="cursor-pointer"
                  onClick={() => reset()}
                />
              </div>
              <div
                className={`flex items-center justify-center w-full bg-green-500 px-2 py-1 rounded-xs gap-1 font-bold text-white cursor-pointer ${isDisabled && `bg-red-500`}`}
              >
                <input
                  type="submit"
                  value={message}
                  className="cursor-pointer"
                  disabled={isDisabled}
                />
              </div>
            </div>
          </form>
          <Button
            className="w-full rounded-xs"
            variant="outline"
            onClick={handleGoogleSignin}
          >
            <Icon icon="devicon:google" />
            Sign In With Google
          </Button>
          <Button variant="outline" className="rounded-xs w-full">
            <Link
              href={"/login"}
              className="flex items-center gap-2 font-bold text-green-700"
            >
              <span>Go To Login Page</span>
              <GoArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
