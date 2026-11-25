import { Noto_Sans_Bengali, Noto_Color_Emoji } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navlinks from "@/components/Navlinks";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700"],
});

const notoColorEmoji = Noto_Color_Emoji({
  weight: "400",
  subsets: ["emoji"],
  variable: "--font-emoji",
});

export const metadata = {
  title: "বাজার দর | Bazardor",
  description: "আজকের বাজারের দাম এক নজরে",
};

export default function RootLayout({ children }) {
  return (
    <html
      style={{ scrollBehavior: "smooth" }}
      lang="bn"
      translate="no"
      data-theme="light"
      suppressHydrationWarning
      className={`${notoSansBengali.className} ${notoColorEmoji.variable} h-full antialiased notranslate`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#f7f8f6] text-gray-900"
      >
        <Toaster position="top-right" />
        <Header />
        <Suspense>
          <Navlinks />
        </Suspense>

        <main className="flex-1">
          <Suspense>{children}</Suspense>
        </main>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
