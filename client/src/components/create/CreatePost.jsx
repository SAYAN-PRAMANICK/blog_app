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

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Styles~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});
const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
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
  flex: "1",
  margin: "0 30px ",
  fontSize: "25px",
});
const TextArea = styled(TextareaAutosize)({
  width: "100%",
  marginTop: "50px",
  fontSize: "18px",
  border: "none",
  "&:focus-visible": {
    outline: "none",
  },
});

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
    : `https://source.unsplash.com/random/?${
        searhParams.get("category") || ""
      }`;
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Handler Functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
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
      : `https://source.unsplash.com/random/?${post.categories}`;
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
      <Image src={url} alt="banner" />
      <StyledFormControl>
        <label htmlFor="fileInput">
          <Add fontSize="large" color="action" />
        </label>
        <input
          accept="image/*"
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => {
            changeToBase64(e);
          }}
        />
        <InputTextField
          placeholder="Title"
          onChange={(e) => handleChange(e)}
          name="title"
        />
        <Button variant="contained" onClick={() => handlePublish()}>
          Publish
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
