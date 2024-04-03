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

export interface BookProps {
  books: Books[] | null;
  user: UserEntity;
}

export function LinkBooksSection({ books, user }: BookProps) {
  const handleClick = async (bookId: number) => {
    console.log(`userid: ${user.id} book id : ${bookId}`);
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
              <Button onClick={() => handleClick(book.id)}>Order</Button>
            </CardBookFooter>
          </CardBook>
        ))
      ) : (
        <div className="text-xl font-bold">No books available !! </div>
      )}
    </>
  );
}
