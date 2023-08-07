import { Book, User } from '@prisma/client';

export interface BooksByOwnerArgs {
  ownerId: number;
}

export interface UpdateBookOwnerArgs {
  bookId: number;
  newOwnerId: number;
}

export interface DeleteBookArgs {
  bookId: number;
}

export interface BookQueryArgs {
  bookId: number;
}

export interface PaginationInput {
    page?: number;
    perPage?: number;
  }
  
export interface Query {
  booksByOwner(_: any, args: BooksByOwnerArgs): Promise<Book[]>;
  allBooks(_: any, args: { pagination: PaginationInput }): Promise<Book[]>;
  allBooks(_: any, args: { pagination: PaginationInput }): Promise<User[]>;
  book(_: any, args: BookQueryArgs): Promise<Book | null>;
}

export interface Mutation {
  updateBookOwner(_: any, args: UpdateBookOwnerArgs): Promise<Book>;
  deleteBook(_: any, args: DeleteBookArgs): Promise<Boolean>;
}