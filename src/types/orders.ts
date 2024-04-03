import { Books } from "./books";

export interface Orders {
    id: number;
    userId: number;
    bookId: number;
    createdAt: Date;
    updatedAt: Date;
    book: Books;
}
