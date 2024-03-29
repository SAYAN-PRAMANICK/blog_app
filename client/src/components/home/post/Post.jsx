import { Box, Typography, styled, Grid } from "@mui/material";
import { addElipsis, getTimePassed } from "../../../utils/common-utils";
import { Link } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { useState, useEffect } from "react";
import { getAllComments } from "../../../service/api";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Styles~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const Container = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  borderTop: "1.5px solid white",
  borderRight: "1.5px solid white",
  borderLeft: "1.5px solid white",
  boxShadow: "2px 2px 10px -5px black",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  width: "255px",
  height: "350px",
  transition: "0.2s",
  ":hover": {
    transform: "scale(1.02)",
    zIndex: 2,
  },
  position: "relative",
}));
const Image = styled("img")({
  width: "100%",
  borderRadius: "8px 8px 0 0 ",
  objectFit: "cover",
  height: "170px",
});
const Category = styled(Typography)(({ theme, textcolor }) => ({
  float: "left",
  backgroundColor: textcolor || theme.palette.text.primary,
  color: "white",
  width: "fit-content",
  textAlign: "center",
  marginTop: "2px",
  borderRadius: "3px",
  fontSize: "12px",
  fontFamily: "monospace",
  fontWeight: "800",
  padding: "0 5px 0 5px",
}));
const Heading = styled(Typography)({
  fontSize: "18px",
  fontWeight: "600",
  padding: "0 4px",
});
const Details = styled(Typography)({
  color: "gray",
  fontSize: "14px",
  wordBreak: "break-word",
  padding: "0 4px",
  minHeight: "96px",
  textAlign: "justify",
  textJustify: "inter-word",
});
const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});
const Footer = styled(Box)({
  position: "absolute",
  zIndex: 10,
  bottom: 0,
  backgroundColor: "#F2F3F4",
  borderRadius: "0 0 8px 8px",
  width: "100%",
  display: "flex",
});
const UserIcon = styled(PersonOutlineIcon)({
  fontSize: "22px",
});
const TimeIcon = styled(WatchLaterIcon)({
  fontSize: "22px",
});
const CommentIcon = styled(ModeCommentOutlinedIcon)({
  fontSize: "22px",
  fontWeight: "bolder",
});
const Username = styled(Typography)({
  color: "gray",
  fontSize: "16px",
  marginTop: "3px",
});
const Time = styled(Typography)({
  color: "gray",
  fontSize: "14px",
  marginTop: "2px",
});
const Comment = styled(Typography)({
  color: "gray",
  fontSize: "14px",
  marginTop: "2px",
});
const GridComment = styled(Grid)({
  display: "flex",
  position: "absolute",
  right: "0px",
  padding: "2px",
});
const GridUser = styled(Grid)({
  display: "flex",
  position: "absolute",
  left: "0px",
  padding: "2px",
  height: "100%",
});
const GridTime = styled(Grid)({
  display: "flex",
  marginLeft: "40%",
  padding: "2px",
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Main Component~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const Post = ({ post }) => {
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const getComments = async () => {
      await getAllComments(post._id).then((res) => {
        setCommentCount(res.data.length);
      });
    };
    getComments();
  });

  const colorCodes = {
    All: "#800000	",
    Music: "#8E44AD",
    Movies: "#34495E",
    Sports: "#52BE80",
    Tech: "#5DADE2",
    Fashion: "#DC7633",
  };

  return (
    <StyledLink to={`details/${post._id}`}>
      <Container>
        <Image src={post.picture} alt="blog" />
        <Category textcolor={colorCodes[post.categories]}>
          {post.categories}
        </Category>
        <Heading>{addElipsis(post.title, 26)}</Heading>
        <Details>{addElipsis(post.description, 110)}</Details>
        <Footer>
          <Grid container>
            <GridUser item>
              <UserIcon />
              <Username style={{ position: "absolute", top: -3, left: 27 }}>
                {post.username}
              </Username>
            </GridUser>
            <GridTime item>
              <TimeIcon />
              <Time>{getTimePassed(post.createdDate)}</Time>
            </GridTime>
            <GridComment item>
              <CommentIcon />
              <Comment>{commentCount}</Comment>
            </GridComment>
          </Grid>
        </Footer>
      </Container>
    </StyledLink>
  );
};

export default Post;
