import React from "react";
import s from "./AdminTopBar.module.css";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (

    <div className={s.topbar}>
      <div className={s.topbarWrapper}>
        <div className={s.topLeft}>
          <Link to = '/admin'>
          <span className={s.logo}>Administración Salvatore</span>
          </Link>
        </div>
        <div className={s.topRight}>
       
          <img
            src="https://w7.pngwing.com/pngs/701/653/png-transparent-computer-icons-system-administrator-administrator-icon-silhouette-desktop-wallpaper-administrator-icon.png"
            alt="img No found"
            className={s.topAvatar}
          />
        </div>
      </div>
    </div>
  );
}
