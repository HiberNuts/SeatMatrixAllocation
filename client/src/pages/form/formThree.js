import React, { useEffect, useState } from "react";
import { backendURL } from "../../backendurl";
import { Button, Label } from "reactstrap";
import { Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDcoument from "../../utils/PdfUtils/generatorPdf";
import axios from "axios";

const FormThree = ({ alter, toggleIconTab, Data, updateCollegeInfo }) => {
  const [collegeData, setcollegeData] = useState();
  const [collegeName, setcollegeName] = useState();
  const [principalName, setprincipalName] = useState();
  const [declarationFlag, setdeclarationFlag] = useState(false);
  const [freezeFlag, setfreezeFlag] = useState(false);

  const getCollegeInfo = async () => {
    const data = Data;
    setcollegeData(data);
    setcollegeName(data.can);
    setprincipalName(data.PrincipalName);
    setdeclarationFlag(data.DeclarationFlag);
    setfreezeFlag(data?.FreezeFlag ? data.FreezeFlag : false);
  };
  useEffect(() => {
    updateCollegeInfo();
    getCollegeInfo();
  }, []);

  const updateDeclarationFlag = async (value) => {
    setdeclarationFlag(value);
    const response = await axios.post(
      `${backendURL}/declaration`,
      { flag: value },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
  };

  return (
    <div>
      <div>
        <Label className="form-label" htmlFor="fv-full-name">
          College Name
        </Label>
        <input
          disabled={true}
          type="text"
          id="fv-full-name"
          name="CollegeName"
          className="form-control"
          value={collegeName}
        />
        <Label className="form-label" htmlFor="fv-full-name">
          Principal Name
        </Label>
        <input
          disabled={true}
          type="text"
          id="fv-full-name"
          name="CollegeName"
          className="form-control"
          value={principalName}
        />
      </div>
      <input
        style={{ fontSize: "20px" }}
        class="form-check-input"
        onClick={(e) => {
          if (freezeFlag) {
            return;
          } else {
            updateDeclarationFlag(e.target.checked);
          }
        }}
        type="checkbox"
        checked={freezeFlag || declarationFlag}
        id="flexCheckChecked"
      ></input>
      <p>
        We, declare that we have thoroughly reviewed and verified all seat allocation matrix for TNEA. We have ensured
        that all seats have been allocated appropriately and that no further changes will be made to the allocation
        matrix without proper authorization from the relevant authorities. We take full responsibility for any errors or
        omissions that may have occurred during the verification process and certify that all changes made to the matrix
        were necessary and within the scope of the project/task/assignment.
      </p>

      {(freezeFlag == true || declarationFlag == true) && (
        <PDFDownloadLink document={<PdfDcoument collegeData={collegeData} />} fileName="declaration.pdf">
          {({ blob, url, loading, error }) =>
            loading ? (
              "Loading document..."
            ) : (
              <button className="btn btn-primary">Download the declaration form here!</button>
            )
          }
        </PDFDownloadLink>
      )}

      <div>
        <span style={{ color: "red" }}>*Important: </span>Please download the pdf from above and upload the same file in
        next section with principal signature in it.
      </div>
      <div className="d-flex justify-content-between">
          <Button
            type="submit"
            onClick={() => {
              toggleIconTab("verify");
            }}
            className="text-center m-4"
            color="danger"
          >
            &lt; Back
          </Button>
          {freezeFlag == true ? (
            <Button
              type="submit"
              onClick={() => {
                toggleIconTab("8");
              }}
              className="text-center m-4"
              color="success"
              disabled={!declarationFlag}
                   >
              Next &gt;
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={() => {
                toggleIconTab("8");
              }}
              className="text-center m-4"
              color="success"
              disabled={!declarationFlag}
            >
              Save and Proceed to Next &gt;
            </Button>
          )}
        </div>
    </div>
  );
};

export default FormThree;
