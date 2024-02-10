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
import { useSearchParams } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { uploadFile } from "../../service/api";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Styles~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Main Component~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const CreatePost = () => {
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~State Variables & Hooks~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
    : "https://source.unsplash.com/random/?nightsky";

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Handler Functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Use Effect~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~API Call~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        const response = await uploadFile(data);
        post.picture = response.data;
      }

      post.categories = searhParams.get("category") || "All";
      post.username = account.username;
    };

    getImage();
  });

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Render~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
