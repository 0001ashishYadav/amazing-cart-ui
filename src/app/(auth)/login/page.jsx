"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import { apiClient } from "@/utils/apiClient";
import { setCookie } from "@/utils/cookies";
import { validateEmail, validatePassword } from "@/utils/validateFormFields";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

function LoginPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isPassword, setIsPassword] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLogin } = useGlobalContext();

  const [validationError, setValidationError] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const enableDisableBtn = () => {
    if (!email.length || !password.length) {
      return true;
    }
    return false;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");
    setValidationError({ email: "", password: "" });
    if (!validateEmail(email)) {
      setValidationError((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setValidationError((prev) => ({
        ...prev,
        password:
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character",
      }));
      setIsLoading(false);
      return;
    }

    try {
      const data = await apiClient.login({ email, password });

      console.log(data);

      if (data.error) {
        alert(data.message);
        setError(data.message);
        setIsLoading(false);
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
      setIsLogin(true);
      setEmail("");
      setPassword("");
      setValidationError({ email: "", password: "" });
      setError("");
      setIsLoading(false);
      router.push("/", { replace: true });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError("Something went wrong. Please try again later.");
      setValidationError({ email: "", password: "" });
    }
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

          {error && (
            <p className="text-sm text-red-500 text-center mt-1">{error}</p>
          )}

          <form action="#" method="POST" onSubmit={handleLogin}>
            {/* <!-- Username Input --> */}
            <div className="mb-4">
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />

              {validationError.email && (
                <p className="text-sm text-red-500">{validationError.email}</p>
              )}
            </div>
            {/* <!-- Password Input --> */}
            <label className="block text-gray-600">Password</label>
            <div className="mb-4 relative">
              <input
                type={isPassword ? "password" : "text"}
                id="password"
                value={password}
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />

              {isPassword ? (
                <Eye
                  className="absolute right-2 top-[50%] -translate-y-[50%] hover:cursor-pointer"
                  onClick={() => setIsPassword(!isPassword)}
                />
              ) : (
                <EyeOff
                  className="absolute right-2 top-[50%] -translate-y-[50%] hover:cursor-pointer"
                  onClick={() => setIsPassword(!isPassword)}
                />
              )}
            </div>
            {validationError.password && (
              <p className="text-sm text-red-500">{validationError.password}</p>
            )}
            {/* <!-- Remember Me Checkbox --> */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="text-blue-500"
              />
              <label className="text-gray-600 ml-2">Remember Me</label>
            </div>
            {/* <!-- Forgot Password Link --> */}
            <div className="mb-6 text-black">
              <a href="/forgot_password" className="hover:underline">
                Forgot Password?
              </a>
            </div>
            {/* <!-- Login Button --> */}

            <button
              type="submit"
              disabled={enableDisableBtn() ? true : false}
              className={` text-white font-semibold rounded-md py-2 px-4 w-full flex justify-center items-center ${
                enableDisableBtn() ? "bg-gray-300" : "bg-black"
              }`}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-8 w-8 border-t-transparent border-2 rounded-full"
                  viewBox="0 0 24 24"
                ></svg>
              ) : (
                "Login"
              )}
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
