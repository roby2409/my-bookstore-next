import Text from "@/components/atoms/Text";
import { LayoutDashboard } from "../components/layouts/LayoutDashboard";
import { GetServerSideProps, NextApiRequest } from "next";
import { UserEntity } from "@/types/user_entity";
import { IncomingMessage } from "http";
import { LinkBooksSection } from "@/components/sections/ListBooksSection";
import { Books } from "@/types/books";
import { useEffect, useState } from "react";

interface DashboardProps {
  user: UserEntity | null;
}

export default function Dashboard({ user }: DashboardProps) {
  if (!user) {
    return null;
  }
  const [books, setBooks] = useState<Books[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBooks = async (): Promise<Books[] | null> => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BACKEND}/list-of-books`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data as Books[];
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  useEffect(() => {
    const getBooks = async () => {
      const booksData = await fetchBooks();
      setBooks(booksData);
      setLoading(false);
    };
    getBooks();
  }, []);

  return (
    <LayoutDashboard>
      <div className="w-full bg-white">
        <Text>
          Welcome, <b>{user.name}</b> choose your book
        </Text>
        <div className="container mx-auto bg-white">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Infinite Books
          </h1>
          {loading ? (
            <div className="h-80">
              <Text>Loading...</Text>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <LinkBooksSection books={books} user={user} />
            </div>
          )}
        </div>
      </div>
    </LayoutDashboard>
  );
}

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (
  context
) => {
  const userCookie = getCookie("user", context.req);

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

export function getCookie(name: string, req: IncomingMessage): string | null {
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
