import { FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import { useEffect, useState } from "react";
import { RoundedButtonBox } from "../atoms/RoundedButtonBox";
import Text from "@/components/atoms/Text";
import { deleteCookie } from "@/utils/cookie-handling";
import { useRouter } from "next/router";

const LogoutNav: React.FC = () => {
  const router = useRouter();
  const logoutHandle = () => {
    deleteCookie("user");
    deleteCookie("token");
    router.push("/");
  };
  return (
    <>
      <RoundedButtonBox title={`Logout `} onClick={() => logoutHandle()}>
        <FiLogOut />
      </RoundedButtonBox>
    </>
  );
};

export default LogoutNav;
