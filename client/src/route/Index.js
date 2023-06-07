import React, { Suspense, useLayoutEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { RedirectAs404 } from "../utils/Utils";
import Booklet from "../pages/Booklet";
import Homepage from "../pages/Homepage";
import PdfDisplay from "../pages/PdfDisplay";
import Error504Modern from "../pages/SeatMatrix504";
import Instructions from "../pages/Instructions";
import Dash from "../pages/dash/Dash";
const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<div />}>
      <Switch>
        {/* <Route exact path={"/pdf"} component={PdfDisplay}></Route> */}
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Homepage}></Route>
        {/* <Route exact path={`${process.env.PUBLIC_URL}/booklet`} component={Booklet}></Route> */}
        <Route exact path={`${process.env.PUBLIC_URL}/seatMatrix`} component={Homepage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/Instructions`} component={Instructions}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/dash`} component={Dash}></Route>

        <Route component={RedirectAs404}></Route>
      </Switch>
    </Suspense>
  );
};
export default Pages;
