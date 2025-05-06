"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import { setCookie } from "@/utils/cookies";
import Link from "next/link";
import React, { useState } from "react";

function LoginPage() {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const setIsLogin = useGlobalContext();

  const login = () => {
    setCookie("userName", userName);
    setIsLogin(true);
  };

  return (
    <div className="h-screen flex justify-center items-center pt-16">
      {/* <!-- component --> */}
      <div className="bg-gray-100 flex justify-center items-center max-w-7xl mx-auto h-[80vh] rounded-3xl overflow-hidden">
        {/* <!-- Left: Image --> */}
        <div className="w-1/2 h-[100%] hidden lg:block">
          <img
            src="https://img.freepik.com/free-photo/young-girl-dressed-up-black-t-shirt-leather-trousers-holding-blank-craft-shopping-bags-with-handles-isolated-white_231208-4952.jpg?semt=ais_hybrid&w=740"
            alt="Placeholder Image"
            className="object-cover w-full h-[100%]"
          />
        </div>
        {/* <!-- Right: Login Form --> */}
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <form action="#" method="POST">
            {/* <!-- Username Input --> */}
            <div className="mb-4">
              <label for="username" className="block text-gray-600">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                onChange={(e) => setUserName(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autocomplete="off"
              />
            </div>
            {/* <!-- Password Input --> */}
            <div className="mb-4">
              <label for="password" className="block text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autocomplete="off"
              />
            </div>
            {/* <!-- Remember Me Checkbox --> */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="text-blue-500"
              />
              <label for="remember" className="text-gray-600 ml-2">
                Remember Me
              </label>
            </div>
            {/* <!-- Forgot Password Link --> */}
            <div className="mb-6 text-black">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
            </div>
            {/* <!-- Login Button --> */}
            <button
              onClick={login}
              type="submit"
              className="bg-black hover:bg-gray-800 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Login
            </button>
          </form>
          {/* <!-- Sign up  Link --> */}
          <div className="mt-6 text-black text-center">
            <Link href="/signup" className="hover:underline">
              Sign up Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
