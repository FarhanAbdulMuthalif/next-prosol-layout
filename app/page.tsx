"use client";
import { useState } from "react";
import UserManagement from "./UserManagement/Page";
import "./page.scss";
import InputAdornment from "@mui/material/InputAdornment";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import { Button, TextField } from "@mui/material";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    console.log("clicked");
  };
  return (
    <main className="main-wrapper">
      <div className="search-bar-wrapper">
        <TextField
          size="small"
          id="SearchInputId"
          placeholder="Type Here to Search"
          sx={{
            backgroundColor: "white",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#949FB1" }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          className="Grid-Export-btn"
          variant="outlined"
          startIcon={<FileDownloadIcon />}
        >
          Export
        </Button>
        <Button
          className="Plant-Add-New-Btn"
          variant="contained"
          onClick={handleDrawerToggle}
          sx={{ backgroundColor: "#0052CC" }}
        >
          Add New
        </Button>
      </div>
      <div className="userTblWrapper">
        <UserManagement
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      </div>
    </main>
  );
}
