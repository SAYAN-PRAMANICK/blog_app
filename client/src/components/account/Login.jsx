import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { loginUser, signupUser } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Styles~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const Component = styled(Box)`
  background-color: #fefefe;
  width: 400px;
  margin: auto;
  border-right: solid grey 1px;
  border-bottom: solid grey 1px;
  border-radius: 10px;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.4);
`;
const Image = styled("img")({
  width: 350,
  margin: "auto",
  display: "flex",
});
const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const Button1 = styled(Button)`
  text-transform: none;
`;
const Button2 = styled(Button)({
  height: "20px",
  textTransform: "none",
  margin: "auto",
  width: "fit-content",
  "&:hover": {
    backgroundColor: "#FEFEFE",
    color: "black",
    textDecoration: "underline",
  },
});
const Text = styled(Typography)({
  color: "#878787",
  fontSize: 16,
});
const Error = styled(Typography)({
  color: "red",
  fontSize: 10,
  lineHeight: 0,
  marginTop: "10px",
  fontWeight: 600,
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Main Component~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const Login = ({ setIsAuthenticated }) => {
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~State variables & Hooks~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const [toggleLogin, setToggleLogin] = useState(true);
  const [signupValues, setSignupValues] = useState({
    fullname: "",
    username: "",
    password: "",
  });
  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({ state: false, data: "" });
  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~LoginPage LOGO~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const imageURL =
    "https://archive.bethebusiness.com/wp-content/uploads/2019/12/Bloggraphic.jpg";

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Event handlers~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const handleSignupValues = (e) => {
    setSignupValues({ ...signupValues, [e.target.name]: e.target.value });
    setError({ state: false, data: "" });
  };
  const handleSignupButton = () => {
    signupUser(signupValues)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err.response.data);
        setError({ state: true, data: err.response.data });
      })
      .then(() => {
        setSignupValues({ fullname: "", username: "", password: "" });
      });
  };
  const handleLoginValues = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
  };
  const handleLoginButton = () => {
    loginUser(loginValues)
      .then((res) => {
        sessionStorage.setItem("accessToken", `Bearer ${res.data.accessToken}`);
        sessionStorage.setItem(
          "refreshToken",
          `Bearer ${res.data.refreshToken}`
        );
        setAccount({ name: res.data.name, username: res.data.username });
        navigate("/");
        setIsAuthenticated(true);
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="login" />
        {toggleLogin ? (
          // login page
          <Wrapper>
            <TextField
              id="filled-basic"
              value={loginValues.username}
              onChange={(e) => handleLoginValues(e)}
              name="username"
              label="username or email"
              variant="filled"
            />
            <TextField
              id="filled-basic"
              value={loginValues.password}
              onChange={(e) => handleLoginValues(e)}
              name="password"
              label="password"
              variant="filled"
            />
            <Button1 onClick={() => handleLoginButton()} variant="contained">
              Login
            </Button1>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <Button2
              onClick={() => setToggleLogin(false)}
              style={{ marginTop: "10px" }}
              variant="text"
            >
              Create an account
            </Button2>
          </Wrapper>
        ) : (
          // sign-up page
          <Wrapper>
            <TextField
              onChange={(e) => handleSignupValues(e)}
              name="fullname"
              id="filled-basic"
              label="full name"
              variant="filled"
            />
            <TextField
              onChange={(e) => handleSignupValues(e)}
              name="username"
              id="filled-basic"
              label="username"
              variant="filled"
            />
            {error.state && (
              <Error
                style={{
                  textAlign: "center",
                  marginTop: "7px",
                  marginBottom: "-7px",
                }}
              >
                {error.data}
              </Error>
            )}
            <TextField
              onChange={(e) => handleSignupValues(e)}
              name="password"
              id="filled-basic"
              label="password"
              variant="filled"
            />
            <Button1 onClick={() => handleSignupButton()} variant="contained">
              Sign Up
            </Button1>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <Button2
              onClick={() => setToggleLogin(true)}
              style={{ marginTop: "10px" }}
              variant="text"
            >
              Already have an account
            </Button2>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
