import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#F7F8FA] px-4 py-16 text-center">
      <div className="max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="text-5xl font-extrabold text-[#9E0B0F]">404</p>
        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          আপনি যে লিংক বা পণ্যটি খুঁজছেন তা সঠিক নয় অথবা সরিয়ে ফেলা হয়েছে।
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#9E0B0F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#7E080B]"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}