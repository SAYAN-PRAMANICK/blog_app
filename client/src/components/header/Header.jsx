import React from "react";
import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

const Component = styled(AppBar)({
  background: "white",
  color: "black",
});

const Container = styled(Toolbar)({
  justifyContent: "center",
});

const Hyperlink = styled(Link)({
  color: "black",
  padding: "20px",
  textDecoration: "none",
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
