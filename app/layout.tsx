"use client";
import { useState } from "react";
import Header from "./components/Header/Page";
import SideBar from "./components/Nav/SideBar";
import "./globals.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [OpenSideBar, setOpenSideBar] = useState<boolean>(true);
  const OpenHandler = () => {
    setOpenSideBar(!OpenSideBar);
  };
  const iconRotateHandler = {
    transform: OpenSideBar ? "rotate(180deg)" : "",
  };
  const WidthStyle = {
    // height: "calc(100vh - 60px)",
    width: OpenSideBar ? `calc(100vw - 180px)` : `calc(100vw - 40px)`,

    flexGrow: " 1",
    padding: "5px 15px",
  };
  return (
    <html lang="en">
      <body>
        <Header />
        <div style={{ display: "flex" }}>
          <SideBar OpenSideBar={OpenSideBar} />
          <div
            className={OpenSideBar ? "icon-wrapper" : "close-icon-wrapper"}
            onClick={OpenHandler}
          >
            <ArrowForwardIosIcon
              style={iconRotateHandler}
              sx={{
                color: "blue",
                fontSize: "14px",
              }}
            />
          </div>
          <div className="children-wrapper" style={WidthStyle}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
