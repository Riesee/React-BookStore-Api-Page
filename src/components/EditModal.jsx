import { useDispatch, useSelector } from "react-redux";
import { setModal, putBooks } from "../redux/bookSlice";
import { CloudUpload } from "@mui/icons-material";
import { useEffect, useState } from "react";

const EditModal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.bookSlice.showModal);
  const currentBook = useSelector((state) => state.bookSlice.currentBook);

  const [price, setPrice] = useState("");
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [publicationType, setPublicationType] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (currentBook) {
      setPrice(currentBook.price);
      setBookName(currentBook.name);
      setAuthor(currentBook.author);
      setDescription(currentBook.description);
      setPublicationType(currentBook.publicationType);
      setImage(currentBook.image);
    }
  }, [currentBook]);

  const closeModal = () => {
    dispatch(setModal({ showModal: false }));
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

  const handlerSaveChange = async () => {
    const updatedBook = {
      name: bookName,
      image: image,
      year: currentBook.year,
      pageNumber: currentBook.pageNumber,
      id: currentBook.id,
      publicationType: publicationType,
      author: author,
      price: price,
      description: description,
      category: currentBook.category, // category güncellenmiyorsa mevcut değeri kullanın
    };

    dispatch(putBooks({ id: currentBook.id, newBook: updatedBook }))
    .unwrap()
    .then(() => {
      closeModal(); // Başarıyla güncellendiğinde modalı kapatın
    })
    .catch((error) => {
      console.error("Failed to update the book: ", error);
    });
};

  if (!currentBook) return null; // currentBook nullsa modalı göstermiyoruz

  return (
    <>
      {console.log("girdi içerde")}
      {showModal && (
        <>
          <div className=" w-full h-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Editing {currentBook.name}
                  </h3>
                  {/* <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button> */}
                </div>
                {/*body*/}
                <div className="w-full h-100 relative p-6 flex-auto">
                  <div className="mx-auto my-auto">
                    <form className="max-w-md mx-auto my-auto">
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
                      <div className="grid md:grid-cols-2 md:gap-6">
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

export default EditModal;
