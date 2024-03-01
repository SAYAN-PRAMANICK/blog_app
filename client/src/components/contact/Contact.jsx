import { Box, Typography, styled } from "@mui/material";

const Contact = () => {
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
    [theme.breakpoints.down("sm")]: {
      fontSize: "75px",
    },
    color: "#FEF5E7",
    lineHeight: 1,
    fontFamily: "Rubik Glitch Pop",
  }));

  const StyledBox = styled(Box)({
    margin: "0 10px 0 10px",
  });

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
          Contact Us
        </Heading>

        <StyledBox>
          <SubHeading>
            Have a question or want to get in touch with us? Feel free to reach
            out! Headquarters: Bangalore, India
          </SubHeading>
          <br />
          <SubHeading>Email: sayan.pro.id@gmail.com</SubHeading>
          <br />
          <SubHeading>Phone: +91-8837657497</SubHeading>
          <br />
          <SubHeading>Headquarters: Bangalore, India</SubHeading>
        </StyledBox>
      </Image>
    </Container>
  );
};

export default Contact;
