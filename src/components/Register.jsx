import { useState } from "react";
import Login from "./Login";
import { useDispatch } from "react-redux";
import { postAccount } from "../redux/loginSlice";

const Register = ({ loginmi, setLoginmi, registermi, setRegistermi }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const closeRegisterModal = () => {
    setRegistermi(false);
  };

  const handlerLogin = () => {
    setLoginmi(true);
    setRegistermi(false);
  };

  const handlerRegister = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at minimum 8 characters.");
      return;
    }

    if (password === rePassword) {
      // register process
      console.log("Registering", { name, email, password, surname, username });

      const newAccount = {
        name,
        email,
        password,
        surname,
        username,
        id: Date.now().toString(),
      };
      dispatch(postAccount({ newAccount: newAccount }))
        .unwrap()
        .then(() => {
          closeRegisterModal(); // Başarıyla güncellendiğinde modalı kapatın
        })
        .catch((error) => {
          console.error("Failed to update the book: ", error);
        });
    } else {
      alert("Passwords do not match!");
    }
  };

  if (registermi === true) {
    return (
      <>
        <>
          <div className="w-full h-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl text-black font-semibold">
                    Register
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeRegisterModal}
                  >
                    <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="w-full h-100 relative p-6 flex-auto">
                  <div className="mx-auto my-auto">
                    <form className="max-w-md mx-auto my-auto">
                      <div className="grid grid-cols-2 text-black">
                        <div className="relative z-0 w-full mb-5 mr-5 group">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                            placeholder=" "
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                          <label
                            htmlFor="name"
                            className="peer-focus:font-medium absolute text-sm text-black  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Name
                          </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="surName"
                            id="surName"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                            placeholder=" "
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            required
                          />
                          <label
                            htmlFor="surName"
                            className="peer-focus:font-medium absolute text-sm text-black  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Surname
                          </label>
                        </div>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="username"
                          id="username"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                          placeholder=" "
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                        <label
                          htmlFor="username"
                          className="peer-focus:font-medium absolute text-sm text-black  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          User Name
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                          placeholder=" "
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <label
                          htmlFor="email"
                          className="peer-focus:font-medium absolute text-sm text-black  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Email
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                          placeholder=" "
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label
                          htmlFor="password"
                          className="peer-focus:font-medium absolute text-sm text-black  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Password
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="password"
                          name="again-password"
                          id="again-password"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                          placeholder=" "
                          value={rePassword}
                          onChange={(e) => setRePassword(e.target.value)}
                          required
                        />
                        <label
                          htmlFor="again-password"
                          className="peer-focus:font-medium absolute text-sm text-black  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Again Password
                        </label>
                      </div>
                    </form>
                    <div className="text-red-500 text-sm">{error}</div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between align-middle p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <div className="cursor-pointer justify-start py-2 text-sm outline-none focus:outline-none mr-5 mb-1 ease-linear transition-all duration-150">
                    <a
                      onClick={handlerLogin}
                      className="text-gray-600 hover:text-gray-700"
                    >
                      Back to Login
                    </a>
                  </div>
                  <div className="flex items-center justify-end align-middle">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={closeRegisterModal}
                    >
                      Close
                    </button>
                    <button
                      className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handlerRegister}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
        {loginmi && (
          <Login
            loginmi={loginmi}
            setLoginmi={setLoginmi}
            registermi={registermi}
            setRegistermi={setRegistermi}
          />
        )}
      </>
    );
  }
};

export default Register;
