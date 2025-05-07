"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { isLogin, setIsLogin } = useGlobalContext();

  const handleLogout = () => {
    setIsLogin(false);
  };

  return (
    <header className="bg-gray-800 text-gray-50 sticky top-0 left-0 z-50 flex justify-between gap-2 h-16 items-center px-5">
      <h3 className="font-semibold text-2xl">AmazingCart</h3>
      <nav className="flex items-center gap-4">
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
      </nav>

      {!isLogin ? (
        <div className="flex items-center gap-4">
          <Link href="/login">Login</Link>
          <Link href="/signup">Sighup</Link>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <button>Account</button>
          <button onClick={handleLogout}>Log out</button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
