import React from "react";

const Loader = () => {
  return (
    <>
      <div className="flex items-center justify-center bg-white fixed inset-0 z-10 h-screen w-full">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8  border-gray-200 "></div>
          <div className="absolute top-0 left-0 h-24 w-24 flex justify-center items-center rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          <img
            className="h-[95%] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] rounded-full"
            src="/assets/ak-logo.png"
          />
        </div>
      </div>
    </>
  );
};

export default Loader;
