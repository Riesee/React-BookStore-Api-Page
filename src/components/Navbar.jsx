import { useState, useEffect } from "react";
import AddBook from "./AddBook";
import Register from "./Register";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { changeLoggedIn, changeLoginRegister } from "../redux/bookSlice";
import { getAccounts } from "../redux/loginSlice";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

const Navbar = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.bookSlice.isLoggedIn);
  const loginRegister = useSelector((state) => state.bookSlice.loginRegister);

  const [modalState, setModalState] = useState({
    login: false,
    register: false,
    addBook: false,
  });

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  const toggleModal = (type) => {
    setModalState((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  const silecem = () => {
    dispatch(changeLoggedIn(!isLogin));
    dispatch(getAccounts());
  };

  return (
    <div className="bg-black text-white p-3">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold cursor-pointer" onClick={silecem}>
          BookStore
        </span>
        <div className="w-full">
          <form className="max-w-md mx-auto">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search any book..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center">
          <div
            className="mr-5 w-24 cursor-pointer bg-blue-600 hover:bg-blue-800 rounded border items-center justify-center align-middle p-2 flex"
            onClick={() => toggleModal("addBook")}
          >
            Add Book
          </div>
          {isLogin ? (
            <>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="flex items-center">
                    <span className="bg-pink-600 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
                      H
                    </span>
                    <span className="mx-1 cursor-pointer">Hilmi</span>
                    <ChevronDownIcon
                      className="-mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      {({ focus }) => (
                        <a
                          href="#"
                          className={classNames(
                            focus
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Account settings
                        </a>
                      )}
                    </MenuItem>
                    <form method="POST" action="#">
                      <MenuItem>
                        {({ focus }) => (
                          <button
                            type="submit"
                            onClick={() => dispatch(changeLoggedIn(false))}
                            className={classNames(
                              focus
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </MenuItem>
                    </form>
                  </div>
                </MenuItems>
              </Menu>
            </>
          ) : (
            <>
              <div
                className="mr-2 w-20 cursor-pointer bg-blue-600 hover:bg-blue-800 rounded border items-center justify-center align-middle p-2 flex"
                onClick={() => toggleModal("register")}
              >
                Register
              </div>
              <div
                className="mr-5 w-20 cursor-pointer bg-blue-600 hover:bg-blue-800 rounded border items-center justify-center align-middle p-2 flex"
                onClick={() => toggleModal("login")}
              >
                Login
              </div>
            </>
          )}
        </div>
      </div>
      <div className="w-96 h-full">
        <AddBook
          addBookModall={modalState.addBook}
          setAllBookModall={() => toggleModal("addBook")}
          addBookk={true}
        />
        {modalState.register && (
          <Register
            registermi={modalState.register}
            setRegistermi={() => toggleModal("register")}
            loginmi={modalState.login}
            setLoginmi={() => toggleModal("login")}
          />
        )}
        {modalState.login && (
          <Login
            loginmi={modalState.login}
            setLoginmi={() => toggleModal("login")}
            registermi={modalState.register}
            setRegistermi={() => toggleModal("register")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
