import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="nk-footer">
      <div className="container-fluid">
        <div className="nk-footer-wrap">
          <div className="nk-footer-copyright"> &copy; 2023 TNEA</div>
          <div className="nk-footer-copyright">
            {" "}
            <p style={{ fontSize: "15px" }}>
              For any Queries please contact:
              <br />
              Email: Tneaseatmatrixteam@gmail.com
              <br /> Raghav - 8015637209 <br />
              Jayaprakesh - 9150301368
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
