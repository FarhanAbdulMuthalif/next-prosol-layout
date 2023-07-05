import React from "react";
import "./style.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";

export default function Header() {
  const currentRoute = usePathname();
  console.log(currentRoute);
  return (
    <nav className="main-header">
      <Image
        src="/images/prosol-logo.svg"
        className="Logo-img"
        alt="Loading...."
        width={120}
        height={45}
        priority
      />
      <Image
        src="/images/Group.png"
        height={20}
        width={20}
        className="GroupPng-img"
        alt="Loading...."
        priority
      />
      <ul>
        <li>
          <Link
            className={currentRoute === "/" ? "active" : "in-active"}
            href="/"
          >
            User Management
          </Link>
        </li>
        <li>
          <Link
            className={currentRoute === "/MasterData" ? "active" : ""}
            href="/MasterData"
          >
            Master Data
          </Link>
        </li>
        <li>
          <Link
            className={currentRoute === "/Tenant" ? "active" : ""}
            href="/Tenant"
          >
            Tenant
          </Link>
        </li>
        <li>
          <Link
            className={currentRoute === "/MaterialMaster" ? "active" : ""}
            href="/MaterialMaster"
          >
            Material Master
          </Link>
        </li>
        <li>
          <Link
            className={currentRoute === "/AssetMaster" ? "active" : ""}
            href="/AssetMaster"
          >
            Asset Master
          </Link>
        </li>
        <li>
          <Link
            className={currentRoute === "/DataQuality" ? "active" : ""}
            href="/DataQuality"
          >
            Data Quality
          </Link>
        </li>
      </ul>
      <div className="Header-Last-Side">
        <div className="Header-Last-Side-icons">
          <NotificationsIcon sx={{ fontSize: "18px", color: "#535353" }} />
          <SettingsIcon sx={{ fontSize: "18px", color: "#535353" }} />
          <HelpIcon sx={{ fontSize: "18px", color: "#535353" }} />
        </div>
        <div className="Header-Last-Side-Text-img">
          <span>Super Admin</span>
          <Image
            src="/images/AdminSvg.svg"
            height={40}
            width={40}
            alt="Img"
            priority
          />
        </div>
      </div>
    </nav>
  );
}
