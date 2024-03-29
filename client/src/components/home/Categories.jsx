import { Box, Button, styled } from "@mui/material";
import { categories } from "../../constants/Data";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Styles~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const StyledBox = styled(Box)({
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
});
const StyledButton = styled(Button)({
  margin: "3px",
  height: "30px",
  width: "130px",
  borderWidth: "2px",
});
const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "black",
  width: "100%",
});
const Container = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "272px",
    margin: "auto",
  },
}));

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Main Function~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const Categories = () => {
  const [searhParams] = useSearchParams();
  const category = searhParams.get("category");
  const [clicked, setClicked] = useState(["All"]);

  const categorySelect = (param) => {
    setClicked([param]);
  };

  return (
    <>
      {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Routing to Create endpoint~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
      <StyledLink to={`/create?category=${category || ""}`}>
        <Button style={{ marginTop: "5px" }} variant="contained">
          Create Blog
        </Button>
      </StyledLink>

      {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Categories SideBar~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
      <StyledBox>
        <Container>
          <StyledButton
            onClick={() => categorySelect("All")}
            variant={clicked.includes("All") ? "contained" : "outlined"}
          >
            <StyledLink to="/">All</StyledLink>
          </StyledButton>

          {categories.map((category) => (
            <StyledButton
              key={category.id}
              variant={
                clicked.includes(category.type) ? "contained" : "outlined"
              }
              onClick={() => categorySelect(category.type)}
            >
              <StyledLink to={`/?category=${category.type}`}>
                {category.type}
              </StyledLink>
            </StyledButton>
          ))}
        </Container>
      </StyledBox>
    </>
  );
};

export default Categories;
