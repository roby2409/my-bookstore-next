import { Books } from "@/types/books";
import {
  CardBook,
  CardBookContent,
  CardBookDescription,
  CardBookFooter,
  CardBookHeader,
  CardBookTitle,
} from "@/components/atoms/card_book";
import Text from "../atoms/Text";
import Button from "../atoms/button";
import { UserEntity } from "@/types/user_entity";
import { deleteCookie, getCookie, setCookie } from "@/utils/cookie-handling";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export interface BookProps {
  books: Books[] | null;
  user: UserEntity;
}

export function LinkBooksSection({ books, user }: BookProps) {
  const router = useRouter();
  const handleClick = async (bookId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACKEND}/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
          body: JSON.stringify({ userId: user.id, bookId }), // Assuming userId is 1 for example
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
      {books && books.length > 0 ? (
        books.map((book) => (
          <CardBook key={book.id}>
            <CardBookHeader>{book.writer}</CardBookHeader>
            <CardBookContent className="flex flex-col items-center justify-center p-4">
              <img
                src={book.coverImage}
                alt={book.title}
                className="object-contain h-48 rounded"
              />
            </CardBookContent>
            <CardBookFooter className="text-center flex flex-col p-4">
              <CardBookTitle className="my-2">{book.title}</CardBookTitle>
              <CardBookDescription>
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
              </CardBookDescription>
              <Text className="text-teal-400">Point: {book.point}</Text>
              <Button
                className="bg-blue-500 hover:bg-blue-700"
                onClick={() => handleClick(book.id)}
              >
                Order
              </Button>
            </CardBookFooter>
          </CardBook>
        ))
      ) : (
        <div className="text-xl font-bold">No books available !! </div>
      )}
    </>
  );
}
