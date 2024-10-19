'use client'
import React, { useEffect, useState } from "react";
import Adminlogin from "./login/superadmin/page";
import Loader from "@/components/common/Loader";
import { Metadata } from "next";
import { UserCog, HardHat, ContactRound, UserRoundPen, Settings2, Receipt } from "lucide-react";
import { Slides } from "@/types/data";
import Login from "./login/page";


export default function Home() {
 const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = Slides.length;

    const preloadImage = (src: any) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    };

    console.log(loadedCount)

    Promise.all(Slides.map(slide => preloadImage(slide.route)))
      .then(() => {
        setImagesLoaded(true);
      })
      .catch(error => {
        console.error("Error preloading images:", error);
        // Optionally set imagesLoaded to true even if some images fail to load
        setImagesLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const intervalId = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % Slides.length);
        setIsTransitioning(false);
      }, 1000); // Duration of the transition
    }, 5000); // Time each slide is displayed

    return () => clearInterval(intervalId);
  }, [imagesLoaded, nextIndex]);

  return (
    <>

    <Login/>
    
    
    </>
  );
}
