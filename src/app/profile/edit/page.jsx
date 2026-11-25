"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRequireAuth } from "@/hooks/useRequireAuth";

const EditProfileForm = ({ user }) => {
  const router = useRouter();
  const [name, setName] = useState(user?.name || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      const msg = "Please enter a valid name (at least 2 characters).";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }

    setIsUpdating(true);
    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        const msg = error.message || "Failed to update profile information.";
        setErrorMsg(msg);
        toast.error(msg);
        return;
      }

      toast.success("Profile information updated successfully!");
      router.push("/profile");
      router.refresh();
    } catch (err) {
      const msg = "An unexpected error occurred while updating.";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
      {errorMsg && (
        <div
          role="alert"
          className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700"
        >
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleUpdate} noValidate className="space-y-4">
        <div>
          <label
            htmlFor="profile-name"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-700"
          >
            নাম / Name
          </label>
          <input
            id="profile-name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#16A34A] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20"
          />
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#16A34A] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#15803D] disabled:opacity-60 cursor-pointer"
        >
          {isUpdating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Updating...</span>
            </>
          ) : (
            <span>Update Information</span>
          )}
        </button>
      </form>
    </div>
  );
};

const EditProfilePage = () => {
  const { user, isPending } = useRequireAuth();

  if (isPending) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 animate-pulse">
        <div className="h-7 w-44 rounded bg-gray-200 mb-6" />
        <div className="h-48 w-full rounded-2xl bg-gray-200" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 mb-3"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to My Profile</span>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">তথ্য আপডেট</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update your account name below.
        </p>
      </div>

      <EditProfileForm key={user.id || user.name} user={user} />
    </div>
  );
};

export default EditProfilePage;