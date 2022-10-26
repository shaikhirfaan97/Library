import React, { useEffect } from "react";
import BookDetails from "../../components/bookdetails/BookDetails";
import Navbar from "../../components/navbar/Navbar";
import { useBookContext } from "../../hooks/useBookContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../Home/Home.css";
import Student from "../../components/student/Student";
import AdditionalForm from "../../components/additional_form/AdditionalForm";

const Home = () => {
  // book import

  const { books, dispatch } = useBookContext();
  const { user } = useAuthContext();
  // const {user, dispatch: userDispatch} = useAuthContext();

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/api/books", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_BOOKS", payload: json });
      }
    };

    if (user) {
      fetchBooks();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <Navbar />
      <div className="home-content">
        <div className="user-detail">
          <Student user={user} />
        </div>

        {/* user form */}
        <AdditionalForm user={user} />

        <div className="books-list">
          <h2>Books in your account</h2>
          <div className="home-book">
            {books &&
              books.map((book) => <BookDetails book={book} key={book._id} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
