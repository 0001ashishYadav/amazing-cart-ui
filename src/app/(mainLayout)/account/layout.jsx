import ProtectedRoutes from "@/component/ProtectedRoutes";
import React from "react";

const AccountLayout = ({ children }) => {
  return (
    <ProtectedRoutes>
      <div>{children}</div>
    </ProtectedRoutes>
  );
};

export default AccountLayout;
