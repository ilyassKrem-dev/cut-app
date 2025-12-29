"use client";
import Link from "next/link";
import { IoLogOutOutline } from "react-icons/io5";
import {
  FaUserEdit,
  FaKey,
  FaRegUser,
  FaArrowLeft,
  FaRegHeart,
} from "react-icons/fa";
import { FiPaperclip } from "react-icons/fi";

import { useState } from "react";
import Image from "next/image";
import Profile from "../profile";
import { CiCreditCard1 } from "react-icons/ci";
import { signOut } from "next-auth/react";

type Profile = {
  id: string;
  image: string;
  name: string;
  isBarber: boolean;
  completed: boolean;
  createdAt: any;
  email: string;
  phoneNumber: string | null;
  comments: any[];
  barberId: string | null;
};

export default function ProfileM({ profile }: { profile: Profile }) {
  const [tab, setTab] = useState<string>("");

  return (
    <>
      {!tab ? (
        <div className="relative min-h-screen bg-black overflow-hidden">
          {/* Animated background */}
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-amber-500/15 to-transparent rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-br from-blue-500/15 to-transparent rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            />
          </div>

          <div className="flex flex-col pt-12 sm:w-[92%] sm:mx-auto gap-8 mx-4 relative z-10">
            {/* Header Card */}
            <div className="backdrop-blur-md bg-white/3 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-4">
                <div className="relative group w-20 h-20 flex-shrink-0">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-300" />
                  <div className="relative w-full h-full rounded-xl overflow-hidden ring-1 ring-white/20">
                    <Image
                      src={profile.image || "/profile.jpg"}
                      alt={`${profile.name} profile picture`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-lg font-bold bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text text-transparent">
                    {profile.name}
                  </p>
                  <p className="text-white/60 text-xs truncate max-w-[200px] mt-1">
                    {profile.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="grid grid-cols-1 gap-3 w-full">
              <button
                onClick={() => setTab("profile")}
                className="flex gap-4 items-center p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/15 transition"
              >
                <FaRegUser className="text-lg text-amber-400" />
                <span className="font-semibold text-white">Profile</span>
              </button>
              <Link
                href={"/favorites"}
                className="flex gap-4 items-center p-3.5 rounded-xl bg-white/3 border border-white/10 hover:border-white/20 hover:bg-white/5 transition"
              >
                <FaRegHeart className="text-lg text-white/80" />
                <span className="font-semibold text-white">Favorites</span>
              </Link>
              <Link
                href={"/reserves"}
                className="flex gap-4 items-center p-3.5 rounded-xl bg-white/3 border border-white/10 hover:border-white/20 hover:bg-white/5 transition"
              >
                <FiPaperclip className="text-lg text-white/80" />
                <span className="font-semibold text-white">Reservations</span>
              </Link>
              <Link
                href={"/profile/edit"}
                className="flex gap-4 items-center p-3.5 rounded-xl bg-white/3 border border-white/10 hover:border-white/20 hover:bg-white/5 transition"
              >
                <FaUserEdit className="text-lg text-white/80" />
                <span className="font-semibold text-white">Edit Profile</span>
              </Link>
              <Link
                href={"/profile/password"}
                className="flex gap-4 items-center p-3.5 rounded-xl bg-white/3 border border-white/10 hover:border-white/20 hover:bg-white/5 transition"
              >
                <FaKey className="text-lg text-white/80" />
                <span className="font-semibold text-white">
                  Change Password
                </span>
              </Link>
              <Link
                href={"/profile/payment"}
                className="flex gap-4 items-center p-3.5 rounded-xl bg-white/3 border border-white/10 hover:border-white/20 hover:bg-white/5 transition"
              >
                <CiCreditCard1 className="text-lg text-white/80" />
                <span className="font-semibold text-white">Payment Method</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/login?next=profile" })}
                className="flex gap-4 items-center p-3.5 rounded-xl bg-gradient-to-r from-red-500/10 to-red-600/5 border border-red-500/20 hover:border-red-500/40 hover:bg-red-500/15 transition"
              >
                <IoLogOutOutline className="text-lg text-red-400" />
                <span className="font-semibold text-red-400">Logout</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12">
          <Profile profile={profile} />
          <div className="fixed top-0 right-0 left-0 p-2 border-b border-white/20 z-50 bg-black">
            <div
              className="text-xl cursor-pointer p-2 rounded-full hover:bg-white/20 active:bg-white/40 transition-all duration-300 w-fit "
              onClick={() => setTab("")}
            >
              <FaArrowLeft />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
