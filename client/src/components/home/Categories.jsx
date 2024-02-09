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

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Main Function~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const Categories = () => {
  const [searhParams] = useSearchParams();
  const category = searhParams.get("category");

  return (
    <>
      {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Routing to Create endpoint~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
      <Link to="/create">    //changed in github
        <StyledButton variant="contained">Create Blog</StyledButton>
      </Link>

      {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Categories SideBar~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <Link to="/">All Categories</Link>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <Link to={`/?category=${category.type}`}>{category.type}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Categories;
