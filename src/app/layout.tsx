"use client"
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Suspense, useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";


const inter = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

   const [load, setLoad] = useState(true)

   useEffect(() => {
    setTimeout(() => {
      setLoad(false)
    }, 1000)
  }, [])


  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <div className=" bg-primary">
          <Suspense fallback={<Loader/>}>
            {load ? <Loader/> : children}
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
          </Suspense>
          
        </div>
        </body>
    </html>
  );
}
