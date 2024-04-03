import Image from "next/image";
import { Inter } from "next/font/google";
import LoginSection from "@/components/sections/LoginSection";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`antialiased bg-gray-200 text-gray-900 font-sans${inter.className}`}
    >
      <LoginSection />
    </main>
  );
}
