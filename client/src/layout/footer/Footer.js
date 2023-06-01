import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="nk-footer">
      <div className="container-fluid">
        <div className="nk-footer-wrap">
          <div className="nk-footer-copyright">
            {" "}
            &copy; 2023 TNEA <br />
            For better expirence please use laptop/PC
          </div>
          <div className="nk-footer-copyright">
            {" "}
            <p style={{ fontSize: "15px" }}>
              For any Queries please contact:
              <br />
              Email: Tneaseatmatrixteam@gmail.com
              <br />
              Jayaprakesh - 9150301368
              <br />
              Raghav - 8015637209
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
