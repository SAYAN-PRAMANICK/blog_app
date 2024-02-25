import {
  Box,
  Button,
  TextareaAutosize,
  Typography,
  styled,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import SendIcon from "@mui/icons-material/Send";
import { useState, useContext } from "react";
import { uploadComment } from "../../../service/api";
import { DataContext } from "../../../context/DataProvider";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Styles~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const MasterContainer = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));
const Container1 = styled(Box)({
  backgroundColor: "#242428",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  margin: "auto",
  justifyContent: "center",
  boxShadow: "3px 3px 3px  gray",
});
const Comment = styled(CommentIcon)({
  fontSize: "50px",
  color: "white",
});
const CommentText = styled(Typography)({
  fontSize: "35px",
  fontFamily: "monospace",
  marginLeft: "10px",
  fontWeight: "600",
  color: "white",
});
const Container2 = styled(Box)({
  marginTop: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const PersonIcon = styled(RecordVoiceOverIcon)({
  fontSize: "55px",
});
const TextArea = styled(TextareaAutosize)({
  border: "2px #F1C40F solid",
  borderRadius: "10px",
  boxShadow: "3px 3px 3px  gray",
  width: "80%",
  margin: "0px 10px 0px 20px",
});
const StyledButton = styled(Button)({
  borderRadius: "50%",
  border: "none",
  transition: "background-color 0.5s ease , box-shadow 0.5s ease",
  ":hover": {
    border: "none",
    borderRadius: "50%",
    backgroundColor: "#F2F3F4",
    boxShadow: "0 0 3px #797D7F",
    width: "fit-content",
  },
});
const Send = styled(SendIcon)({
  color: "#F39C12",
  fontSize: "40px",
  marginLeft: "20%",
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Main Component~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const Comments = ({ post }) => {
  const [count, setCount] = useState(0);
  const { account } = useContext(DataContext);
  const { id } = useParams();
  const [comment, setComment] = useState({
    postId: id,
    commentId: Date.now(),
    username: account.username,
    comment: "",
    date: new Date(),
  });

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Handler functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const handleSend = async (e) => {
    await uploadComment(comment)
      .then((res) => {
        if (res.status === 200) {
          setComment({ ...comment, comment: "" });
        }
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~renderer~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  return (
    <>
      <hr />
      <MasterContainer>
        <Container1>
          <Comment />
          <CommentText>{count} Comments</CommentText>
        </Container1>
        <Container2>
          <PersonIcon />
          <TextArea
            minRows={3}
            name="comment"
            placeholder="Comment here.."
            value={comment.comment}
            onChange={(e) =>
              setComment({ ...comment, comment: e.target.value })
            }
          />
          <StyledButton variant="outlined" onClick={() => handleSend()}>
            <Send />
          </StyledButton>
        </Container2>
        <CommentList comment={comment} setCount={setCount} />
      </MasterContainer>
    </>
  );
};

export default Comments;
