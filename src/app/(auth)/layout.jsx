import Link from "next/link";
import React from "react";

function AuthLayout({ children }) {
  return (
    <>
      <header className="h-16 bg-gray-900 text-white font-semibold flex justify-between items-center px-5">
        This is Auth's Header
        <div className="flex items-center gap-4">
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/signup">Sighup</Link>
        </div>
      </header>

      <main>{children}</main>
    </>
  );
}

export default AuthLayout;
