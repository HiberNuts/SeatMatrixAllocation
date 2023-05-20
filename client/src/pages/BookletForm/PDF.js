import React, { useEffect, useRef, useState } from "react";
import { backendURL } from "../../backendurl";
import { Button, Label } from "reactstrap";
import { Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDcoument from "../../utils/BookletPDF/generatorPdf";
import axios from "axios";
import FormData from "form-data";
import { toast } from "react-toastify";
const PDF = ({ alter, Data, getCollegeInfo, toggleIconTab }) => {
  const [collegeData, setcollegeData] = useState();
  const [collegeName, setcollegeName] = useState();
  const [principalName, setprincipalName] = useState();
  const [declarationFlag, setdeclarationFlag] = useState(false);
  const [freezeFlag, setfreezeFlag] = useState(false);
  const [signedUrls, setSignedUrls] = useState({});

  const [bookletDeclaration, setbookletDeclaration] = useState("");

  const getCollegedata = async (data) => {
    setcollegeData(data);
    setcollegeName(data.can);
    setprincipalName(data.Booklet.Personal.PrincipalName);
    setdeclarationFlag(data.Booklet.DeclarationFlag);
    setfreezeFlag(data?.Booklet.Frozen ? data.Booklet.Frozen : false);
  };
  useEffect(() => {
    getCollegedata(Data);
    getDocUrls();
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
          getCollegeInfo();
          // Reload webpage
          window.location.href="/";

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

  const inputbookletDeclaration = useRef(null);

  const GenerateButtons = ({ type }) => {
    return (
      <a
        class="btn btn-sm btn-primary"
        style={{ textDecoration: "none" }}
        href={signedUrls[`${type}.pdf`]}
        target="_blank"
      >
        <span>Click here to download </span>
        <i style={{ fontSize: "20px", fontWeight: "bold", marginLeft: "5px" }} class="bi bi-download"></i>
      </a>
    );
  };

  const handleSubmit = async () => {
    try {
      var formData = new FormData();

      if (bookletDeclaration.length == undefined) {
        formData.append("bookletDeclaration", bookletDeclaration);
      }

      let Keys = [];
      for (var [key, value] of formData.entries()) {
        Keys.push(key);
      }
      if (Keys.length > 0) {
        const res = await axios.post(`${backendURL}/DocUpload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (res.data.status) {
          setbookletDeclaration();
          inputbookletDeclaration.current.value = "";
          getCollegeInfo();
          window.location.href="/";
        }
        toast.success("Files added successfully");

      } else {
        toast.warning("Select atleast one field");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDocUrls = async () => {
    const url = await axios.get(`${backendURL}/documents`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    setSignedUrls(url.data);
  };

  const handleDocDelete = async (type) => {
    const response = await axios.post(
      `${backendURL}/deleteDoc`,
      { key: type },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    if (response.data.status) {
      getCollegeInfo();
      toast.success("Document deleted");
    } else {
      toast.error("An error occured, please try again");
    }
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
        disabled={freezeFlag}
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
        We, declare that we have thoroughly reviewed and verified all Information provided for TNEA. I have ensured that
        all Information have been declared appropriately and that no further changes will be made without proper
        authorization from the relevant authorities. I take full responsibility for any errors or omissions that may
        have occurred during the verification process and certify that all changes made to the Booklet were necessary
        and within the scope of the our college.
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
        <span style={{ color: "red" }}>*Important: </span>Please download the pdf from above and upload the same file
        below with principal signature in it.
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Details</th>
            <th scope="col">PDF Download</th>
            <th scope="col">Upload/Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>
              Declaration Form <span style={{ color: "red" }}>*</span>
            </td>
            <td>
              {collegeData?.Documents?.bookletDeclaration == true ? (
                <GenerateButtons type={"bookletDeclaration"} />
              ) : (
                <div>
                  No document available
                  <br /> Upload first
                </div>
              )}
            </td>

            <td>
              <div className="form-control-wrap">
                {freezeFlag ? (
                  <span></span>
                ) : (
                  <div className="form-file">
                    {collegeData?.Documents?.bookletDeclaration == true ? (
                      <button
                        style={{ marginRight: "5px" }}
                        disabled={freezeFlag}
                        class="btn btn-sm btn-outline-dark"
                        onClick={() => inputbookletDeclaration.current.click()}
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        style={{ marginRight: "5px" }}
                        disabled={freezeFlag}
                        class="btn btn-sm btn-outline-dark"
                        onClick={() => inputbookletDeclaration.current.click()}
                      >
                        Add
                      </button>
                    )}

                    {bookletDeclaration && (
                      <button
                        class="btn btn-sm btn-outline-dark"
                        disabled={freezeFlag}
                        onClick={() => {
                          inputbookletDeclaration.current.value = "";
                          setbookletDeclaration();
                        }}
                      >
                        Remove
                      </button>
                    )}
                    <input
                      type="file"
                      accept=".pdf"
                      disabled={freezeFlag}
                      onChange={(e) => {
                        if (e.target.files[0].size > 1048576) {
                          inputbookletDeclaration.current.value = "";
                          setbookletDeclaration();
                          toast.warning("File size must not exceed 1MB", { autoClose: 3000 });
                          return;
                        }
                        setbookletDeclaration(e.target.files[0]);
                      }}
                      ref={inputbookletDeclaration}
                    />
                  </div>
                )}
              </div>
            </td>
            <td>
              {collegeData?.Documents?.bookletDeclaration == true && (
                <button onClick={() => handleDocDelete("bookletDeclaration")} className="btn btn-sm btn-outline-danger">
                  <i class="bi bi-x-lg"></i>
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
      <Button onClick={handleSubmit} 
                        disabled={freezeFlag}
                        color="primary">
        Submit Changes
      </Button>
      {
       declarationFlag||freezeFlag? (
        <button disabled={freezeFlag} onClick={FreezeBooklet} className="btn btn-danger">{freezeFlag?
          "Frozen" : "Freeze"}</button>
            ) : (
              null
            )
            }
            </div>
    </div>
  );
};

export default PDF;
