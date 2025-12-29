"use client";

import Link from "next/link";
import { SalonCommentsType, UserCommentType } from "../salonType";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import UserComment from "./userComment";
import AllComment from "./allComments";
import {  useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import LoadingAnimation from "@/assets/other/spinner";
import { loadMoreComments } from "@/lib/actions/misc.action";

export default function SalonComments({
  salonData,
  userId,
  userComment,
}: {
  salonData: SalonCommentsType | null;
  userId?: string;
  userComment?: UserCommentType;
}) {
  const [salon, setSalon] = useState<SalonCommentsType | null>(salonData);
  const [loading, setLoading] = useState<boolean>(false);
  const commentsRef = useRef<HTMLDivElement>(null);
  const handleMoreComments = async () => {
    try {
      const res = await loadMoreComments({
        barberId: salon?.id as string,
        lastCommentId: salon?.comments[salon.comments.length - 1].id as string,
      });
      if (res) {
        setSalon((prev: any) => ({
          ...prev,
          comments: [...prev.comments, ...res],
        }));
        setLoading(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error loading more comments",
      });
    }
  };
  const handleScroll = () => {
    if (salon?.comments.length !== 10) return;
    const scrollTop = commentsRef?.current?.scrollTop || 0;
    const scrollHeight = commentsRef?.current?.scrollHeight || 0;
    const clientHeight = commentsRef?.current?.clientHeight || 0;
    if (scrollTop + clientHeight >= scrollHeight) {
      setLoading(true);
      handleMoreComments();
      commentsRef?.current?.scrollTo(0, scrollHeight - clientHeight - 10);
    }
  };

  const barberImage = salon?.images[0];
  return (
    <div
      className="py-32 overflow-y-auto custom-scrollbar h-screen"
      ref={commentsRef}
      onScroll={handleScroll}
    >
      <div className="py-4 flex justify-between mx-2 items-center px-4 md:hidden">
        <Link
          href={"/"}
          className="flex gap-2 items-center md:hidden cursor-pointer group"
        >
          <FaArrowLeft className="text-xl group-hover:opacity-70 transition-all duration-300 group-hover:scale-125" />
          <p className="font-bold text-lg cursor-pointer group-hover:opacity-70 transition-all duration-300">
            Back
          </p>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 md:pt-12">
        <div className="bg-black/40 border border-white/6 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-shrink-0">
            <Image
              src={barberImage as string}
              alt={`${salon?.salonName} image`}
              width={160}
              priority={true}
              height={160}
              className="rounded-lg w-[120px] h-[120px] md:w-[160px] md:h-[160px] object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xl font-semibold text-white/90">
              {salon?.salonName}
            </p>
            <p className="text-sm text-white/70 mt-1">
              Share your experience and help others find this salon.
            </p>
          </div>
            
          <div className="w-full md:w-auto">
            {userId && userComment && (
              <div className="">
                <p className="text-sm text-white/80 mb-2">Your comment</p>
                <UserComment
                  salonId={salon?.id as string}
                  userId={userId}
                  userComment={userComment}
                  setSalon={setSalon}
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold">Comments</h2>
          <div className="mt-4">
            <AllComment comments={salon?.comments as any[]} />
            {loading && (
              <div className="mt-4">
                <LoadingAnimation />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
