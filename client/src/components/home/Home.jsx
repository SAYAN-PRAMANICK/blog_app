import React from "react";
import Banner from "../banner/Banner";
import Categories from "./Categories";
import { Grid } from "@mui/material";
import Posts from "./post/Posts";

const Home = () => {
  return (
    <>
      <Banner />
      <Grid container>
        <Grid item lg={1.2} sm={12} xs={12}>
          <Categories />
        </Grid>
        <Grid container item lg={10.8} sm={12} xs={12}>
          <Posts />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
