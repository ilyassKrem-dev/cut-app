"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { shimmer, toBase64 } from "@/assets/other/shimmer";

export default function ImageChange({
  images,
  barberId,
}: {
  images: string[];
  barberId: string;
}) {
  const [imagesIndex, setImagesIndex] = useState<number>(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const changeImage = (type: string) => {
    if (type === "add") {
      if (imagesIndex >= images.length - 1) return;
      setImagesIndex((prev) => prev + 1);
      setDirection("right");
    } else {
      if (imagesIndex <= 0) return;
      setImagesIndex((prev) => prev - 1);
      setDirection("left");
    }
  };

  return (
    <div className="relative flex justify-center items-center h-[310px] sm:h-[200px] group">
      {/* Prev button */}
      <div
        className={`absolute left-3 top-1/2 -translate-y-1/2 z-30 ${
          imagesIndex === 0
            ? "opacity-0 pointer-events-none"
            : "opacity-90 group-hover:opacity-100"
        }`}
      >
        <button
          aria-label="previous"
          onClick={() => changeImage("reduce")}
          className="bg-white/90 text-black rounded-full p-2 shadow-md hover:scale-105 transition"
        >
          <FaArrowLeft className="text-lg" />
        </button>
      </div>

      {/* Image */}
      <motion.div
        key={imagesIndex}
        initial={
          direction === "right" ? { opacity: 0, x: 80 } : { opacity: 0, x: -80 }
        }
        animate={{ opacity: 1, x: 0 }}
        exit={
          direction === "right" ? { opacity: 0, x: -80 } : { opacity: 0, x: 80 }
        }
        transition={{ duration: 0.45 }}
        className="w-full h-full flex items-center justify-center"
      >
        <Link href={`/salons/${barberId}`}>
          <Image
            src={images[imagesIndex]}
            alt={`salon image ${imagesIndex + 1}`}
            width={1200}
            priority={true}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(1280, 1280)
            )}`}
            height={800}
            className="w-full h-[310px] sm:h-[200px] object-cover rounded-lg opacity-95"
          />
        </Link>
      </motion.div>

      {/* Next button */}
      <div
        className={`absolute right-3 top-1/2 -translate-y-1/2 z-30 ${
          imagesIndex === images.length - 1
            ? "opacity-0 pointer-events-none"
            : "opacity-90 group-hover:opacity-100"
        }`}
      >
        <button
          aria-label="next"
          onClick={() => changeImage("add")}
          className="bg-white/90 text-black rounded-full p-2 shadow-md hover:scale-105 transition"
        >
          <FaArrowLeft className="text-lg rotate-180" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setImagesIndex(idx)}
            aria-label={`go to ${idx + 1}`}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === imagesIndex ? "bg-white scale-125" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
