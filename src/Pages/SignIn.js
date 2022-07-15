import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Error from "../Components/Error";

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false)
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const { signin, setIsLogged } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await signin(emailRef.current.value, passwordRef.current.value);
      setIsLogged(true);
      navigate("/");
    } catch (error) {
      if (
        error.code.toString() === "auth/invalid-email" &&
        emailRef.current.value.trim().length > 0
      ) {
        setErrorText("Email is invalid");
        setEmailFocus(true);
        setError(true);
      } else if (
        error.code.toString() === "auth/invalid-email" &&
        emailRef.current.value.trim().length === 0
      ) {
        setErrorText("Email field cannot be left empty");
        setEmailFocus(true);
        setError(true);
      } else if (
        error.code.toString() === "auth/wrong-password" &&
        passwordRef.current.value.trim().length > 0
      ) {
        setErrorText("Password is incorrect");
        setError(true);
        setPasswordFocus(true);
      } else if (
        error.code.toString() === "auth/internal-error" &&
        passwordRef.current.value.trim().length === 0
      ) {
        setErrorText("Password field cannot be left empty");
        setError(true);
        setPasswordFocus(true);
      }
    }
  };

  return (
    <section className="h-full py-12">
      <div className="px-6 h-full text-gray-800">
        <div className="flex justify-center items-center flex-wrap h-full g-6">
          <div className="xl:ml-20 xl:w-5/12 lg:w-10/12 md:w-8/12 mb-12 md:mb-0 justify center">
            <form className="max-w-md mx-auto" onSubmit={submitHandler}>
              <div className="text-center">
                <h1 className="text-3xl mb-6 font-semibold text-lg text-white">
                  Sign In
                </h1>
                {error && <Error text={errorText} />}
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  className={`${"form-control block w-full px-4 py-2 text-xl font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:outline-none focus:shadow-sm "} ${
                    emailFocus ? "bg-red-100" : "bg-white"
                  }`}
                  onFocus={() => {
                    setError(false);
                    setEmailFocus(false);
                  }}
                  ref={emailRef}
                  placeholder="Email address"
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  className={`${"form-control block w-full px-4 py-2 text-xl font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none focus:shadow-sm focus:shadow-login-blue"} ${
                    passwordFocus ? "bg-red-100" : "bg-white"
                  }`}
                  ref={passwordRef}
                  placeholder="Password"
                  onFocus={() => {
                    setError(false);
                    setPasswordFocus(false);
                  }}
                />
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="w-full px-7 py-3 bg-hdr text-white font-medium text-sm leading-snug uppercase rounded shadow-md  hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-300 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Sign In
                </button>
              </div>
              <p className="text-sm font-semibold mt-4 pt-1 mb-0 text-right text-white">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-hdr hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
