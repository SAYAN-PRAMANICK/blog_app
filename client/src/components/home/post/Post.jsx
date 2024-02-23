import { Box, Typography, styled } from "@mui/material";
import { addElipsis } from "../../../utils/common-utils";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Styles~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const Container = styled(Box)({
  border: "1.5px solid lightgray",
  borderRadius: "10px",
  margin: "10px",
  height: "350px",
  "& > p": {
    padding: "0 5px 5px 5px",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
const Image = styled("img")({
  width: "100%",
  borderRadius: "10px 10px 0 0 ",
  objectFit: "cover",
  height: "150px",
});
const Text = styled(Typography)({
  color: "#878787",
  fontSize: "12px",
});
const Heading = styled(Typography)({
  fontSize: "18px",
  fontWeight: "600",
});
const Details = styled(Typography)({
  fontSize: "14px",
  wordBreak: "break-word",
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Main Component~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const Post = ({ post }) => {
  return (
    <Container>
      <Image src={post.picture} alt="blog" />
      <Text>{post.categories}</Text>
      <Heading>{addElipsis(post.title, 20)}</Heading>
      <Text>{post.username}</Text>
      <Details>{addElipsis(post.description, 100)}</Details>
    </Container>
  );
};

export default Post;
