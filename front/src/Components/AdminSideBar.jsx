import "./AdminSideBar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Sidebar({openProduct, openCategory, openDiet}) {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            
              {/* <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
              < Link to="/admin" className="link"> Panel Central</Link>
              </li> */}
            
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Economia
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Ventas
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Agregar Elementos</h3>
          <ul className="sidebarList">
            {/* <li className="sidebarListItem">
              <PermIdentity className="sidebarIcon" />
              Usuarios
            </li> */}

            <li className="sidebarListItem" onClick={() => openProduct()}>
              <button className="sidebarIcon"  />
              Productos
            </li>

            <li className="sidebarListItem" onClick={() => openCategory()}>
              <BarChart className="sidebarIcon" />
              Categorias
            </li>
            <li className="sidebarListItem"  onClick={() => openDiet()}>
              <BarChart className="sidebarIcon" />
              Dietas
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Usuarios</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Correos
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              <NavLink to='/Admin/user'>Lista de Usuarios</NavLink>
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
