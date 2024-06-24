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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Item({ book }) {
  const handleDelete = () => {
    console.log("dasd");
  };

  return (
    <Card className="mt-6 w-96 aa mx-3 mb-4 flex-col">
      <CardHeader color="blue-gray" className="relative h-75">
        <Menu as="div" className="flex-end flex justify-end">
          <div>
            <MenuButton className="rounded-full bg-blue-600  items-center p-2 w-5 h-5 align-middle flex justify-center mb-2 cursor-pointer">
              <span className="mb-3 text-center font-bold">...</span>
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  {({ focus }) => (
                    <a
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
                <MenuItem>
                  {({ focus }) => (
                    <a
                      href="#"
                      className={classNames(
                        focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Duplicate
                    </a>
                  )}
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  {({ focus }) => (
                    <a
                      href="#"
                      className={classNames(
                        focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Archive
                    </a>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <a
                      href="#"
                      className={classNames(
                        focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Move
                    </a>
                  )}
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  {({ focus }) => (
                    <a
                      href="#"
                      className={classNames(
                        focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Share
                    </a>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <a
                      href="#"
                      className={classNames(
                        focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Add to favorites
                    </a>
                  )}
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  {({ focus }) => (
                    <a
                      onClick={handleDelete}
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
        <div className="flex items-center align-middle justify-center">
          <img
            className="cursor-pointer max-h-80"
            src={book.cover_image}
            alt="card-image"
          />
        </div>
      </CardHeader>
      <CardBody className="mt-3">
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2 text-black font-semibold"
        >
          {book.title}
        </Typography>
        <Typography>{book.description}</Typography>
      </CardBody>
      <CardFooter className="pt-0 items-end justify-end flex">
        <Button className="text-black items-end justify-end flex my-2 mr-5">
          {book.author}
        </Button>
      </CardFooter>
    </Card>
  );
}
