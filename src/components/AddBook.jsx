/* eslint-disable react/prop-types */
import { CloudUpload } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postBooks, putBooks } from "../redux/bookSlice";

const AddBook = ({ addBookModall, setAllBookModall, addBookk, book }) => {
  const dispatch = useDispatch();
  const entities = useSelector((state) => state.bookSlice.entities);
  console.log(addBookk);

  const [image, setImage] = useState(addBookk ? " " : book.image);
  const [bookName, setBookName] = useState(addBookk ? " " : book.name);
  const [author, setAuthor] = useState(addBookk ? " " : book.author);
  const [price, setPrice] = useState(addBookk ? " " : book.price);
  const [publicationType, setPublicationType] = useState(
    addBookk ? " " : book.publicationType
  );
  const [year, setYear] = useState(addBookk ? " " : book.year);
  const [pageNumber, setPageNumber] = useState(
    addBookk ? " " : book.pageNumber
  );
  const [category, setCategory] = useState(addBookk ? " " : book.category);
  const [description, setDescription] = useState(
    addBookk ? " " : book.description
  );

  const closeModal = () => {
    addBookModall = false;
    setAllBookModall(false);
  };

  const handlerSaveChange = () => {
    if (addBookk) {
      const newBook = {
        name: bookName,
        author: author,
        year: year,
        pageNumber: pageNumber,
        publicationType: publicationType,
        price: price,
        category: category,
        description: description,
        id: (entities.length + 4).toString(),
        image: image,
      };

      dispatch(postBooks({ newBook: newBook }))
        .unwrap()
        .then(() => {
          closeModal(); // Başarıyla güncellendiğinde modalı kapatın
        })
        .catch((error) => {
          console.error("Failed to update the book: ", error);
        });
    } else {
      const updatedBook = {
        name: bookName,
        author: author,
        year: year,
        pageNumber: pageNumber,
        publicationType: publicationType,
        price: price,
        category: category,
        description: description,
        id: book.id,
        image: image,
      };

      dispatch(putBooks({ id: book.id, newBook: updatedBook }))
        .unwrap()
        .then(() => {
          closeModal(); // Başarıyla güncellendiğinde modalı kapatın
        })
        .catch((error) => {
          console.error("Failed to update the book: ", error);
        });
    }
    setPrice("");
    setBookName("");
    setAuthor("");
    setDescription("");
    setPublicationType("");
    setImage("");
    setPageNumber("");
    setYear("");
    setCategory("");
    location.reload()
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // base64 formatında image
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {console.log("girdi içerde addbook")}
      {addBookModall && (
        <>
          <div className=" w-full h-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/2 my-4 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex text-black items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {addBookk ? "Add Book" : `Update Book`}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="w-full h-100 relative p-6 flex-auto">
                  <div className="mx-3 my-auto items-center justify-center align-middle flex">
                    <form className="w-full mx-3 my-auto">
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          className="mb-2 text-sm font-medium text-black items-center flex align-middle justify-center"
                          htmlFor="user_avatar"
                        >
                          Picture <CloudUpload className="ml-5" />
                        </label>
                        <input
                          className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                          aria-describedby="user_avatar_help"
                          id="user_avatar"
                          type="file"
                          onChange={handleImageChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 w-full">
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="floating_name"
                            id="floating_name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                            placeholder=" "
                            value={bookName}
                            onChange={(e) => setBookName(e.target.value)}
                            required
                          />
                          <label
                            htmlFor="floating_name"
                            className="peer-focus:font-medium absolute text-sm text-black  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Book Name
                          </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="floating_password"
                            id="floating_password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                            placeholder=" "
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                          />
                          <label
                            htmlFor="floating_password"
                            className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Book Author
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 w-full">
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="floating_first_name"
                            id="floating_first_name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                            placeholder=" "
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                          />
                          <label
                            htmlFor="floating_first_name"
                            className="peer-focus:font-medium absolute text-sm text-black  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Price
                          </label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="floating_last_name"
                            id="floating_last_name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                            placeholder=" "
                            value={publicationType}
                            onChange={(e) => setPublicationType(e.target.value)}
                            required
                          />
                          <label
                            htmlFor="floating_last_name"
                            className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Publication Type
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 w-full">
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="floating_first_name"
                            id="floating_first_name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                            placeholder=" "
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                          />
                          <label
                            htmlFor="floating_first_name"
                            className="peer-focus:font-medium absolute text-sm text-black  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Year
                          </label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="floating_last_name"
                            id="floating_last_name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                            placeholder=" "
                            value={pageNumber}
                            onChange={(e) => setPageNumber(e.target.value)}
                            required
                          />
                          <label
                            htmlFor="floating_last_name"
                            className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Page Number
                          </label>
                        </div>
                      </div>

                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="floating_last_name"
                          id="floating_last_name"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                          placeholder=" "
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                        />
                        <label
                          htmlFor="floating_last_name"
                          className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Category
                        </label>
                      </div>

                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Description
                        </label>
                        <textarea
                          id="message"
                          rows="4"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-black focus:border-black"
                          placeholder="Write a description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="grid md:grid-cols-2 md:gap-6"></div>
                    </form>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handlerSaveChange}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default AddBook;
