import {
  Box,
  Button,
  InputBase,
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
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

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
  position: "relative",
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
  padding: "2px",
});

const Post = styled(Button)`
  position: absolute;
  right: 0;
  height: 50px;
  font-weight: 600;
  border-radius: 10px;

  --b: 0.1em; /* the thickness of the line */
  --c: black; /* the color */
  border: #f1c40f 2px solid;
  color: #0000;
  padding-block: var(--b);
  background: linear-gradient(var(--c) 50%, #000 0) 0%
      calc(100% - var(--_p, 0%)) / 100% 200%,
    linear-gradient(var(--c) 0 0) 0% var(--_p, 0%) / var(--_p, 0%) var(--b)
      no-repeat;
  -webkit-background-clip: text, padding-box;
  background-clip: text, padding-box;
  transition: 0.3s var(--_s, 0s) linear,
    background-size 0.3s calc(0.3s - var(--_s, 0s));
  background-color: #ffbf00;
  color: white;
  box-shadow: 3px 3px 3px gray;

  :hover {
    color: black;
    border: none;
    border: black 2px solid;
    box-shadow: 3px 3px 3px gray;
    --_p: 100%;
    --_s: 0.3s;
  }

  :active {
    border: none;
    border: red 2px solid;
    box-shadow: 3px 3px 3px red;
    transition: 0s;
    color: red;
  }
`;

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
          <CommentText>
            {count} {count == 1 ? "Comment" : "Comments"}
          </CommentText>
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

          <Post
            onClick={() => handleSend()}
            endIcon={<KeyboardArrowRightIcon />}
          >
            Post
          </Post>
        </Container2>
        <CommentList comment={comment} setCount={setCount} />
      </MasterContainer>
    </>
  );
};

export default Comments;
