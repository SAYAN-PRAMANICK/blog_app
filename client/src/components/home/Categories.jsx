import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { categories } from "../../constants/Data";
import { Link, useSearchParams } from "react-router-dom";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Styles~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const StyledTable = styled(Table)({
  border: "1px solid rgba(224,224,224,1)",
});
const StyledButton = styled(Button)({
  margin: "20px",
  width: "85%",
  background: "#6495ED",
  textDecoration: "none",
});
const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Main Function~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const Categories = () => {
  const [searhParams] = useSearchParams();
  const category = searhParams.get("category");

  return (
    <>
      {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Routing to Create endpoint~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
      <StyledLink to={`/create?category=${category || ""}`}>
        <StyledButton variant="contained">Create Blog</StyledButton>
      </StyledLink>

      {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Categories SideBar~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <StyledLink to="/">All Categories</StyledLink>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <StyledLink to={`/?category=${category.type}`}>
                  {category.type}
                </StyledLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Categories;
