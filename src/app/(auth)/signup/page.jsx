"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import { apiClient } from "@/utils/apiClient";
import { setCookie } from "@/utils/cookies";
import { validateEmail, validateName } from "@/utils/validateFormFields";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function SignupPage() {
  const router = useRouter();
  const { setIsLogin } = useGlobalContext();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");

  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState({
    email: "",
    userName: "",
  });

  const enableDisableBtn = () => {
    if (!email.length || !userName.length) {
      return true;
    }
    return false;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setValidationError({ email: "", fullName: "" });

    if (!validateEmail(email)) {
      setValidationError((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      setIsLoading(false);
      return;
    }

    if (!validateName(userName)) {
      setValidationError((prev) => ({
        ...prev,
        userName: "Please provide a valid name",
      }));
      setIsLoading(false);
      return;
    }

    try {
      const data = await apiClient.signup({
        email: email,
        full_name: userName,
        reset_password_ui_url: "http://localhost:3000/reset_password",
      });

      console.log(data);
      if (data.error) {
        setIsLoading(false);
        setError(data.message);
        return;
      }

      const {
        access_token,
        refresh_token,
        refresh_token_expires_at,
        access_token_expires_at,
      } = data;

      const currentMilies = Date.now();
      const accesTokenExpiresAt = Date.parse(access_token_expires_at);
      const refreshTokenExpiresAt = Date.parse(refresh_token_expires_at);

      setCookie(
        "access_token",
        access_token,
        parseInt(`${(accesTokenExpiresAt - currentMilies) / 1000}`)
      );
      setCookie(
        "refresh_token",
        refresh_token,
        parseInt(`${(refreshTokenExpiresAt - currentMilies) / 1000}`)
      );

      setEmail("");
      setUserName("");
      setIsLoading(false);
      alert(data.message);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError("Something went Wrong");
    }
  };

  return (
    <div className="pt-16 h-screen w-[100%] flex justify-center items-center">
      {/* <!-- component --> */}
      <div className="flex h-[80vh] max-w-7xl rounded-3xl overflow-hidden">
        {/* <!-- Left Pane --> */}
        <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black h-[100%]">
          <div className=" text-center h-[100%]">
            <img
              className="h-[100%]"
              src="https://img.freepik.com/premium-photo/happy-asian-pretty-girl-holding-shopping-bags-while-using-smartphone_35721-211.jpg"
            />
          </div>
        </div>
        {/* <!-- Right Pane --> */}
        <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
          <div className=" md:w-[70%] p-6">
            <h1 className="text-3xl font-semibold mb-6 text-black text-center">
              Sign Up
            </h1>

            {error && (
              <p className="text-sm text-red-500 text-center mt-1">{error}</p>
            )}

            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
              Join to Our Community with all time access and free{" "}
            </h1>
            <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
              <div className="w-full lg:w-1/2 mb-2 lg:mb-0">
                <button
                  type="button"
                  className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
                >
                  <img src="/assets/google.png" />
                  Sign Up with Google
                </button>
              </div>
              <div className="w-full lg:w-1/2 ml-0 lg:ml-2">
                <button
                  type="button"
                  className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
                >
                  <GithubIcon />
                  Sign Up with Github{" "}
                </button>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>or with email</p>
            </div>
            <form
              action="#"
              method="POST"
              onSubmit={handleSignup}
              className="space-y-4"
            >
              {/* <!-- Your form elements go here --> */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={userName}
                  name="username"
                  onChange={(e) => setUserName(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />

                {validationError.userName && (
                  <p className="text-sm text-red-500">
                    {validationError.userName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />

                {validationError.email && (
                  <p className="text-sm text-red-500">
                    {validationError.email}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={enableDisableBtn() ? true : false}
                  className={`w-full   text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300  flex justify-center items-center ${
                    enableDisableBtn() ? "bg-gray-300" : "bg-black"
                  }`}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-8 w-8 border-t-transparent border-2 rounded-full"
                      viewBox="0 0 24 24"
                    ></svg>
                  ) : (
                    "Sign up"
                  )}
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                Already have an account?
                <Link href="/login" className="text-black hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
