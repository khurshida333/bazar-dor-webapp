"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import UserInfo from "./UserInfo";

const Header = () => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const date = new Date();
      const banglaDate = date.toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
      });
      setFormattedDate(banglaDate);
    };

    updateDate();
  }, []);
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-22 sm:px-12 lg:px-22 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3.5">
          <Image
            src="/logo.png"
            alt="বাজার দর লোগো"
            width={44}
            height={44}
            priority
            className="rounded-xl object-cover"
          />
          <div className="flex flex-col items-start">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 leading-tight">
              বাজার দর
            </span>
            <span className="text-xs text-gray-500 mt-0.5">
              {formattedDate}
            </span>
          </div>
        </Link>

        <Suspense
          fallback={
            <div
              className="flex items-center gap-3 animate-pulse"
              aria-hidden="true"
            >
              <div className="h-9 w-20 rounded bg-gray-200" />
              <div className="h-9 w-20 rounded bg-gray-200" />
            </div>
          }
        >
          <UserInfo />
        </Suspense>
      </div>
    </header>
  );
};

export default Header;
