"use client";
import { apiClient } from "@/utils/apiClient";
import { validatePassword } from "@/utils/validateFormFields";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const ResetPasswordPage = () => {
  const router = useRouter;
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();

  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState({
    password: "",
    confirmPassword: "",
  });

  console.log(token);

  const enableDisableBtn = () => {
    if (!password.length || !confirmPassword.length) {
      return true;
    }
    return false;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setValidationError({ password: "", confirmPassword: "" });

    if (!validatePassword(password)) {
      setValidationError((prev) => ({
        ...prev,
        password:
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character",
      }));
      setIsLoading(false);
      return;
    }
    if (!validatePassword(confirmPassword)) {
      setValidationError((prev) => ({
        ...prev,
        confirmPassword:
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character",
      }));
      setIsLoading(false);
      return;
    }

    try {
      const data = await apiClient.resetPassword(decodeURIComponent(token), {
        password,
      });

      console.log(data);
      if (data.error) {
        setError(data.message);
        setIsLoading(false);
        return;
      }

      alert(data.message);
      setPassword("");
      setConfirmPassword("");
      setError("");
      setValidationError({ password: "", confirmPassword: "" });
      setIsLoading(false);
      router.push("/login");
    } catch (error) {
      console.log(error);
      setError("Something Went Wrong");
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center pt-16">
      {/* <!-- component --> */}
      <div className="bg-gray-100 flex justify-center items-center max-w-7xl mx-auto h-[80vh] rounded-3xl overflow-hidden">
        {/* <!-- Left: Image --> */}
        <div className="w-1/2 h-[100%] hidden lg:block">
          <img
            src="https://img.freepik.com/free-photo/young-woman-model-holding-lot-shopping-bags-showing-thumb-up_144627-62593.jpg"
            alt="Placeholder Image"
            className="object-cover w-full h-[100%]"
          />
        </div>
        {/* <!-- Right: Login Form --> */}
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>

          {error && (
            <p className="text-sm text-red-500 text-center mt-1">{error}</p>
          )}

          <form action="#" method="POST" onSubmit={handleResetPassword}>
            {/* <!-- Username Input --> */}
            <div className="mb-4">
              <label for="username" className="block text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autocomplete="off"
              />
            </div>

            {validationError.password && (
              <p className="text-sm text-red-500">{validationError.password}</p>
            )}

            {/* <!-- Password Input --> */}
            <div className="mb-4">
              <label for="password" className="block text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                id="conform_password"
                name="confirm_password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autocomplete="off"
              />
            </div>

            {validationError.confirmPassword && (
              <p className="text-sm text-red-500">
                {validationError.confirmPassword}
              </p>
            )}

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
              type="submit"
              disabled={enableDisableBtn() ? true : false}
              className={` hover:bg-gray-800 text-white font-semibold rounded-md py-2 px-4 w-full flex justify-center items-center ${
                enableDisableBtn() ? "bg-gray-300" : "bg-black"
              }`}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-8 w-8 border-t-transparent border-2 rounded-full"
                  viewBox="0 0 24 24"
                ></svg>
              ) : (
                "Save Password"
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
};

export default ResetPasswordPage;
