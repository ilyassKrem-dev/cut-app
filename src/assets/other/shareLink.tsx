"use client";
import { FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import SocialMedia from "./socialMedia";
import { SetStateAction, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function ShareLink({
  barberImage,
  barberName,
  setShowShare,
  barberId,
}: {
  barberImage: string;
  barberName: string;
  setShowShare: React.Dispatch<SetStateAction<boolean>>;
  barberId?: string;
}) {
  const { toast } = useToast();
  const pathname = usePathname();
  const url = `${process.env.NEXT_PUBLIC_API_URL}${barberId || pathname}`;
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied",
        description: "The salon link was copied to your clipboard.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    } catch (e) {
      toast({ title: "Copy failed" });
    }
  };

  useEffect(() => {
    function onBodyClick(e: MouseEvent) {
      if (!modalRef.current) return;
      if (modalRef.current.contains(e.target as Node)) return;
      setShowShare(false);
    }
    document.addEventListener("mousedown", onBodyClick);
    return () => document.removeEventListener("mousedown", onBodyClick);
  }, [setShowShare]);

  const modal = (
    <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <motion.div
        ref={modalRef}
        initial={{ y: 60, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative w-full md:w-[540px] bg-gradient-to-b from-black/70 to-black/60 border border-white/6 rounded-t-xl md:rounded-xl p-5 md:p-6 mx-4 md:mx-0"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-neutral-800 flex-shrink-0">
              <Image
                src={barberImage ?? "/profile.jpg"}
                alt={barberName}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Share</h3>
              <p className="text-sm text-white/70 truncate max-w-[300px]">
                {barberName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="Close"
              onClick={() => setShowShare(false)}
              className="p-2 rounded-md hover:bg-white/6 transition"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <div className="mt-4 md:mt-6 flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <div className="flex-1 rounded-full bg-white/5 px-3 py-2 flex items-center gap-3">
              <FaExternalLinkAlt className="text-white/80" />
              <input
                readOnly
                value={url}
                className=" bg-white/5 outline-none text-sm text-white/80 truncate w-full"
              />
            </div>

            <button
              onClick={handleCopy}
              className="ml-2 bg-amber-400 hover:bg-amber-500 text-black font-medium rounded-full px-4 py-2 transition"
            >
              Copy
            </button>
          </div>

          <div className="pt-2">
            <p className="text-xs text-white/60 mb-2">Share via</p>
            <SocialMedia url={url} />
          </div>
        </div>
      </motion.div>
    </div>
  );

  return <>{createPortal(modal, document.body)}</>;
}
