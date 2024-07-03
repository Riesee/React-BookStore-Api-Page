import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTheBook } from "./../redux/bookSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./TheBook.css";
import AddBook from "../components/AddBook";

const TheBook = () => {
  const [updateTheBookModal, setUpdateTheBookModal] = useState(false);
  const { bookId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("bookid the book", { bookId }.bookId);
    dispatch(getTheBook({ bookId }.bookId));
  }, [bookId,dispatch]);

  const { loading, currentBook, error } = useSelector(
    (state) => state.bookSlice
  );
  if (loading === "pending") {
    return <div>Loading...</div>;
  }

  if (loading === "succeeded") {
    return (
      <>
        <Navbar />
        <section className="book-details !pt-5">
          <div className="">
            <div className="book-details-content grid">
              <div className="book-details-img ">
                <img
                  src={currentBook?.image}
                  alt="cover img"
                  className="!max-h-full"
                />
              </div>
              <div className="book-details-info !h-full">
                <div className="book-details-item title font-bold text-4xl">
                  <span className="fw-6 fs-24">{currentBook?.name}</span>
                </div>
                <div className="mb-2 !flex align-middle !items-start justify-start max-w-[50rem]">
                  <div className="w-1/2">
                    <span className="fw-6 font-bold">Book Price: </span>
                    <span className="text-italic">{currentBook?.price}</span>
                  </div>
                  <div className="w-1/2">
                    <span className="fw-6 font-bold">Book Author: </span>
                    <span className="text-italic">{currentBook?.author}</span>
                  </div>
                </div>
                <div className="mb-2 !flex align-middle items-start justify-start max-w-[50rem]">
                  <div className="w-1/2">
                    <span className="fw-6 font-bold">
                      Book Publication Type:{" "}
                    </span>
                    <span>{currentBook?.publicationType}</span>
                  </div>
                  <div className="w-1/2">
                    <span className="fw-6 font-bold">Book Year: </span>
                    <span>{currentBook?.year}</span>
                  </div>
                </div>

                <div className="mb-10 !flex align-middle items-start justify-start max-w-[50rem]">
                  <div className="w-1/2">
                    <span className="fw-6 font-bold">Book Page Number: </span>
                    <span>{currentBook?.pageNumber}</span>
                  </div>
                  <div className="w-1/2">
                    <span className="fw-6 font-bold">Book Category: </span>
                    <span>{currentBook?.category}</span>
                  </div>
                </div>
                <div className="book-details-item description">
                  <span>{currentBook?.description}</span>
                  <br />
                  <span>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Laborum consequuntur sunt, hic quisquam earum laudantium
                    voluptates consequatur repellat voluptas, eius veniam
                    debitis reiciendis rerum nemo, quia sit cupiditate assumenda
                    voluptatem?
                  </span>
                  <span>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Laborum consequuntur sunt, hic quisquam earum laudantium
                    voluptates consequatur repellat voluptas, eius veniam
                    debitis reiciendis rerum nemo, quia sit cupiditate assumenda
                    voluptatem?
                  </span>
                  <span>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Laborum consequuntur sunt, hic quisquam earum laudantium
                    voluptates consequatur repellat voluptas, eius veniam
                    debitis reiciendis rerum nemo, quia sit cupiditate assumenda
                    voluptatem?
                  </span>
                  <span>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Laborum consequuntur sunt, hic quisquam earum laudantium
                    voluptates consequatur repellat voluptas, eius veniam
                    debitis reiciendis rerum nemo, quia sit cupiditate assumenda
                    voluptatem?
                  </span>
                  <span>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Laborum consequuntur sunt, hic quisquam earum laudantium
                    voluptates consequatur repellat voluptas, eius veniam
                    debitis reiciendis rerum nemo, quia sit cupiditate assumenda
                    voluptatem?
                  </span>
                  <span>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Laborum consequuntur sunt, hic quisquam earum laudantium
                    voluptates consequatur repellat voluptas, eius veniam
                    debitis reiciendis rerum nemo, quia sit cupiditate assumenda
                    voluptatem?
                  </span>
                  <span>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Laborum consequuntur sunt, hic quisquam earum laudantium
                    voluptates consequatur repellat voluptas, eius veniam
                    debitis reiciendis rerum nemo, quia sit cupiditate assumenda
                    voluptatem?
                  </span>
                </div>
                <div className="flex items-center align-middle justify-end w-full">
                  <button
                    className="bg-blue-600 text-white rounded p-3 mr-10"
                    onClick={() => setUpdateTheBookModal(true)}
                  >
                    Update
                  </button>
                  <AddBook
                    addBookModall={updateTheBookModal}
                    setAllBookModall={setUpdateTheBookModal}
                    addBookk={false}
                    book={currentBook}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
};

export default TheBook;
