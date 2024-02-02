import { Box, Typography, styled } from "@mui/material";

const Image = styled(Box)({
  background:
    "url(https://png.pngtree.com/thumb_back/fh260/background/20190828/pngtree-dark-vector-abstract-background-image_302715.jpg) center/55% repeat-x black",
  width: "100%",
  height: "50vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
});

const Heading = styled(Typography)({
  fontSize: "70px",
  color: "white",
  lineHeight: 1,
});

const SubHeading = styled(Typography)({
  fontSize: "20px",
  background: "white",
});

const Banner = () => {
  return (
    <Image>
      <Heading>BLOG</Heading>
      <SubHeading>Code For Interview</SubHeading>
    </Image>
  );
};

export default Banner;
