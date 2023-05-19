import React, { useEffect, useState } from "react";
import { backendURL } from "../../backendurl";
import { Button, Label } from "reactstrap";
import { Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDcoument from "../../utils/BookletPDF/generatorPdf";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const PDF = ({ alter,Data, toggleIconTab, updateCollegeInfo }) => {
  const [collegeData, setcollegeData] = useState();
  const [collegeName, setcollegeName] = useState();
  const [principalName, setprincipalName] = useState();
  const [declarationFlag, setdeclarationFlag] = useState(false);
  const [freezeFlag, setfreezeFlag] = useState(false);

  const getCollegeInfo = async (data) => {

  
        setcollegeData(data);
        setcollegeName(data.can);
        setprincipalName(data.Booklet.Personal.PrincipalName);
        setdeclarationFlag(data.Booklet.DeclarationFlag);
        setfreezeFlag(data?.Booklet.Frozen ? data.Booklet.Frozen : false);
    
  };
  useEffect(() => {
    getCollegeInfo(Data);
  }, []);
  const FreezeBooklet = () => {
    fetch(`${backendURL}/freezeBooklet`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        freeze: true,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {

        if (data.status) {

          const notify = () => {
            toast.success("Frozen successfully");
          };
          notify();
          updateCollegeInfo();
          // Reload webpage
          window.location.href="/";
          // toggleIconTab("Infrastructure");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
        We, declare that we have thoroughly reviewed and verified all Information provided for TNEA. I have ensured
        that all Information have been declared appropriately and that no further changes will be made
         without proper authorization from the relevant authorities. I take full responsibility for any errors or
        omissions that may have occurred during the verification process and certify that all changes made to the Booklet
        were necessary and within the scope of the our college.
      </p>

      {(freezeFlag == true || declarationFlag == true) && (
        <PDFDownloadLink document={<PdfDcoument collegedata={collegeData} />} fileName="declaration.pdf">
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
      {
       declarationFlag||freezeFlag? (
        <button disabled={freezeFlag} onClick={FreezeBooklet} className="btn btn-danger">{freezeFlag?
          "Frozen" : "Freeze"}</button>
            ) : (
              null
            )
            }
    </div>
  );
};

export default PDF;
