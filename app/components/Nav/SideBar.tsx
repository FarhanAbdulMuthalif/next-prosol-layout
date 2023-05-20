"use client";
import React, { useState } from "react";
import "./SideBar.scss";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";

export default function SideBar({ OpenSideBar }: { OpenSideBar: boolean }) {
  return (
    <div className={OpenSideBar ? "full-side-bar" : "side-bar"}>
      {OpenSideBar ? (
        <>
          <header>
            <TextField
              size="small"
              id="search-sidebar"
              variant="standard"
              placeholder="Search here"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#535353", marginTop: "15px" }} />
                  </InputAdornment>
                ),
                type: "search",
              }}
            />
          </header>
          <nav className="NavBar-links">
            <h2>User Management </h2>
            <ul>
              <li>Create User</li>
              <li>Create Role</li>
              <li>Create Group</li>
            </ul>
          </nav>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
