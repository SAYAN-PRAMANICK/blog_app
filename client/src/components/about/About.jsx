import { Box, Typography, styled } from "@mui/material";

const About = () => {
  const Container = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
      marginTop: "5%",
    },
  }));

  const Image = styled(Box)({
    backgroundColor: "#2C3E50",
    objectFit: "cover",
    boxShadow: "0 0 10px 5px gray",
    borderRadius: "5px",
    userSelect: "none",
    width: "100%",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  });

  const Heading = styled(Typography)(({ theme }) => ({
    fontSize: "150px",
    [theme.breakpoints.down("md")]: {
      fontSize: "75px",
    },
    color: "#FEF5E7",
    lineHeight: 1,
    fontFamily: "Rubik Glitch Pop",
  }));

  const StyledBox = styled(Box)(({ theme }) => ({
    margin: "0 250px 0 250px",
    [theme.breakpoints.down("md")]: {
      margin: "0 10px 0 10px",
    },
  }));

  const SubHeading = styled(Typography)(({ theme }) => ({
    fontSize: "22px",
    [theme.breakpoints.down("md")]: {
      fontSize: "15px",
    },
    opacity: "80%",
    color: "white",
    fontFamily: "Madimi One",
  }));

  return (
    <Container>
      <Image>
        <Heading variant="h4" component="h1">
          About Us
        </Heading>

        <StyledBox>
          <SubHeading>
            Welcome to our blogging site! We are passionate about sharing
            knowledge and insights on various topics. Our mission is to create a
            platform where individuals can express their thoughts and ideas,
            fostering a community of learning and engagement.
          </SubHeading>
          <br />
          <SubHeading>
            Feel free to explore the diverse range of articles written by our
            talented contributors. Whether you're interested in technology,
            lifestyle, or anything in between, we've got something for you.
          </SubHeading>
          <br />
          <SubHeading>
            Thank you for being a part of our journey. Happy reading!
          </SubHeading>
        </StyledBox>
      </Image>
    </Container>
  );
};

export default About;
