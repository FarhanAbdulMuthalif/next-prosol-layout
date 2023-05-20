"use client";
import { Button } from "@mui/material";
import React from "react";
type Props = {
  children: string;
};
export default function FillButton({ children }: Props) {
  return (
    <Button sx={{ fontWeight: "bold" }} variant="contained">
      {children}
    </Button>
  );
}
