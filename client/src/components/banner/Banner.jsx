import { Box, Typography, styled } from "@mui/material";

const Image = styled(Box)({
  width: "100%",
  height: "50vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  backgroundColor: "#2C3E50",
  boxShadow: "0 0 10px 5px gray",
  borderRadius: "5px",
  userSelect: "none",
});

const Heading = styled(Typography)({
  fontSize: "200px",
  color: "#FEF5E7",
  lineHeight: 1,
  // fontFamily: "Protest Guerrilla",
  fontFamily: "Rubik Glitch Pop",
});

const SubHeading = styled(Typography)({
  marginLeft: "17%",
  fontSize: "15px",
  opacity: "80%",
  color: "white",
  fontFamily: "cursive",
});

const Banner = () => {
  return (
    <Image>
      <Heading>BLOG</Heading>
      <SubHeading>technology, lifestyle, or anything in between...</SubHeading>
    </Image>
  );
};

export default Banner;
