import { Orders } from "@/types/orders";
import {
  CardOrder,
  CardOrderContent,
  CardOrderDescription,
  CardOrderFooter,
  CardOrderHeader,
  CardOrderTitle,
} from "@/components/atoms/card_orders";
import Text from "../atoms/Text";
import Button from "../atoms/button";
import { UserEntity } from "@/types/user_entity";
import { deleteCookie, getCookie, setCookie } from "@/utils/cookie-handling";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export interface OrderProps {
  orders: Orders[] | null;
  user: UserEntity;
}

export function LinkOrdersSection({ orders, user }: OrderProps) {
  const router = useRouter();
  const handleClick = async (orderId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACKEND}/order/${orderId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const user = data as UserEntity;
        setCookie("user", JSON.stringify(user));
        toast.success(`Welcome bro ${user.name} your point is ${user.point}`, {
          position: "top-left",
          autoClose: 400, // Close after 2 seconds
          onClose: () => {
            router.push("/myorders");
          },
        });
      } else if (response.status === 401) {
        deleteCookie("user");
        deleteCookie("token");
        toast.error(data.message, {
          position: "top-left",
          autoClose: 400, // Close after 2 seconds
          onClose: () => {
            router.push("/");
          },
        });
      } else {
        toast.error(`Failed to create order ${data.message}`, {
          position: "top-left",
        });
      }
    } catch (error) {
      toast.error(`something wrong ${error}`, {
        position: "top-left",
      });
    }
  };

  return (
    <>
      {orders && orders.length > 0 ? (
        orders.map((order) => {
          const { book } = order; // Destructure book from order
          return (
            <CardOrder key={order.id}>
              <CardOrderHeader>Order Id: {order.id}</CardOrderHeader>
              <CardOrderContent className="flex flex-col items-center justify-center p-4">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="object-contain h-48 rounded"
                />
              </CardOrderContent>
              <CardOrderFooter className="text-center flex flex-col p-4">
                <CardOrderTitle className="my-2">{book.title}</CardOrderTitle>
                <CardOrderDescription>
                  {book.tags.length > 0 && (
                    <span>
                      Tags:{" "}
                      {book.tags.map((tag, index) => (
                        <span key={index}>
                          {tag}
                          {index < book.tags.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </span>
                  )}
                </CardOrderDescription>
                <Text className="text-teal-400">Point: {book.point}</Text>
                <Button
                  className="bg-red-500 hover:bg-red-700"
                  onClick={() => handleClick(order.id)}
                >
                  Cancel Order
                </Button>
              </CardOrderFooter>
            </CardOrder>
          );
        })
      ) : (
        <div className="text-xl font-bold">No orders available !! </div>
      )}
    </>
  );
}
