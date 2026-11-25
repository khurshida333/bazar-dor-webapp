"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { User, LogOut, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const UserInfo = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [imgError, setImgError] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const hasValidImage = Boolean(user?.image) && !imgError;
  const isSignInActive = pathname === "/sign-in";
  const isSignUpActive = pathname === "/sign-up";

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    setMenuOpen(false);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed out successfully.");
            router.push("/sign-in");
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(
              ctx.error?.message || "Failed to sign out. Please try again.",
            );
          },
        },
      });
    } catch (err) {
      toast.error("An unexpected error occurred while signing out.");
    } finally {
      setIsSigningOut(false);
    }
  };

  const getAuthButtonClass = (isActive) =>
    isActive
      ? "text-sm font-semibold text-green-700 bg-transparent border border-green-700 px-4 py-2 rounded transition"
      : "text-sm font-semibold text-white bg-green-700 border border-green-700 hover:bg-green-800 hover:border-green-800 px-4 py-2 rounded transition";

  if (isPending) {
    return (
      <div className="flex items-center gap-3 animate-pulse" aria-hidden="true">
        <div className="h-9 w-9 rounded-full bg-gray-200" />
        <div className="hidden sm:block h-4 w-24 rounded bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      {user ? (
        <>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center gap-2.5 rounded-lg px-2 py-1 text-left transition hover:bg-gray-100 cursor-pointer"
          >
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-[#9E0B0F] ring-offset-2 ring-offset-white bg-gray-100">
              {hasValidImage ? (
                <Image
                  src={user.image}
                  alt={user.name || "User avatar"}
                  fill
                  unoptimized
                  sizes="36px"
                  onError={() => setImgError(true)}
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-500">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
            <span className="hidden sm:inline text-sm font-semibold text-gray-800">
              {user.name}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
              <div className="border-b border-gray-100 px-3 py-2">
                <p className="truncate text-sm font-bold text-gray-900">
                  {user.name}
                </p>
                <p className="truncate text-xs text-gray-500">{user.email}</p>
              </div>

              <div className="mt-1 flex flex-col gap-1">
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  <User className="h-4 w-4 text-gray-500" />
                  <span>আমার প্রোফাইল</span>
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{isSigningOut ? "Signing out..." : "সাইন আউট"}</span>
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            aria-current={isSignInActive ? "page" : undefined}
            className={getAuthButtonClass(isSignInActive)}
          >
            সাইন ইন
          </Link>
          <Link
            href="/sign-up"
            aria-current={isSignUpActive ? "page" : undefined}
            className={getAuthButtonClass(isSignUpActive)}
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;