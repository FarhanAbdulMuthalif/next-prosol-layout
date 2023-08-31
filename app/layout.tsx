"use client";
import { useState } from "react";
import Header from "./components/Header/Page";
import SideBar from "./components/Nav/SideBar";
import "./globals.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ThemeProvider, createTheme } from "@mui/material";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

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

  const theme = createTheme({
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontSize: "12px",
            "& input::placeholder": {
              color: "#8B4513",
              opacity: ".8",
            },
          },
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "#8B4513", // Brown color
          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          badge: {
            fontSize: 12, // Adjust the font size as needed
            width: "15px",
            height: "15px",
            padding: "0px",
            borderRadius: "50%", // Make sure the badge retains a circular shape
          },
        },
      },
      // MuiDialog: {
      //   styleOverrides: {
      //     root: {
      //       backdropFilter: "blur(4px)",
      //       backgroundColor: "rgba(0, 0, 0, 0.2)",
      //     },
      //   },
      // },
    },
    typography: {
      button: {
        fontWeight: "bold", // Set the button text to bold
        textTransform: "none", // Disable the uppercase transformation
      },
    },
  });
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
