import React from "react";
import styled, { css } from "styled-components";
import { NavLink, Outlet } from "react-router-dom";
const StyledNavbar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: white;
  box-shadow: 0 0 5px;
  background-color: rgb(25, 26, 46);
  z-index: 100;
  margin-bottom: 50px;
  .active {
    color: rgb(255, 61, 113);
  }
  .nav-item {
    margin-left: 20px;
    color: white;
  }
`;

const ListNav = [
  {
    id: 1,
    title: "Home",
    to: "/home",
  },
  {
    id: 2,
    title: "Movies",
    to: "/movies",
  },
  {
    id: 3,
    title: "TV series",
    to: "/show",
  },
];

const Navbar = () => {
  return (
    <>
      <StyledNavbar>
        {ListNav.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            className="nav-item"
            style={({ isActive }) =>
              isActive ? { color: "#ff3d71", fontWeight: "bold" } : {}
            }
          >
            {item.title}
          </NavLink>
        ))}
      </StyledNavbar>
      <Outlet></Outlet>
    </>
  );
};

export default Navbar;
