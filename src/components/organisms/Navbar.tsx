// Next.js
import { useRouter } from "next/router";
import Link from "next/link";
import DropDownNav from "@/components/molecules/DropdownNav";
import { NavItemType } from "@/types/navbar";
import LogoutNav from "../molecules/LogoutNav";

const NavbarSection: React.FC = () => {
  const navlinks: NavItemType[] = [
    { id: 1, text: "Home", to: "/dashboard", dropdown: "Home" },
    { id: 2, text: "My orders", to: "/myorders", dropdown: "My orders" },
  ];

  const router = useRouter();

  return (
    <nav className="fixed top-8 z-10 mb-12 flex h-14 w-[80%] items-center justify-between rounded-lg border border-stone-200 bg-gray-100 bg-gray-100/50 px-6 backdrop-blur-md md:w-[80rem]">
      <div className="flex lg:hidden">
        <DropDownNav items={navlinks} />
      </div>
      <div className="hidden lg:flex">
        {navlinks?.map((nav) => (
          <LinkTag
            key={nav.id}
            className={`${router.pathname === nav.to && "bg-gray-300"}`}
            to={nav.to}
          >
            {nav.text}
          </LinkTag>
        ))}
      </div>
      <LogoutNav />
    </nav>
  );
};

export default NavbarSection;

const LinkTag = ({
  children,
  to,
  className,
}: {
  children: React.ReactNode;
  to: string;
  className?: string | undefined;
}) => {
  return (
    <Link
      className={`mr-8 rounded-lg p-2 text-sm text-gray-600 outline-none
      ring-teal-400 duration-300 hover:bg-gray-100 focus:ring-4 focus:ring-offset-2 ${className}`}
      href={to}
    >
      {children}
    </Link>
  );
};
