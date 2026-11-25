import React from "react";

const AuthSkeleton = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#F7F8FA] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md rounded-3xl border border-white/85 bg-white/75 p-7 sm:p-9 shadow-[0_24px_60px_rgba(15,23,42,0.10)] backdrop-blur-2xl animate-pulse">
        {/* Top Accent */}
        <div className="mx-auto mb-6 h-1 w-32 rounded-full bg-gray-200" />

        {/* Logo & Title Skeleton */}
        <div className="mb-7 flex flex-col items-center space-y-3">
          <div className="h-11 w-40 rounded-xl bg-gray-200" />
          <div className="h-7 w-48 rounded-lg bg-gray-200" />
          <div className="h-4 w-64 rounded-md bg-gray-100" />
        </div>

        {/* Social Buttons Skeleton */}
        <div className="grid grid-cols-2 gap-3">
          <div className="h-11 rounded-xl bg-gray-200" />
          <div className="h-11 rounded-xl bg-gray-200" />
        </div>

        {/* Divider Skeleton */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <div className="h-3 w-20 rounded bg-gray-200" />
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Inputs Skeleton */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-3 w-24 rounded bg-gray-200" />
            <div className="h-11 w-full rounded-xl bg-gray-200" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-24 rounded bg-gray-200" />
            <div className="h-11 w-full rounded-xl bg-gray-200" />
          </div>
          <div className="mt-4 h-12 w-full rounded-xl bg-gray-300" />
        </div>

        {/* Footer Link Skeleton */}
        <div className="mx-auto mt-6 h-4 w-48 rounded bg-gray-200" />
      </div>
    </div>
  );
};

export default AuthSkeleton;