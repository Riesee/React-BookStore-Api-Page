import { useEffect, useState } from "react";
import Register from "./Register";
import { useDispatch, useSelector } from "react-redux";
import { changeLoggedIn, changeLoginRegister } from "../redux/bookSlice";
import { getAccounts } from "../redux/loginSlice";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();

  const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const loginRegister = useSelector((state) => state.bookSlice.loginRegister);


  const isLoggedIn = useSelector((state) => state.bookSlice.isLoggedIn);


  console.log("aa", isLoggedIn );
  

  useEffect(() => {
     dispatch(getAccounts());

  }, [dispatch]);


  

  const closeLoginModal = () => {
    dispatch(changeLoginRegister("idle"));
  };

  const registerHandler = () => {
    dispatch(changeLoginRegister("register"));
  };

  const handlerLogin = async() => {
    if (email=== "" || email === null) {
      console.log("email required");
    }
    if (password === "" || password === null) {
      console.log("password required");
    }
    try {
      const res = await axios.get("http://localhost:3000/accounts");
      const accounts = res.data;
      console.log(accounts);

      accounts.map(account => {
        if(account.email === email){
          if(account.password === password){
            dispatch(changeLoggedIn(true));
            console.log(account,"girdi",isLoggedIn);
            setIsValid(true)
            closeLoginModal();
        }else{
          console.log("wrong password");
        }
    }else{
      console.log("wrong email address");
    }
    })
    } catch (error) {
      throw Error("Failed to fetch accounts");
    }
    };

  return (
    <>
      {loginRegister === "login" && (
        <>
          <div className=" w-full h-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl text-black font-semibold">Login</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => closeLoginModal()}
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
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="floating_name"
                          id="floating_name"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                          placeholder=" "
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <label
                          htmlFor="floating_name"
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
                    </form>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between align-middle p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <div className="cursor-pointer justify-start py-2 text-sm outline-none focus:outline-none mr-5 mb-1 ease-linear transition-all duration-150">
                    <a
                      onClick={() => registerHandler()}
                      className="text-gray-600 hover:text-gray-700"
                    >
                      Register
                    </a>
                  </div>
                  <div className="flex items-center justify-end align-middle">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => closeLoginModal()}
                    >
                      Close
                    </button>
                    <button
                      className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => handlerLogin()}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
      {loginRegister === "register" && <Register />}
    </>
  );
};

export default Login;
