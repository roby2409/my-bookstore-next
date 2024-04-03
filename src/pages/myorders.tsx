import { UserEntity } from "@/types/user_entity";
import { LayoutDashboard } from "../components/layouts/LayoutDashboard";
import Text from "@/components/atoms/Text";
import { GetServerSideProps } from "next";
import { IncomingMessage } from "http";
import { useEffect, useState } from "react";
import { Orders } from "@/types/orders";
import { LinkOrdersSection } from "@/components/sections/ListOrdersSection";
import { getCookie } from "@/utils/cookie-handling";
import { LoadMoreMyOrders } from "./load-more-myorders";

interface MyOrdersProps {
  user: UserEntity | null;
}

export default function MyOrders({ user }: MyOrdersProps) {
  if (!user) {
    return null;
  }
  const [orders, setOrders] = useState<Orders[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOrders = async (): Promise<Orders[] | null> => {
    const perPage = process.env.NEXT_PUBLIC_PER_PAGE;
    const apiUrl = `${
      process.env.NEXT_PUBLIC_API_BACKEND
    }/list-of-buy?page=${1}&perPage=${perPage}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });

      const data = await response.json();
      return data as Orders[];
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  useEffect(() => {
    const getOrders = async () => {
      const ordersData = await fetchOrders();
      setOrders(ordersData);
      setLoading(false);
    };
    getOrders();
  }, []);

  return (
    <LayoutDashboard>
      <div className="w-full bg-white">
        <h2 className="text-xl text-slate-950">
          This is your orders <b>{user.name}</b>
        </h2>
        <Text className="text-sm text-lime-600">
          😁 Your Point still <b>{user.point}</b>
        </Text>
        <div className="container mx-auto bg-white">
          {loading ? (
            <div className="h-80">
              <Text>Loading...</Text>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <LinkOrdersSection orders={orders} user={user} />
              <LoadMoreMyOrders user={user} />
            </div>
          )}
        </div>
      </div>
    </LayoutDashboard>
  );
}

export const getServerSideProps: GetServerSideProps<MyOrdersProps> = async (
  context
) => {
  const userCookie = getCookieUser("user", context.req);

  let user: UserEntity | null = null;
  if (userCookie) {
    user = JSON.parse(userCookie);
  }

  return {
    props: {
      user,
    },
  };
};

export function getCookieUser(
  name: string,
  req: IncomingMessage
): string | null {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split("; ");
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  if (!cookie) {
    return null;
  }

  return cookie.split("=")[1];
}
