"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const HeroBanner = ({ imageSrc }) => {
  const [banglaDate, setBanglaDate] = useState("");

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
      setBanglaDate(banglaDate);
    };

    updateDate();
  }, []);
  return (
    <section className="w-full bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 lg:p-12 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">
        <div className="flex-1 space-y-4 text-left">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs sm:text-sm font-medium min-h-[30px]">
            {banglaDate || "আজকের বাজার দর"}
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-bold text-gray-900 leading-tight tracking-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-sm sm:text-base text-gray-500 max-w-xl leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="pt-2">
            <a
              href="#সব-পণ্য"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#16803c] hover:bg-[#126931] active:scale-[0.99] text-white font-semibold text-sm sm:text-base shadow-sm transition-all"
            >
              সব পণ্য দেখুন
            </a>
          </div>
        </div>

        <div className="w-full md:w-auto flex justify-center md:justify-end shrink-0">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="বাজারের ঝুড়ি"
              width={260}
              height={240}
              priority
              className="w-48 sm:w-56 lg:w-64 h-auto object-contain"
            />
          ) : (
            <svg
              viewBox="0 0 260 230"
              className="w-48 sm:w-56 lg:w-64 h-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="বাজারের ঝুড়ি"
            >
              <ellipse cx="130" cy="212" rx="84" ry="10" fill="#ECEEEB" />

              <path
                d="M150 48C168 48 184 68 184 96C184 118 168 132 150 132C132 132 116 118 116 96C116 68 132 48 150 48Z"
                fill="#22C55E"
              />
              <path
                d="M150 48C148 36 141 29 134 26"
                stroke="#15803D"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M151 47C156 37 164 33 171 33"
                stroke="#15803D"
                strokeWidth="4"
                strokeLinecap="round"
              />

              <circle cx="96" cy="96" r="32" fill="#EF4444" />
              <path
                d="M96 64C94 53 88 47 82 44"
                stroke="#15803D"
                strokeWidth="4"
                strokeLinecap="round"
              />

              <circle cx="72" cy="120" r="19" fill="#9333EA" />

              <circle cx="122" cy="121" r="20" fill="#F97316" />

              <circle cx="176" cy="118" r="20" fill="#FACC15" />

              <path
                d="M54 132H206L189 204C187.5 209 183 212 178 212H82C77 212 72.5 209 71 204L54 132Z"
                fill="#B45309"
              />

              <rect
                x="48"
                y="124"
                width="164"
                height="14"
                rx="7"
                fill="#92400E"
              />

              <line
                x1="88"
                y1="138"
                x2="94"
                y2="212"
                stroke="#78350F"
                strokeWidth="3"
              />
              <line
                x1="116"
                y1="138"
                x2="118"
                y2="212"
                stroke="#78350F"
                strokeWidth="3"
              />
              <line
                x1="144"
                y1="138"
                x2="142"
                y2="212"
                stroke="#78350F"
                strokeWidth="3"
              />
              <line
                x1="172"
                y1="138"
                x2="166"
                y2="212"
                stroke="#78350F"
                strokeWidth="3"
              />
            </svg>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
