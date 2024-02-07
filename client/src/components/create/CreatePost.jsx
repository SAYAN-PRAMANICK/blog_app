import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  InputBase,
  TextareaAutosize,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});
const Container = styled(Box)({
  margin: "50px 100px",
});
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

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: "",
};

const CreatePost = () => {
  const url = "https://source.unsplash.com/random/?nightsky";
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");

  useEffect(() => {
    const getImage = () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        //API CALL
        post.picture = ""; //TODO
      }
      getImage();

      // post.categories;
    };
  }, [file]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Image src={url} alt="banner" referrerPolicy="no-referrer" />
      <StyledFormControl>
        <label htmlFor="fileInput">
          <Add fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <InputTextField
          placeholder="Title"
          onChange={(e) => handleChange(e)}
          name="title"
        />
        <Button variant="contained">Publish</Button>
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
