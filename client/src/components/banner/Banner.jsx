import { Box, Typography, styled } from "@mui/material";

const Image = styled(Box)(({ theme }) => ({
  marginTop: "5%",
  width: "100%",
  height: "50vh",
  [theme.breakpoints.down("sm")]: {
    fontSize: "75px",
    marginTop: "1%",
    height: "25vh",
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  backgroundColor: "#2C3E50",
  boxShadow: "0 0 10px 5px gray",
  borderRadius: "5px",
  userSelect: "none",
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "200px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "110px",
  },
  color: "#FEF5E7",
  lineHeight: 1,
  fontFamily: "Rubik Glitch Pop",
}));

const SubHeading = styled(Typography)(({ theme }) => ({
  marginLeft: "17%",
  fontSize: "15px",
  opacity: "80%",
  color: "white",
  fontFamily: "Madimi One",
  [theme.breakpoints.down("sm")]: {
    fontSize: "10px",
  },
}));

const Banner = () => {
  return (
    <Image>
      <Heading>BLOG</Heading>
      <SubHeading>technology, lifestyle, or anything in between...</SubHeading>
    </Image>
  );
};

export default Banner;
