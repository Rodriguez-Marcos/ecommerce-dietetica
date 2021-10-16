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
import {Navbar, Container} from 'react-bootstrap'

export default function Sidebar({openProduct, openCategory, openDiet}) {
  return (
    <Navbar bg="light" expand="lg" id="ContenedorNav">
    <Container id="navResponsive">
      <Navbar.Brand href="#home">Menu</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
       
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
          <h3 className="sidebarTitle">Navegacion</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              <NavLink to='/Admin/user'>Lista de Usuarios</NavLink>
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              <NavLink to='/Admin'>Lista de Productos</NavLink>
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              <NavLink to='/Admin/orders'>Ordenes</NavLink>
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              <NavLink to='/Admin/filters'>Categorias y Dietas</NavLink>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            {/* <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li> */}
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              <NavLink to='/home'>Salir</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
      </Navbar.Collapse>
    </Container>
  </Navbar>

  );
}