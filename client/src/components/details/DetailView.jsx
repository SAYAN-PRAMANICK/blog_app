import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getPostById, updatePostById, deletePostById } from "../../service/api";
import {
  Box,
  Typography,
  styled,
  InputBase,
  TextareaAutosize,
  keyframes,
} from "@mui/material";
import { Edit, Delete, Save } from "@mui/icons-material";
import { DataContext } from "../../context/DataProvider";
import Comments from "./comments/Comments";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Styles~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const blinkAnimation = keyframes`
  0% {
    border-color: #154360;
  }
  50% {
    border-color: transparent;
  }
  100% {
    border-color: #154360;
  }
`;
const Container = styled(Box)(({ theme }) => ({
  margin: "50px 80px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));
const Image = styled("img")({
  marginTop: "1%",
  objectFit: "cover",
  width: "100%",
  height: "50vh",
  border: "#154360 2px solid",
  borderRadius: "5px",
});
const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "38px",
  fontWeight: "600",
  margin: "30px 0 10px 0",
  wordBreak: "break-word",
  borderRadius: "10px",
  textDecoration: "underline",
  [theme.breakpoints.up("md")]: {
    textAlign: "justify",
    textJustify: "inter-word",
  },
}));
const Author = styled(Box)({
  margin: "20px 0",
  display: "flex",
  "& > p": {
    color: "white",
    backgroundColor: "#34495E",
    fontFamily: "monospace",
    borderRadius: "5px",
    padding: "0 3px",
    border: "#154360 2px solid",
  },
});
const Description = styled(Typography)({
  width: "100%",
  wordBreak: "break-word",
  fontFamily: "sans-serif",
  fontSize: "18px",
  textAlign: "justify",
  textJustify: "inter-word",
});
const SaveIcon = styled(Save)`
  --g: 2px; /* the gap */
  --b: 2px; /* border thickness*/
  --c: #154360; /* the color */

  padding: calc(var(--g) + var(--b));
  --_c: #0000 0 25%, var(--c) 0 50%;
  --_g1: repeating-linear-gradient(90deg, var(--_c)) repeat-x;
  --_g2: repeating-linear-gradient(180deg, var(--_c)) repeat-y;
  background: var(--_g1) var(--_p, 25%) 0, var(--_g2) 0 var(--_p, 125%),
    var(--_g1) var(--_p, 125%) 100%, var(--_g2) 100% var(--_p, 25%);
  background-size: 200% var(--b), var(--b) 200%;
  cursor: pointer;
  filter: grayscale(0%);
  transition: 0.3s;
  :hover {
    --_p: 75%;
  }
  :active {
    color: black;
    transition: 0s;
    --c: red;
  }
`;
const DeleteIcon = styled(Delete)`
  margin: 0 0 0 10px;
  --g: 2px; /* the gap */
  --b: 2px; /* border thickness*/
  --c: #154360; /* the color */

  padding: calc(var(--g) + var(--b));
  --_c: #0000 0 25%, var(--c) 0 50%;
  --_g1: repeating-linear-gradient(90deg, var(--_c)) repeat-x;
  --_g2: repeating-linear-gradient(180deg, var(--_c)) repeat-y;
  background: var(--_g1) var(--_p, 25%) 0, var(--_g2) 0 var(--_p, 125%),
    var(--_g1) var(--_p, 125%) 100%, var(--_g2) 100% var(--_p, 25%);
  background-size: 200% var(--b), var(--b) 200%;
  cursor: pointer;
  filter: grayscale(0%);
  transition: 0.3s;
  :hover {
    --_p: 75%;
  }
  :active {
    color: black;
    transition: 0s;
    --c: red;
  }
`;
const EditIcon = styled(Edit)`
  --g: 2px; /* the gap */
  --b: 2px; /* border thickness*/
  --c: #154360; /* the color */

  padding: calc(var(--g) + var(--b));
  --_c: #0000 0 25%, var(--c) 0 50%;
  --_g1: repeating-linear-gradient(90deg, var(--_c)) repeat-x;
  --_g2: repeating-linear-gradient(180deg, var(--_c)) repeat-y;
  background: var(--_g1) var(--_p, 25%) 0, var(--_g2) 0 var(--_p, 125%),
    var(--_g1) var(--_p, 125%) 100%, var(--_g2) 100% var(--_p, 25%);
  background-size: 200% var(--b), var(--b) 200%;
  cursor: pointer;
  filter: grayscale(0%);
  transition: 0.3s;
  :hover {
    --_p: 75%;
  }
  :active {
    color: black;
    transition: 0s;
    --c: red;
  }
`;

const EditHeading = styled(InputBase)({
  fontSize: "38px",
  fontWeight: "600",
  wordBreak: "break-word",
  width: "100%",
  height: "57px",
  border: "3px solid #154360",
  borderRadius: "10px",
  backgroundColor: "#d7bde2",
  paddingLeft: "5px",
  color: "#566573",
  animation: `${blinkAnimation} 0.3s ease-out `,
});
const TextArea = styled(TextareaAutosize)({
  width: "99.2%",
  wordBreak: "break-word",
  fontFamily: "sans-serif",
  fontSize: "18px",
  border: "3px solid #154360",
  borderRadius: "10px",
  backgroundColor: "#d5f5e3",
  animation: `${blinkAnimation} 0.3s ease-out `,
  color: "#566573",
  textAlign: "justify",
  textJustify: "inter-word",
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~main component~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const DetailView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({});
  const { account } = useContext(DataContext);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [updatedPost, setUpdatedPost] = useState({
    title: "",
    description: "",
    picture: "",
    username: "",
    categories: "",
    createdDate: "",
  });

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~use effect~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  useEffect(() => {
    const fetchData = async () => {
      await getPostById(id).then((res) => {
        setPost(res.data);
      });
    };

    fetchData();
  }, [toggleEdit]);

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~handler functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const handleEdit = () => {
    setUpdatedPost({
      ...updatedPost,
      title: post.title,
      description: post.description,
      picture: post.picture,
      username: post.username,
      categories: post.categories,
      createdDate: post.createdDate,
    });
    setToggleEdit(true);
  };

  const handleSave = async () => {
    setToggleEdit(false);
    const updatePayload = [id, updatedPost];

    await updatePostById(updatePayload).catch((err) => console.log(err));

    setPost(updatedPost);
  };

  const handleDelete = async () => {
    await deletePostById(id)
      .then((res) => {
        if (res.status === 200) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("Error:", err.response.data);
      });
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~renderer~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  return (
    <div style={{}}>
      <Container>
        <Image src={post.picture} />

        {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Edit & Delete Buttons~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <Box style={{ float: "right" }}>
          {account.username === post.username && (
            <>
              {toggleEdit ? (
                <SaveIcon
                  onClick={() => {
                    handleSave();
                  }}
                  color="primary"
                />
              ) : (
                <EditIcon onClick={() => handleEdit()} color="primary" />
              )}
              <DeleteIcon onClick={() => handleDelete()} color="error" />
            </>
          )}
        </Box>

        {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Title~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        {toggleEdit ? (
          <EditHeading
            placeholder="Title"
            onChange={(e) => {
              setUpdatedPost({ ...updatedPost, title: e.target.value });
            }}
            defaultValue={post.title + "..."}
            name="title"
          />
        ) : (
          <Heading>{post.title}</Heading>
        )}

        {/* //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Author & Date ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <Author>
          <Typography>
            <b> Author:</b>{" "}
            <Box component="span" style={{ fontWeight: 600 }}>
              {post.username}
            </Box>
          </Typography>
          <Typography style={{ marginLeft: "auto" }}>
            {new Date(post.createdDate).toDateString()}
          </Typography>
        </Author>

        {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Description~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        {toggleEdit ? (
          <TextArea
            minRows={2}
            placeholder="Tell your story...."
            onChange={(e) => {
              setUpdatedPost({ ...updatedPost, description: e.target.value });
            }}
            defaultValue={post.description + "..."}
            name="description"
          />
        ) : (
          <Description>{post.description}</Description>
        )}
      </Container>
      <Comments post={post} />
    </div>
  );
};

export default DetailView;
