import React, { useState } from "react";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import { Route, Switch } from "react-router-dom";
import ViewHome from "./components/ViewHome";
import ViewProfile from "./components/ViewProfile";
import HeaderLayout from "./layouts/HeaderLayout";
import { Col, Row } from "antd";
import FooterLayout from "./layouts/FooterLayout";
import ViewSales from "./components/ViewSales";
import ViewSignUp from "./components/ViewSignUp";

const App = () => {
  const [signedIn, setSignedIn] = useState({});
  const [products, setProducts] = useState([]);

  return (
    <>
      <Row>
        <Col span={24}>
          <HeaderLayout />
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <MainLayout />
        </Col>
        <Col span={20}>
          <Switch>
            <Route path="/Home">
              <ViewHome setProducts={setProducts} setSignedIn={setSignedIn} />
            </Route>
            <Route path="/Profile">
              <ViewProfile signedIn={signedIn} />
            </Route>
            <Route path="/Sales">
              <ViewSales products={products} signedIn={signedIn} />
            </Route>
            <Route path="/SignUp">
              <ViewSignUp setSignedIn={setSignedIn} />
            </Route>
          </Switch>
        </Col>
        <Col span={24}>
          <FooterLayout />
        </Col>
      </Row>
    </>
  );
};

export default App;
