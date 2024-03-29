import { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  InputBase,
  TextareaAutosize,
  styled,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { uploadFile, uploadPost } from "../../service/api";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Styles~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const StyledDisplay = styled(Box)({
  marginTop: "5.5%",
  position: "relative",
});
const labelStyle = {
  cursor: "pointer",
  backgroundColor: "white",
  border: "#154360 2px solid",
  borderRadius: "5px",
  position: "absolute",
  bottom: 4,
  left: 0,
  paddingTop: "3px",
  color: "#154360",
};
const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
  border: "#154360 2px solid",
  borderRadius: "5px",
});
const Container = styled(Box)(({ theme }) => ({
  margin: "50px 80px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));
const StyledFormControl = styled(FormControl)({
  marginTop: "20px",
  display: "flex",
  flexDirection: "row",
});
const InputTextField = styled(InputBase)({
  width: "100%",
  fontSize: "25px",
  border: "#154360 2px solid",
  marginRight: "25px",
  borderRadius: "5px",
  paddingLeft: "10px",
  backgroundColor: "#D7BDE2",
  fontFamily: "monospace",
});
const TextArea = styled(TextareaAutosize)(({ theme }) => ({
  marginTop: "30px",
  fontSize: "18px",
  "&:focus-visible": {
    outline: "none",
  },
  border: "#154360 2px solid",
  borderRadius: "5px",
  backgroundColor: "#D5F5E3",
  padding: "1%",
  width: "98%",
  [theme.breakpoints.down("md")]: {
    padding: "1%",
    width: "97%",
  },
}));

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Main Component~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const CreatePost = () => {
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~State Variables & Hooks~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    description: "",
    picture: "",
    username: "",
    categories: "",
    createdDate: "",
  });
  const [file, setFile] = useState("");
  const [searhParams] = useSearchParams();
  const { account } = useContext(DataContext);

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Image URL~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const url = post.picture
    ? post.picture
    : `https://source.unsplash.com/random`;
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Handler Functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: String(e.target.value) });
  };
  const changeToBase64 = (e) => {
    let img = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
      setFile({
        imageId: Date.now(),
        imageName: img.name,
        imageData: reader.result,
      });
    };
    reader.onerror = (err) => {
      console.log("Error: ", err);
    };
  };
  const handlePublish = async () => {
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Image Upload API call~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    if (file) {
      try {
        uploadFile(file);
      } catch (error) {
        console.log("can't upload file! Try again later...");
      }
    }
    post.categories = searhParams.get("category") || "All";
    post.username = account.username;
    post.createdDate = new Date();
    post.picture = post.picture
      ? post.picture
      : `https://source.unsplash.com/random`;
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Post Upload API call~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    await uploadPost(post)
      .then((res) => {
        if (res.status) {
          navigate("/");
        }
      })
      .catch((err) => alert(err.response.data));
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Use Effect~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  useEffect(() => {
    if (file.imageData) {
      setPost({ ...post, picture: file.imageData });
    }
  }, [file, post]);

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Render~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  return (
    <Container>
      <StyledDisplay>
        <Image src={url} alt="banner" />
        <label htmlFor="fileInput" style={labelStyle}>
          <Add fontSize="medium" color="#154360" />
        </label>
      </StyledDisplay>
      <input
        accept="image/*"
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={(e) => {
          changeToBase64(e);
        }}
      />
      <StyledFormControl>
        <InputTextField
          placeholder="Title"
          onChange={(e) => handleChange(e)}
          name="title"
        />
        <Button
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
          onClick={() => handlePublish()}
        >
          Post
        </Button>
      </StyledFormControl>
      <TextArea
        minRows={5}
        placeholder="Tell your story...."
        onChange={(e) => handleChange(e)}
        name="description"
      />
    </Container>
  );
};

export default CreatePost;
