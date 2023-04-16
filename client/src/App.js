import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { RedirectAs404 } from "./utils/Utils";
import PrivateRoute from "./route/PrivateRoute";
import Layout from "./layout/Index";
import Error404Modern from "./pages/error/404-modern";
import Error504Modern from "./pages/error/504-modern";
import Login from "./pages/auth/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PdfDisplay from "./pages/PdfDisplay";
const App = (props) => {
  return (
    <Switch>
      {/* Auth Pages */}

      <Route exact path={`${process.env.PUBLIC_URL}/auth-login`} component={Login}></Route>
      {/*Error Pages*/}
      <Route exact path={`${process.env.PUBLIC_URL}/504`} component={Error504Modern}></Route>
      <Route exact path={`${process.env.PUBLIC_URL}/404`} component={Error404Modern}></Route>
      

      {/*Main Routes*/}
      <PrivateRoute exact path="" component={Layout}></PrivateRoute>
      <Route component={RedirectAs404}></Route>
      <ToastContainer />
    </Switch>
  );
};
export default withRouter(App);
