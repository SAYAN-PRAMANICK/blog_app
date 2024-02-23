import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getPostById } from "../../service/api";
import { Box, Typography, styled } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { DataContext } from "../../context/DataProvider";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Styles~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const Container = styled(Box)({
  margin: "50px 100px",
});
const Image = styled("img")({
  objectFit: "cover",
  width: "100%",
  height: "50vh",
});
const Heading = styled(Typography)({
  fontSize: "38px",
  fontWeight: "600",
  textAlign: "center",
  margin: "50px 0 10px 0",
  wordBreak: "break-word",
});
const EditIcon = styled(Edit)({
  margin: "5px",
  padding: "5px",
  border: "1px solid #878787",
  borderRadius: "10px",
});
const DeleteIcon = styled(Delete)({
  margin: "5px",
  padding: "5px",
  border: "1px solid #878787",
  borderRadius: "10px",
});
const Author = styled(Box)({
  color: "#878787",
  margin: "20px",
  display: "flex",
});
const Description = styled(Typography)({
  wordBreak: "break-word",
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~main component~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const DetailView = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const { account } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      await getPostById(id).then((res) => {
        setPost(res.data);
      });
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Image src={post.picture} />
      <Box style={{ float: "right" }}>
        {account.username === post.username && (
          <>
            <EditIcon color="primary" />
            <DeleteIcon color="error" />
          </>
        )}
      </Box>
      <Heading>{post.title}</Heading>

      <Author>
        <Typography>
          Author:{" "}
          <Box component="span" style={{ fontWeight: 600 }}>
            {post.username}
          </Box>
        </Typography>
        <Typography style={{ marginLeft: "auto" }}>
          {new Date(post.createdDate).toDateString()}
        </Typography>
      </Author>
      <Description>{post.description}</Description>
    </Container>
  );
};

export default DetailView;
