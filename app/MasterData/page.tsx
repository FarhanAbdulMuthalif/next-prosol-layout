"use client";
import React from "react";
import "./style.scss";
import { usePathname, useRouter } from "next/navigation";

export default function MasterData() {
  const currentRoute = usePathname();
  console.log(currentRoute.split("/"));
  console.log(currentRoute.split("/").slice(1));
  console.log(currentRoute.split("/").slice(1).toString());
  return (
    <div className="masterData">
      <h1>Master Data</h1>
    </div>
  );
}
