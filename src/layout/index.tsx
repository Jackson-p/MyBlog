import React, { FC } from "react";
import Header from "@/components/header";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(registration => {
        console.log("SW registered: ", registration);
      })
      .catch(registrationError => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

const Layout: FC = props => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default Layout;
