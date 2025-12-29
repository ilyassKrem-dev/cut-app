import {
  FaCheckCircle,
  FaTimesCircle,
  FaExternalLinkAlt,
  FaUser,
} from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { SetStateAction } from "react";
import ProfileSettings from "./settings/profileSettings";

export default function ProfileTop({
  profileImage,
  profileName,
  profileBarber,
  profileCompelted,
  setTab,
  tab,
}: {
  profileImage: string;
  profileName: string;
  profileCompelted: boolean;
  profileBarber: {
    isBarber: boolean;
    barberId: string | null;
  };
  setTab: React.Dispatch<SetStateAction<string>>;
  tab: string;
}) {
  return (
    <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10 w-full justify-between">
      <div className="flex items-start gap-6 md:gap-8 w-full">
        {/* Avatar with animated glow */}
        <div className="relative w-[130px] h-[130px] md:w-[180px] md:h-[180px] flex-shrink-0 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-blue-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-40 transition duration-300" />
          <Image
            src={profileImage || "/profile.jpg"}
            alt={`${profileName} image`}
            width={500}
            priority
            height={500}
            className="relative w-full h-full rounded-2xl object-cover ring-2 ring-white/20 shadow-lg"
          />
          {profileCompelted ? (
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full p-2 shadow-md">
              <FaCheckCircle className="text-white" />
            </div>
          ) : (
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full p-2 shadow-md">
              <FaTimesCircle className="text-white" />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between w-full">
          <div className="flex items-start justify-between w-full gap-4">
            <div className="flex flex-col">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 via-white to-blue-400 bg-clip-text text-transparent leading-tight">
                {profileName}
              </h2>
              <div className="flex items-center gap-3 mt-3">
                {profileBarber.isBarber && (
                  <Link
                    href={`salons/${profileBarber.barberId}`}
                    className="inline-flex items-center gap-2 text-sm text-white/90 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/10 transition"
                  >
                    <FaExternalLinkAlt className="text-sm" />
                    <span className="font-medium">View Salon</span>
                  </Link>
                )}
                <div className="text-sm text-white/60">Member since 2024</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <ProfileSettings />
            </div>
          </div>

          <div className="mt-6">
            <nav className="flex gap-2 items-center">
              <button
                onClick={() => setTab("about")}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition ${
                  tab == "about"
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                <FaUser className="inline mr-2" />
                About
              </button>
              <button
                onClick={() => setTab("history")}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition ${
                  tab == "history"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                <MdHistory className="inline mr-2" />
                History
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div className="flex md:hidden">
        <ProfileSettings />
      </div>
    </div>
  );
}
