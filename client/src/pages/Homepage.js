import React from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";

const Homepage = ({ ...props }) => {
  return (
    <React.Fragment>
      <Head title="Homes" />
      <Content>
        <p>HOME PAGE</p>
      </Content>
    </React.Fragment>
  );
};

export default Homepage;
