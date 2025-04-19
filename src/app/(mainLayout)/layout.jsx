import Navbar from "@/component/mainLayout/Navbar";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      <main>{children}</main>
    </>
  );
};

export default MainLayout;
