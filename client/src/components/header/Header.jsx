import React from "react";
import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

const Component = styled(AppBar)({
  background: "white",
  color: "black",
});

const Container = styled(Toolbar)({
  justifyContent: "center",
  fontFamily: '"Macondo", cursive',
  fontWeight: "600",
  fontSize: "20px",
});

const Hyperlink = styled(Link)({
  color: "#2C3E50",
  padding: "10px",
  textDecoration: "none",
  transition: "font-size 0.2s ease-out",
  ":hover": {
    fontSize: "22px",
    textShadow: "0 0 30px #1565c0",
    color: "black",
  },
  ":active": {
    color: "#1565c0",
    textShadow: "0 0 25px #D0D3D4",
  },
});

const Header = () => {
  return (
    <Component>
      <Container>
        <Hyperlink to="/">HOME</Hyperlink>
        <Hyperlink to="/about">ABOUT</Hyperlink>
        <Hyperlink to="/contact">CONTACT</Hyperlink>
        <Hyperlink to="/login">LOGOUT</Hyperlink>
      </Container>
    </Component>
  );
};

export default Header;
