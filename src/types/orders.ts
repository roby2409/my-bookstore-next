import { Books } from "./books";

export interface Orders {
    id: number;
    userId: number;
    bookId: number;
    book: Books;
}
