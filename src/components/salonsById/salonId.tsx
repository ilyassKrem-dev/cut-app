"use client"
import Image from "next/image";
import {
  FaCalendar,
  FaCheck,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import dynamic from "next/dynamic";
import LoadingAnimation from "@/assets/other/spinner";
import BarberImages from "./assets/barberImages";
import SalonButtons from "./assets/buttons";
import AboveView from "./assets/aboveImages/aboveView";
import { Button } from "../ui/button";
import RatingsACommentes from "./assets/ratingsComment/rAndC";
import { SalonType, CommentsType } from "./salonType";
import BarberComments from "./assets/barberComments";
import Link from "next/link";
import { IoLogoGithub } from "react-icons/io";
import MapSalon from "./assets/mapSalon";



interface Props {
  barber: SalonType | undefined;
  userId: string | null | undefined;
  pathname?: string;
  barberUserId?: string;
}

export default function SalonId({
  barber,
  userId,
  pathname,
  barberUserId,
}: Props) {
  const datesCheck =
    barber?.openDays.length === 7 ? "Entire week" : barber?.openDays.join("-");

  return (
    <div className="sm:px-4 pb-24">
      

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-24">
        <main className="lg:col-span-8 space-y-8">
          <BarberImages barberImages={barber?.images} />

          <section className="bg-black/40 border border-white/6 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <Image
                src={barber?.user.image || "/profile.jpg"}
                alt={`barber ${barber?.user.name} pic`}
                width={80}
                height={80}
                className="w-[64px] h-[64px] rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">Barber: {barber?.user.name}</p>
                <p className="text-sm text-white/60">
                  {barber?.user.phoneNumber || ""}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-xl text-white/60" />
                <div>
                  <p className="text-sm">{barber?.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-xl text-white/60" />
                <div>
                  <p className="text-sm">{barber?.phoneNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaCalendar className="text-xl text-white/60" />
                <div>
                  <p className="text-sm">{datesCheck}</p>
                  <p className="text-xs text-white/60">
                    Holidays: {barber?.holidays ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Comments</h2>
            {(barber?.comments && barber.comments.length > 0) ? (
              <BarberComments comments={barber?.comments as CommentsType[]} />
            ) : (
              <div className="py-8 text-center text-white/60 rounded-2xl bg-black/30">
                No comments yet
              </div>
            )}
          </section>

          <div className="rounded-2xl overflow-hidden">
            <MapSalon
              prices={barber?.Prices as number[]}
              locationLat={{
                longitude: barber?.longitude as number,
                latitude: barber?.latitude as number,
              }}
              info={{ name: barber?.salonName as string }}
              images={barber?.images as string[]}
              time={{
                open: barber?.time[0] as string,
                close: barber?.time[1] as string,
              }}
            />
          </div>
        </main>

        <aside className="lg:col-span-4">
          <div className="sticky top-28 space-y-4">
            <div className="bg-gradient-to-br from-white/6 to-white/4 border border-white/6 p-5 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Price range</p>
                  <p className="text-2xl font-bold">
                    {barber?.Prices[0]} DH - {barber?.Prices[1]} DH
                  </p>
                </div>
                <div className="text-right text-sm text-white/60">
                  <p>
                    {barber?.time[0]} - {barber?.time[1]}
                  </p>
                  <p className="mt-1">{datesCheck}</p>
                </div>
              </div>

              <div className="mt-4">
                {barber?.userId !== userId && (
                  <SalonButtons
                    barberPrices={barber?.Prices as number[]}
                    userId={userId}
                    barberId={barber?.id as string}
                    barberUserId={barberUserId}
                    barberTimeAprices={{
                      times: barber?.time as string[],
                      days: barber?.openDays as string[],
                      prices: barber?.Prices as number[],
                    }}
                  />
                )}
              </div>
            </div>

            <div className="bg-black/40 border border-white/6 rounded-2xl p-4 text-center">
              <p className="text-sm text-white/60">Share & Save</p>
              <div className="mt-3">
                <AboveView
                  userId={userId}
                  barberId={barber?.id}
                  barberImage={barber?.images[0] as string}
                  barberName={barber?.salonName as string}
                />
              </div>
            </div>
          </div>
        </aside>
      </div>

      {!pathname && (
        <div className="fixed bottom-0 right-0 left-0 p-3 justify-center items-center border-t gap-20 border-white/10 hidden md:flex z-50 bg-black">
          <Link
            href={"https://github.com/ilyassKrem-dev/cut-app"}
            target="_blank"
            className=" underline text-white/80 text-sm flex gap-2 items-center hover:opacity-70 transition-all duration-300 active:opacity-60"
          >
            Source code <IoLogoGithub />
          </Link>
          <p className="text-center">IlyassKrem-dev &copy; 2024</p>
        </div>
      )}
    </div>
  );
}
