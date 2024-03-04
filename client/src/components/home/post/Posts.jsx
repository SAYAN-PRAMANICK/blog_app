import { useState, useEffect } from "react";
import { getAllPosts } from "../../../service/api";
import Post from "./Post";
import { Box, Grid, styled } from "@mui/material";
import { useSearchParams, Link } from "react-router-dom";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Styles~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const NoDisplay = styled(Box)({
  display: "flex",
  alignItems: "center",
  margin: "auto",
  fontSize: "24px",
  color: "gray",
  textShadow: "0.5px 0.5px 0.5px  #FF7F7F ",
});
const MasterGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    justifyContent: "space-around",
  },
  display: "flex",
  justifyContent: "flex-start",
}));
const StyledGrid = styled(Box)(({ theme }) => ({
  margin: "5px",
}));

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Main component~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "All";

  useEffect(() => {
    const fetchData = async () => {
      await getAllPosts({ category }).then((res) => {
        if (res.status === 200) {
          setPosts(res.data);
        }
      });
    };
    fetchData();
  }, [category]);

  return (
    <Box style={{ width: "100%" }}>
      <MasterGrid container>
        {posts && posts.length > 0 ? (
          posts.map((post, key) => {
            return (
              <StyledGrid key={key} item={+true} lg={12}>
                <Post post={post} />
              </StyledGrid>
            );
          })
        ) : (
          <NoDisplay>no posts in {category.toLowerCase()} category!</NoDisplay>
        )}
      </MasterGrid>
    </Box>
  );
};

export default Posts;
