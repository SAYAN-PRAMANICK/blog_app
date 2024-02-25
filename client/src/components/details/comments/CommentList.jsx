import { useContext, useState, useEffect } from "react";
import { Box, Typography, styled } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DataContext } from "../../../context/DataProvider";
import { getAllComments, deleteCommentById } from "../../../service/api";
import { useParams } from "react-router-dom";

const List = styled(Box)({
  marginTop: "50px",
});
const CommentBox = styled(Box)({
  borderRadius: "10px",
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
  padding: "5px",
  backgroundColor: "#FAD7A0",
  boxShadow: "3px 3px 3px  gray",
  color: "black",
});
const Container = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});
const User = styled(Typography)({
  border: "2px white solid",
  borderRadius: "5px",
  backgroundColor: "gray",
  color: "white",
  fontFamily: '"Protest Guerrilla", sans-serif',
  padding: "2px",
  boxShadow: "3px 3px 3px  gray",
});
const UserAndDate = styled(Box)({
  display: "flex",
  alignItems: "top",
});
const StyledDate = styled(Typography)({
  marginLeft: "10px",
  color: "gray",
  fontSize: "13px",
  fontWeight: "600",
});
const StyledComment = styled(Typography)({
  padding: "5px 0px 0px 10px",
  fontSize: "18px",
  fontWeight: "600",
});
const StyledDelete = styled(DeleteOutlineIcon)({
  color: "red",
  fontWeight: "700",
  transition: "color 0.1s ease-out",
  fontSize: "25px",
  ":hover": {
    color: "black",
  },
  ":active": {
    color: "red",
  },
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Main Component~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const CommentList = ({ comment, setCount }) => {
  const { account } = useContext(DataContext);
  const [allComments, setAllComments] = useState();
  const [deleteComment, setDeleteComment] = useState(0);
  const { id } = useParams();

  const handleDelete = async (id) => {
    await deleteCommentById(id).then((res) => {
      let c = deleteComment + 1;
      setDeleteComment(c);
    });
  };

  useEffect(() => {
    const getComments = async () => {
      await getAllComments(id).then((res) => {
        setAllComments(res.data);
        setCount(res.data.length);
      });
    };
    getComments();
  }, [comment, deleteComment, id, setCount]);

  return (
    <List>
      {allComments &&
        allComments.map((comment, key) => {
          return (
            <Box key={key}>
              <CommentBox>
                <Container>
                  <UserAndDate>
                    <User>{comment.username}</User>
                    <StyledDate>
                      {new Date(comment.date).toDateString()}
                    </StyledDate>
                  </UserAndDate>
                  {account.username === comment.username ? (
                    <StyledDelete
                      onClick={() => handleDelete(comment.commentId)}
                    />
                  ) : (
                    <></>
                  )}
                </Container>
                <StyledComment>{comment.comment}</StyledComment>
              </CommentBox>
            </Box>
          );
        })}
    </List>
  );
};

export default CommentList;
