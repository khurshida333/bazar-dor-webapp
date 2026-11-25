"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export function useRequireAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const notifiedRef = useRef(false);

  useEffect(() => {
    if (!isPending && !session?.user && !notifiedRef.current) {
      notifiedRef.current = true;
      toast.error("Please sign in to access this page.");
      router.replace(`/sign-in?next=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, session, pathname, router]);

  return {
    session,
    user: session?.user,
    isPending,
  };
}