"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User, LogOut, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRequireAuth } from "@/hooks/useRequireAuth";

const ProfilePage = () => {
  const router = useRouter();
  const { user, isPending } = useRequireAuth();

  const [imgError, setImgError] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed out successfully.");
            router.push("/sign-in");
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(ctx.error?.message || "Failed to sign out.");
          },
        },
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 animate-pulse">
        <div className="h-7 w-40 rounded bg-gray-200 mb-6" />
        <div className="h-28 w-full rounded-2xl bg-gray-200 mb-6" />
        <div className="h-36 w-full rounded-2xl bg-gray-200" />
      </div>
    );
  }

  if (!user) return null;

  const hasValidImage = Boolean(user.image) && !imgError;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* User Summary Card */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200">
            {hasValidImage ? (
              <Image
                src={user.image}
                alt={user.name || "User avatar"}
                fill
                unoptimized
                sizes="56px"
                onError={() => setImgError(true)}
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-500">
                <User className="h-6 w-6" />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3.5 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60 cursor-pointer"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>{isSigningOut ? "Signing out..." : "সাইন আউট"}</span>
        </button>
      </div>

      {/* Info & Navigate to Update Form */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
        <h3 className="text-base font-bold text-gray-900 mb-4">তথ্য</h3>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              নাম / Name
            </p>
            <p className="mt-1 text-sm font-medium text-gray-800">
              {user.name}
            </p>
          </div>

          <Link
            href="/profile/edit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#16A34A] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#15803D]"
          >
            <Pencil className="h-4 w-4" />
            <span>Update Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;