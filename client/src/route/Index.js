import React, { Suspense, useLayoutEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { RedirectAs404 } from "../utils/Utils";

import Homepage from "../pages/Homepage";
import PdfDisplay from "../pages/PdfDisplay";

const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<div />}>
      <Switch>
        <Route exact path={"/pdf"} component={PdfDisplay}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Homepage}></Route>
        <Route component={RedirectAs404}></Route>
      </Switch>
    </Suspense>
  );
};
export default Pages;
