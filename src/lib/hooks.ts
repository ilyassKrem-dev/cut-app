"use client"
import { useEffect, useState } from "react";

export const useSize = () => {
    const [windowSize,setWindowSize] = useState<number>(0)
    useEffect(() => {
      if(typeof window == undefined) return
      const setSize = () => {
        setWindowSize(window.innerWidth)
      }
      window.addEventListener("resize",setSize)
      setSize()
      return () => window.removeEventListener("resize",setSize)
    },[])
  
    return windowSize
  }