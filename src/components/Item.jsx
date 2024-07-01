/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import "./boxShadow.css";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentBook, deleteBook, getTheBook, setModal } from "../redux/bookSlice";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Item({ book }) {
  const dispatch = useDispatch();
  const {currentBook, loading, error } = useSelector(state => state.bookSlice)

  const handleDelete = (id) => {

    dispatch(deleteBook({ id }))
      .unwrap() // unwrap ile async thunk'ın döndüğü promise'den çıkıyoruz
      .then(() => {
        console.log("Book deleted successfully!");
      })
      .catch((error) => {
        console.error("Failed to delete the book: ", error);
      });
  };

  const handleEdit = () => {
    dispatch(setModal({ showModal: true, book }));
  };



  return (
    <Card className="mt-6 w-96 max-h-[40rem] aa mb-4 flex-col cursor-pointer align-middle justify-center mx-auto" onClick={() => dispatch(changeCurrentBook(book))}>
      <CardHeader color="blue-gray" className="relative h-75">
        <Menu as="div" className="flex-end flex justify-end z-50">
          <div>
            <MenuButton className="rounded-full bg-blue-600  items-center p-2 w-5 h-5 align-middle flex justify-center mb-2 cursor-pointer">
              <span className="mb-3 text-center font-bold">...</span>
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 z-999 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  {({ focus }) => (
                    <a
                      onClick={handleEdit}
                      href="#"
                      className={classNames(
                        focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Edit
                    </a>
                  )}
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  {({ focus }) => (
                    <a
                      onClick={() => handleDelete(book.id)}
                      href="#"
                      className={classNames(
                        focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Delete
                    </a>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </div>
        </Menu>
        <Link to={`books/${book.id}`}>
          <div className="flex items-center align-middle justify-center">
            <img
              className="cursor-pointer max-h-80 max-w-90"
              src={book.image}
              alt="card-image"
            />
          </div>
        </Link>
      </CardHeader>
      <Link to={`books/${book.id}`}>
        <CardBody className="mt-3 text-wrap h-[13rem]">
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 text-black font-semibold break-word"
          >
            {book.name}
          </Typography>
          <Typography className="break-word truncate h-[8rem] ">
            {book.description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 items-end justify-end flex">
          <Button className="text-black items-end justify-end flex my-2 mr-5">
            {book.author}
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
