import React from "react";
import { Row, Col } from "../../components/Component";

const AuthFooter = () => {
  return (
    <div className="nk-footer nk-auth-footer-full">
      <div className="container wide-lg">
        <Row className="g-3">
          <div
            style={{ display: "flex", justifyContent: "space-evenly" }}
            className="nk-block-content text-center text-lg-start"
          >
            <p className="text-soft">
              &copy; 2023 TNEA. All Rights Reserved. <br />
              For better expirence please use laptop/PC
            </p>
            <p style={{ fontSize: "15px", alignItems: "start", alignSelf: "start" }}>
              For any Queries please contact:
              <br />
              Email: Tneaseatmatrixteam@gmail.com
              <br /> Raghav - 8015637209 <br />
              Jayaprakesh - 9150301368
            </p>
          </div>
        </Row>
      </div>
    </div>
  );
};
export default AuthFooter;
