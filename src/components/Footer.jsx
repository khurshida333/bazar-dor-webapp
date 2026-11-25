import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white text-gray-700">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Bazar Dor logo"
                width={36}
                height={36}
                className="rounded-lg object-cover"
              />
              <span className="text-lg font-extrabold tracking-tight text-green-700">
                Bazar Dor
              </span>
            </Link>
            <p className="text-sm font-medium text-gray-700">
              বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
            <p className="text-xs leading-relaxed text-gray-500">
              সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              দ্রুত লিংক
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="transition-colors underline decoration-green-700 hover:text-green-700"
                >
                  হোম
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="transition-colors underline decoration-green-700 hover:text-green-700"
                >
                  আমার প্রোফাইল
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-in"
                  className="transition-colors underline decoration-green-700 hover:text-green-700"
                >
                  সাইন ইন
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-up"
                  className="transition-colors underline decoration-green-700 hover:text-green-700"
                >
                  সাইন আপ
                </Link>
              </li>
            </ul>
          </div>

          {/* Market Note */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              তথ্য ও নোট
            </h3>
            <p className="text-xs leading-relaxed text-gray-500">
              দৈনন্দিন নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ বাজার দর সহজে যাচাই করতে
              নিয়মিত ভিজিট করুন। স্থানীয় পাইকারি ও খুচরা বাজারভেদে দামের
              তারতম্য হতে পারে।
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-6 text-xs text-gray-500 sm:flex-row">
          <p>© 2026 Bazar Dor (বাজার দর). সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="text-center sm:text-right">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
