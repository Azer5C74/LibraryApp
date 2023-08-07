import { Book, PrismaClient, User } from "@prisma/client";
import {
  BooksByOwnerArgs,
  UpdateBookOwnerArgs,
  DeleteBookArgs,
  BookQueryArgs,
  PaginationInput,
} from "./types";
import { ApolloError } from "apollo-server-express";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    booksByOwner: async (_: any, args: BooksByOwnerArgs): Promise<Book[]> => {
      const user = await prisma.user.findUnique({
        where: { id: args.ownerId },
        include: { books: true },
      });

      if (!user) {
        throw new Error(`User with id ${args.ownerId} not found`);
      }

      return user.books;
    },

    allBooks: async (
      _: any,
      { pagination }: { pagination: PaginationInput }
    ): Promise<Book[]> => {
      const { page = 1, perPage = 10 } = pagination;
      const books = await prisma.book.findMany({
        include: { owner: true },
        skip: (page - 1) * perPage,
        take: perPage,
      });
      return books;
    },

    allUsers: async (
      _: any,
      { pagination }: { pagination: PaginationInput }
    ): Promise<User[]> => {
      const { page = 1, perPage = 10 } = pagination;
      const users = await prisma.user.findMany({
        include: { books: true },
        skip: (page - 1) * perPage,
        take: perPage,
      });
      return users;
    },

    book: async (_: any, args: BookQueryArgs): Promise<Book | null> => {
      const book = await prisma.book.findUnique({
        where: { id: args.bookId },
        include: { owner: true },
      });
      if (!book) {
        throw new ApolloError(
          `Book with id ${args.bookId} not found`,
          "BOOK_NOT_FOUND"
        );
      }

      return book;
    },
    totalCount: async () => {
      const count = await prisma.book.count();
      return count;
    },
  },
  Mutation: {
    updateBookOwner: async (
      _: any,
      args: UpdateBookOwnerArgs
    ): Promise<Book> => {
      let updatedBook;

      try {
        updatedBook = await prisma.book.update({
          where: { id: args.bookId },
          data: { ownerId: args.newOwnerId },
          include: { owner: true },
        });
      } catch (e) {
        throw new ApolloError(
          `Book with id ${args.bookId} not found Or Owner with id ${args.newOwnerId} not Found`,
          "NOT_FOUND"
        );
      }

      return updatedBook;
    },
    deleteBook: async (_: any, args: DeleteBookArgs): Promise<Boolean> => {
      const deletedBook = await prisma.book.delete({
        where: { id: args.bookId },
      });

      if (!deletedBook) {
        throw new ApolloError(
          `Book with id ${args.bookId} not found`,
          "BOOK_NOT_FOUND"
        );
      }
      return true;
    },
  },
};
export default resolvers;
