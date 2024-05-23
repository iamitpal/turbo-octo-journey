import React from "react";
import "@/assets/styles/globals.css";

export const metadata = {
  title: "My Blog",
  description: "My Blog Description",
  keywords: "My Blog Keywords",
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
