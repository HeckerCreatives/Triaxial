"use client"
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Suspense, useEffect, useRef, useState } from "react";
import Loader from "@/components/common/Loader";
import { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import Fixed1920Wrapper from "@/components/common/Wrapper";


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
        <div className=" bg-primary w-full">
          <Suspense fallback={<Loader/>}>
            {load ? <Loader/> : 
             <Fixed1920Wrapper>{children}</Fixed1920Wrapper>
           }
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
