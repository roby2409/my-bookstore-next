import { NavItemType } from "@/types/navbar";
import Link from "next/link";
import React from "react";
import { FaRegCopyright, FaWhatsapp } from "react-icons/fa6";
import Text from "../atoms/Text";

export default function FooterSection() {
  const navlinks: NavItemType[] = [
    { id: 1, text: "Home", to: "/dashboard", dropdown: "Home" },
    { id: 2, text: "My orders", to: "/myorders", dropdown: "My orders" },
  ];
  return (
    <>
      <footer className="border-color flex w-full flex-col items-center justify-between border-t py-10 text-sm sm:flex-row ">
        <div className="mb-6 flex gap-3 sm:mb-0">
          {navlinks?.map((nav) => (
            <Link
              key={nav.id}
              className=" text-dark hover:text-gray-800 hover:underline "
              rel="noopener noreferrer"
              href={nav.to}
            >
              <Text>{nav.text}</Text>
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-1">
          <FaRegCopyright />
          <Text>{new Date().getFullYear()} by Roby Setiawan</Text>
        </div>
      </footer>
    </>
  );
}
