import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Components/Header/Header";

export const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
