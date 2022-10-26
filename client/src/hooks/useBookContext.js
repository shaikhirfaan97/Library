import { BooksContext } from "../context/BooksContext";
import { useContext } from "react";


export const useBookContext = () => {
  const context = useContext(BooksContext);

  if (!context) {
    throw Error("useBooksContext must be used with BooksContextProvider");
  }

  return context;
};
