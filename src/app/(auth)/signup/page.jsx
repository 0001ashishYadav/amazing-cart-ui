import { GithubIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function SignupPage() {
  return (
    <div className="pt-16 h-screen w-[100%] flex justify-center items-center">
      {/* <!-- component --> */}
      <div class="flex h-[80vh] max-w-7xl rounded-3xl overflow-hidden">
        {/* <!-- Left Pane --> */}
        <div class="hidden lg:flex items-center justify-center flex-1 bg-white text-black h-[100%]">
          <div class=" text-center h-[100%]">
            <img
              className="h-[100%]"
              src="https://img.freepik.com/premium-photo/happy-asian-pretty-girl-holding-shopping-bags-while-using-smartphone_35721-211.jpg"
            />
          </div>
        </div>
        {/* <!-- Right Pane --> */}
        <div class="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
          <div class=" md:w-[70%] p-6">
            <h1 class="text-3xl font-semibold mb-6 text-black text-center">
              Sign Up
            </h1>
            <h1 class="text-sm font-semibold mb-6 text-gray-500 text-center">
              Join to Our Community with all time access and free{" "}
            </h1>
            <div class="mt-4 flex flex-col lg:flex-row items-center justify-between">
              <div class="w-full lg:w-1/2 mb-2 lg:mb-0">
                <button
                  type="button"
                  class="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
                >
                  <p>google_img</p>
                  Sign Up with Google
                </button>
              </div>
              <div class="w-full lg:w-1/2 ml-0 lg:ml-2">
                <button
                  type="button"
                  class="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
                >
                  <GithubIcon />
                  Sign Up with Github{" "}
                </button>
              </div>
            </div>
            <div class="mt-4 text-sm text-gray-600 text-center">
              <p>or with email</p>
            </div>
            <form action="#" method="POST" class="space-y-4">
              {/* <!-- Your form elements go here --> */}
              <div>
                <label
                  for="username"
                  class="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>
              <div>
                <button
                  type="submit"
                  class="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div class="mt-4 text-sm text-gray-600 text-center">
              <p>
                Already have an account?{" "}
                <Link href="/login" class="text-black hover:underline">
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
