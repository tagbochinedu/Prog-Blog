import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

import Error from "../Components/Error";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [errorText, setErrorText] = useState("");
  const [error, setError] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [passwordConfirmFocus, setPasswordConfirmFocus] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    let password = "";
    if (passwordRef.current.value === passwordConfirmRef.current.value) {
      password = passwordRef.current.value;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      if (
        error.code.toString() === "auth/invalid-email" &&
        emailRef.current.value.trim().length > 0
      ) {
        setErrorText("Email is invalid");
        setEmailFocus(true);
        setError(true);
      } else if (error.code.toString() === "auth/email-already-in-use") {
        setErrorText("Email has already been used");
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
        error.code.toString() === "auth/internal-error" &&
        passwordRef.current.value.trim().length > 0 &&
        passwordConfirmRef.current.value.trim().length > 0
      ) {
        setErrorText("Passwords do not match");
        setError(true);
        setPasswordConfirmFocus(true);
      } else if (
        error.code.toString() === "auth/internal-error" &&
        passwordRef.current.value.trim().length === 0
      ) {
        setErrorText("Password field cannot be left empty");
        setError(true);
        setPasswordFocus(true);
      } else if (
        (error.code.toString() === "auth/internal-error" &&
          passwordRef.current.value.trim().length < 6) ||
        (error.code.toString() === "auth/weak-password" &&
          passwordRef.current.value.trim().length < 6)
      ) {
        setErrorText("Password must be more than five characters");
        setError(true);
        setPasswordFocus(true);
      } else if (
        error.code.toString() === "auth/internal-error" &&
        passwordRef.current.value.trim().length > 0 &&
        passwordConfirmRef.current.value.trim().length === 0
      ) {
        setErrorText("Password confirmation field cannot be left empty");
        setError(true);
        setPasswordConfirmFocus(true);
      }
    }
  };
  return (
    <section className="h-full py-12">
      <div className="px-6 h-full text-gray-800">
        <div className="flex justify-center items-center flex-wrap h-full g-6">
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form className="max-w-md mx-auto" onSubmit={submitHandler}>
              <div className="text-center">
                <h1 className="text-3xl mb-6 font-semibold text-lg text-white">
                  Sign Up
                </h1>
                {error && <Error text={errorText} />}
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  className={`${"form-control block w-full px-4 py-2 text-xl font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700  focus:border-blue-600 focus:outline-none focus:shadow-sm focus:shadow-login-blu"} ${
                    emailFocus ? "bg-red-100" : "bg-white"
                  }`}
                  onFocus={() => {
                    if (emailFocus) {
                      setEmailFocus(false);
                      setError(false)
                    }
                  }}
                  placeholder="Email address"
                  ref={emailRef}
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  className={`${"form-control block w-full px-4 py-2 text-xl font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700  focus:border-blue-600 focus:outline-none focus:shadow-sm focus:shadow-login-blu"} ${
                    passwordFocus ? "bg-red-100" : "bg-white"
                  }`}
                  onFocus={() => {
                    if (passwordFocus) {
                      setPasswordFocus(false);
                      setError(false)
                    }
                  }}
                  placeholder="Password"
                  ref={passwordRef}
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  className={`${"form-control block w-full px-4 py-2 text-xl font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700  focus:border-blue-600 focus:outline-none focus:shadow-sm focus:shadow-login-blu"} ${
                    passwordConfirmFocus ? "bg-red-100" : "bg-white"
                  }`}
                  onFocus={() => {
                    if (passwordConfirmFocus) {
                      setPasswordConfirmFocus(false);
                      setError(false)
                    }
                  }}
                  placeholder="Password Confirmation"
                  ref={passwordConfirmRef}
                />
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="w-full px-7 py-3 bg-hdr text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-300 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Sign Up
                </button>
              </div>
              <p className="text-sm font-semibold mt-4 pt-1 mb-0 text-right text-white">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-hdr hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
