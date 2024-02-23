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
const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

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
    <>
      {posts && posts.length > 0 ? (
        posts.map((post, key) => {
          return (
            <Grid item key={key} lg={3} sm={4} xs={12}>
              <StyledLink to={`details/${post._id}`}>
                <Post post={post} />
              </StyledLink>
            </Grid>
          );
        })
      ) : (
        <NoDisplay>no posts in {category.toLowerCase()} category!</NoDisplay>
      )}
    </>
  );
};

export default Posts;
