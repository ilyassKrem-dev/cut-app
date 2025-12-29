"use client";
import { useState } from "react";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import ProfileTop from "./assets/profileTop";

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

export default function Profile({ profile }: { profile: Profile }) {
  const [tab, setTab] = useState<string>("about");

  return (
    <>
      {profile && (
        <div className="relative min-h-screen bg-black overflow-hidden">
          {/* Animated background gradients */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-amber-500/15 to-transparent rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-br from-blue-500/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
          </div>

          <div className="flex flex-col pt-20 md:pt-28 lg:pt-32 px-6 md:px-12 lg:px-24 gap-8 w-full relative z-10">
          <ProfileTop
            profileImage={profile.image}
            profileName={profile.name}
            profileCompelted={profile.completed}
            profileBarber={{
              isBarber: profile.isBarber,
              barberId: profile.barberId,
            }}
            setTab={setTab}
            tab={tab}
          />

            {tab == "about" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                <div className="md:col-span-2 flex flex-col gap-6">
                    <h4 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    Comments
                    </h4>
                    <div className="flex flex-col gap-4">
                    {profile.comments.length > 0 ? (
                        profile.comments.map((comment, index) => {
                        const { barber } = comment;
                        return (
                            <div
                            key={comment.id + index}
                            className="backdrop-blur-md bg-white/3 border border-white/10 rounded-2xl p-5 hover:border-white/20 hover:bg-white/5 transition-all duration-300 group"
                            >
                            <div className="flex items-start gap-3">
                                <div className="relative">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-blue-500 rounded-full blur opacity-0 group-hover:opacity-30 transition duration-300" />
                                <Image
                                    src={barber.images[0]}
                                    alt={`${barber.salonName} profile picture`}
                                    width={52}
                                    height={52}
                                    className="relative rounded-full object-cover w-[52px] h-[52px]"
                                />
                                </div>
                                <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                    <p className="text-sm font-semibold text-white">
                                        {barber.salonName}
                                    </p>
                                    <div className="flex gap-2 items-center text-white/70 text-sm mt-1">
                                        <StarIcon className="text-sm text-amber-400" />
                                        <span className="font-semibold">{comment.stars}</span>
                                    </div>
                                    </div>
                                </div>
                                <p className="mt-3 text-white/80 text-sm break-words">
                                    {comment.comment}
                                </p>
                                </div>
                            </div>
                            </div>
                        );
                        })
                    ) : (
                        <div className="text-center text-white/60 py-12 rounded-lg bg-white/2">
                        You don’t have any comments yet.
                        </div>
                    )}
                    </div>
                </div>

                <aside className="flex flex-col gap-6">
                    <h4 className="text-white/60 font-semibold text-lg">Info</h4>
                    <div className="bg-white/3 border border-white/8 rounded-xl p-4">
                    <div className="grid grid-cols-1 gap-3 text-sm text-white/80">
                        <div className="flex gap-2">
                        <p className="w-28 font-semibold">Phone:</p>
                        <p>
                            {profile.phoneNumber
                            ? profile.phoneNumber
                            : "Add a number"}
                        </p>
                        </div>
                        <div className="flex gap-2">
                        <p className="w-28 font-semibold">Email:</p>
                        <p className="truncate">{profile.email}</p>
                        </div>
                        <div className="flex gap-2">
                        <p className="w-28 font-semibold">Password:</p>
                        <p>••••••••</p>
                        </div>
                    </div>
                    </div>
                </aside>
                </div>
            ) : (
                <div className="py-6">
                {/* history or other tabs can render here */}
                </div>
            )}
            </div>
        </div>
      )}
    </>
  );
}
