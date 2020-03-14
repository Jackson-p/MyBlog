import React, { FC } from "react";
import Header from "@/components/header";

const Layout: FC = props => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default Layout;
