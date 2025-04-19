import Link from "next/link";
import React from "react";

function ProductLayout({ children }) {
  return (
    <>
      <div className="flex gap-2">
        <aside className="w-96 bg-red-300 h-screen">
          <Link href={"/"}>Home</Link>
        </aside>
        <main>{children}</main>
      </div>
    </>
  );
}

export default ProductLayout;
