import React from "react";
import s from "./AdminTopBar.module.css";
import {
  NotificationsNone,
  Language,
  Settings,
  AdminPanelSettingsIcon,
} from "@material-ui/icons";

export default function Topbar() {
  return (
    <div className={s.topbar}>
      <div className={s.topbarWrapper}>
        <div className={s.topLeft}>
          <span className={s.logo}>Administracion Salvatore</span>
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
