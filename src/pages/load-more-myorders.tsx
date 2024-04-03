import Text from "@/components/atoms/Text";
import { LinkOrdersSection } from "@/components/sections/ListOrdersSection";
import { Orders } from "@/types/orders";
import { UserEntity } from "@/types/user_entity";
import { getCookie } from "@/utils/cookie-handling";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface LoadMoreMyOrdersProps {
  user: UserEntity | null;
}

export function LoadMoreMyOrders({ user }: LoadMoreMyOrdersProps) {
  if (!user) {
    return null;
  }
  const [orders, setOrders] = useState<Orders[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView } = useInView();

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const fetchOrders = async (pageNumber: number): Promise<Orders[] | null> => {
    const perPage = process.env.NEXT_PUBLIC_PER_PAGE;
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BACKEND}/list-of-buy?page=${pageNumber}&perPage=${perPage}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });

      const data = await response.json();
      const result = data as Orders[];
      // If the response is empty, there are no more pages to fetch
      if (result.length === 0) {
        setHasMore(false);
      }
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const loadMoreOrders = async () => {
    if (!hasMore) {
      return;
    }
    // Once the page 8 is reached repeat the process all over again.
    await delay(2000);
    const nextPage = (page % 7) + 1;
    const newProducts = (await fetchOrders(nextPage)) ?? [];
    // Stop loading more orders if the response is empty
    if (newProducts.length === 0) {
      return;
    }
    setOrders((prevProducts: Orders[]) => [...prevProducts, ...newProducts]);
    setPage(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMoreOrders();
    }
  }, [inView]);

  return (
    <>
      <LinkOrdersSection orders={orders} user={user} />
      {hasMore && (
        <div
          className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
          ref={ref}
        >
          <div className="h-80">
            <Text>Loading...</Text>
          </div>
        </div>
      )}
    </>
  );
}
