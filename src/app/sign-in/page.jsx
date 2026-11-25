"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import AuthSkeleton from "@/components/AuthSkeleton";

const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/";

  const { data: session, isPending } = authClient.useSession();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");
  const [formError, setFormError] = useState("");

  
  useEffect(() => {
    if (session?.user) {
      router.replace(nextUrl);
    }
  }, [session, nextUrl, router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const rememberMe = Boolean(formData.get("remember"));

    // Validation checks with react-hot-toast feedback
    if (!email) {
      const msg = "Please enter your email address.";
      setFormError(msg);
      toast.error(msg);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const msg = "Please enter a valid email address.";
      setFormError(msg);
      toast.error(msg);
      return;
    }

    if (!password) {
      const msg = "Please enter your password.";
      setFormError(msg);
      toast.error(msg);
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
      });

      if (error) {
        const message =
          error.code === "INVALID_EMAIL_OR_PASSWORD" || error.status === 401
            ? "Invalid email or password. Please check your credentials and try again."
            : error.message || "Could not sign you in. Please try again.";

        setFormError(message);
        toast.error(message);
        return;
      }

      if (data) {
        toast.success("Logged in successfully! Welcome back.");
        router.push(nextUrl);
        router.refresh();
      }
    } catch (err) {
      const fallback = "An unexpected error occurred during login.";
      setFormError(fallback);
      toast.error(fallback);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSignIn = async (provider) => {
    setFormError("");
    setSocialLoading(provider);
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: nextUrl,
      });

      if (error) {
        const msg = error.message || `Failed to sign in with ${provider}.`;
        setFormError(msg);
        toast.error(msg);
        setSocialLoading("");
      }
    } catch (err) {
      const msg = `Could not connect to ${provider}. Please try again.`;
      setFormError(msg);
      toast.error(msg);
      setSocialLoading("");
    }
  };

  if (isPending) {
    return <AuthSkeleton />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#F7F8FA] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans text-gray-900">
      <style>{`
        @keyframes glossDriftA {
          0%, 100% { transform: translate(0px, 0px) rotate(18deg); }
          50% { transform: translate(-20px, -18px) rotate(10deg); }
        }
        @keyframes glossDriftB {
          0%, 100% { transform: translate(0px, 0px) rotate(-16deg); }
          50% { transform: translate(18px, -16px) rotate(-24deg); }
        }
        @keyframes glossDriftC {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-14px, 14px) scale(1.06); }
        }
        .animate-drift-a { animation: glossDriftA 12s ease-in-out infinite; }
        .animate-drift-b { animation: glossDriftB 15s ease-in-out infinite; }
        .animate-drift-c { animation: glossDriftC 10s ease-in-out infinite; }
      `}</style>

      {/* Background Floating Shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-drift-a absolute top-[7%] right-[14%] sm:right-[24%] h-48 w-48 rounded-[3rem] bg-gradient-to-bl from-green-500 via-green-700 to-green-900 shadow-[inset_0_3px_12px_rgba(255,255,255,0.65),0_20px_45px_rgba(21,128,61,0.28)] ring-1 ring-green-200/60" />
        <div className="animate-drift-c absolute top-[18%] left-[18%] sm:left-[28%] h-32 w-32 rounded-full border-[18px] border-green-600/85 bg-transparent shadow-[inset_0_2px_8px_rgba(255,255,255,0.7),0_16px_32px_rgba(21,128,61,0.22)] ring-1 ring-white/70" />
        <div className="animate-drift-b absolute bottom-[8%] left-[12%] sm:left-[22%] h-40 w-80 rounded-full bg-gradient-to-tr from-green-900 via-green-700 to-green-400 shadow-[inset_0_3px_14px_rgba(255,255,255,0.6),0_24px_50px_rgba(21,128,61,0.28)] ring-1 ring-green-200/60" />
        <div className="animate-drift-c absolute bottom-[19%] right-[22%] sm:right-[30%] h-28 w-28 rounded-full bg-gradient-to-tl from-green-800 via-green-600 to-green-300 shadow-[inset_0_3px_10px_rgba(255,255,255,0.75),0_14px_30px_rgba(21,128,61,0.24)] ring-1 ring-white/60" />
        <div className="absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-600/10 blur-3xl" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/85 bg-white/75 p-7 sm:p-9 shadow-[0_24px_60px_rgba(15,23,42,0.10),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-x-8 top-0 h-1 rounded-b-full bg-green-700" />

        {/* Header */}
        <div className="mb-7 text-center">
          <Link href="/" className="mx-auto mb-3 inline-flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Bazar Dor png"
              width={44}
              height={44}
              priority
              className="rounded-lg object-cover shadow-xs"
            />
            <span className="text-xl font-extrabold tracking-tight text-green-700">
              Bazar Dor
            </span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Login to your account
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Welcome back! Enter your details to continue.
          </p>
        </div>

        {/* Social Login Buttons (Google & GitHub) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => handleSocialSignIn("google")}
            disabled={Boolean(socialLoading) || isSubmitting}
            type="button"
            className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-gray-200/90 bg-white/90 px-4 py-2.5 text-sm font-semibold text-gray-800 shadow-xs transition-all hover:border-gray-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-green-700/25 disabled:opacity-60 cursor-pointer"
          >
            {socialLoading === "google" ? (
              <Loader2 className="h-4 w-4 animate-spin text-green-700" />
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            )}
            <span>Google</span>
          </button>

          <button
            onClick={() => handleSocialSignIn("github")}
            disabled={Boolean(socialLoading) || isSubmitting}
            type="button"
            className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-gray-200/90 bg-white/90 px-4 py-2.5 text-sm font-semibold text-gray-800 shadow-xs transition-all hover:border-gray-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-green-700/25 disabled:opacity-60 cursor-pointer"
          >
            {socialLoading === "github" ? (
              <Loader2 className="h-4 w-4 animate-spin text-green-700" />
            ) : (
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            )}
            <span>GitHub</span>
          </button>
        </div>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200/90" />
          <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
            or with email
          </span>
          <div className="h-px flex-1 bg-gray-200/90" />
        </div>

        {/* Inline Error Message */}
        {formError && (
          <div
            role="alert"
            className="mb-4 rounded-xl border border-red-200 bg-red-50/90 px-3.5 py-2.5 text-xs font-medium text-red-700"
          >
            {formError}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-700"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-200/90 bg-white/80 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 transition-all focus:border-green-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-700/20"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-200/90 bg-white/80 py-2.5 pl-10 pr-10 text-sm text-gray-900 placeholder:text-gray-400 transition-all focus:border-green-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-700/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2.5 pt-1">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 accent-green-700 focus:ring-green-700 cursor-pointer"
            />
            <label htmlFor="remember" className="text-xs text-gray-600 cursor-pointer">
              Keep me signed in on this device
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting || Boolean(socialLoading)}
            className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-green-700/25 transition-colors hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700/40 disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <span>Login</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>

        {/* Link to Register (/sign-up) */}
        <p className="mt-6 text-center text-xs text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-bold text-green-700 transition-colors hover:text-green-800 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

const SignInPage = () => {
  return (
    <Suspense fallback={<AuthSkeleton />}>
      <SignInForm />
    </Suspense>
  );
};

export default SignInPage;