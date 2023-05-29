import { useState, useEffect, useRef } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { Block } from "../../components/block/Block";
import axios from "axios";
import FormData from "form-data";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backendURL } from "../../backendurl";

const MINORITY = {
  CHRISTIAN: 0.5,
  HINDI: 0.5,
  JAIN: 0.5,
  MALAYALAM: 0.5,
  "MALAYALAM LINGUISTIC": 0.5,
  MIN: 0.5,
  MUSLIM: 0.5,
  SOWRASHTRA: 0.5,
  TELUGU: 0.5,
};

const FormFour = ({ toggleIconTab, updateCollegeInfo, Data, alter }) => {
  const [seatMatrix, setSeatMatrix] = useState("");
  const [AICTEApproval, setAICTEApproval] = useState("");
  const [AUAffiliation, setAUAffiliation] = useState("");
  const [Accredation, setAccredation] = useState("");
  const [Autonomous, setAutonomous] = useState("");
  const [Minority, setMinority] = useState("");
  const [collegeData, setcollegeData] = useState({});
  const [signedUrls, setSignedUrls] = useState({});
  const [freezeFlag, setfreezeFlag] = useState(false);
  const [MinorityFlag, setMinorityFlag] = useState(false);

  const [show, setShow] = useState(false);

  const [tooltipDownload, setTooltipDownload] = useState(false);
  const toggleDownload = () => setTooltipDownload(!tooltipDownload);

  const [tooltipUpload, setTooltipUpload] = useState(false);
  const toggleUpload = () => setTooltipUpload(!tooltipUpload);

  const handleSubmit = async () => {
    try {
      var formData = new FormData();
      if (typeof collegeData?.Documents === "undefined" || collegeData?.Documents["seatMatrix"] != true) {
      
        if (typeof seatMatrix == "undefined" || seatMatrix == "") {
          toast.warning("Seat matrix form is compulsory");
          return;
        } else {
          formData.append("seatMatrix", seatMatrix);
        }
      } else {
        formData.append("seatMatrix", seatMatrix);
      }
      if (MinorityFlag) {
        if (typeof collegeData?.Documents === "undefined" || collegeData?.Documents["Minority"] != true) {
          if (typeof Minority == "undefined" || Minority == "") {
            toast.warning("Minority document is compulsory");
            return;
          } else {
            formData.append("Minority", Minority);
          }
        } else {
          formData.append("Minority", Minority);
        }
      }
      if (AICTEApproval?.length == undefined) {
        formData.append("AICTEApproval", AICTEApproval);
      }
      if (AUAffiliation?.length == undefined) {
        formData.append("AUAffiliation", AUAffiliation);
      }
      if (Accredation?.length == undefined) {
        formData.append("Accredation", Accredation);
      }
      if (Autonomous?.length == undefined) {
        formData.append("Autonomous", Autonomous);
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
          setSeatMatrix();
          inputseatMatrix.current.value = "";
          setAICTEApproval();
          inputAICTEApproval.current.value = "";
          setAUAffiliation();
          inputAUAffiliation.current.value = "";
          setAccredation();
          inputAccredation.current.value = "";
          setAutonomous();
          inputAutonomous.current.value = "";
          setMinority();
          inputMinority.current.value = "";
          getCollegeData();
          getDocUrls();
          toast.success("Files added successfully");
        }
      } else {
        toast.warning("Select atleast one field");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCollegeData = async () => {
    const data = await axios.get(`${backendURL}/collegeData`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    setcollegeData(data.data);
    setMinorityFlag(data.data.Category in MINORITY ? true : false);
    setfreezeFlag(data?.data?.Phase2Freeze ? data.data.Phase2Freeze : false);
  };
  const getDocUrls = async () => {
    const url = await axios.get(`${backendURL}/documents`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    setSignedUrls(url.data);
  };

  useEffect(() => {
    getDocUrls();
  }, [Data]);

  useEffect(() => {
    getCollegeData();
  }, [Data]);

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

  const inputseatMatrix = useRef(null);
  const inputAICTEApproval = useRef(null);
  const inputAUAffiliation = useRef(null);
  const inputAccredation = useRef(null);
  const inputAutonomous = useRef(null);
  const inputMinority = useRef(null);

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
      getCollegeData();
      toast.success("Document deleted");
    } else {
      toast.error("An error occured, please try again");
    }
  };

  const handleFreezeSubmit = async () => {
    try {
      fetch(`${backendURL}/Phase2Freeze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.status) {
            toast.success("Freezed successfully");
            handleClose();
          } else {
            toast.error("Something went wrong please try again");
            handleClose();
          }
        });
    } catch (error) {
      console.log(error);
      toast(error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  return (
    <Block size="lg" className="container-fluid align-items-center justify-content-center">
      <Modal isOpen={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <ModalBody>
          <h4>Warning</h4>
          <p>
            Are you sure you want to submit the form?
            <br />
            This action is irreversible
          </p>
        </ModalBody>
        <ModalFooter style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <Button outline color="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button color="success" onClick={handleFreezeSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
      <div className="table-responsive">
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
                Seat Matrix Declaration <span style={{ color: "red" }}>*</span>
              </td>
              <td>
                {collegeData?.Documents?.seatMatrix == true ? (
                  <GenerateButtons type={"seatMatrix"} />
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
                      {collegeData?.Documents?.seatMatrix == true ? (
                        <button
                          style={{ marginRight: "5px" }}
                          class="btn btn-sm btn-outline-dark"
                          onClick={() => inputseatMatrix.current.click()}
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          style={{ marginRight: "5px" }}
                          class="btn btn-sm btn-outline-dark"
                          onClick={() => inputseatMatrix.current.click()}
                        >
                          Add
                        </button>
                      )}

                      {seatMatrix && (
                        <button
                          class="btn btn-sm btn-outline-dark"
                          onClick={() => {
                            inputseatMatrix.current.value = "";
                            setSeatMatrix();
                          }}
                        >
                          Remove
                        </button>
                      )}
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          if (e.target.files[0].size > 1048576) {
                            inputseatMatrix.current.value = "";
                            setSeatMatrix();
                            toast.warning("File size must not exceed 1MB", { autoClose: 3000 });
                            return;
                          }
                          setSeatMatrix(e.target.files[0]);
                        }}
                        ref={inputseatMatrix}
                      />
                    </div>
                  )}
                </div>
              </td>
              <td>
                {/* {freezeFlag ? (
                  <span></span>
                ) : (
                  collegeData?.Documents?.seatMatrix == true && (
                    <button onClick={() => handleDocDelete("seatMatrix")} className="btn btn-sm btn-outline-danger">
                      <i class="bi bi-x-lg"></i>
                    </button>
                  )
                )} */}
              </td>
            </tr>

            <tr>
              <th scope="row">2</th>
              <td>AICTE Approval</td>
              <td>
                {collegeData?.Documents?.AICTEApproval == true ? (
                  <GenerateButtons type={"AICTEApproval"} />
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
                      {collegeData?.Documents?.AICTEApproval == true ? (
                        <button
                          style={{ marginRight: "5px" }}
                          class="btn btn-sm btn-outline-dark"
                          onClick={() => inputAICTEApproval.current.click()}
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          style={{ marginRight: "5px" }}
                          class="btn btn-sm btn-outline-dark"
                          onClick={() => inputAICTEApproval.current.click()}
                        >
                          Add
                        </button>
                      )}

                      {AICTEApproval && (
                        <button
                          class="btn btn-sm btn-outline-dark"
                          onClick={() => {
                            inputAICTEApproval.current.value = "";
                            setAICTEApproval();
                          }}
                        >
                          Remove
                        </button>
                      )}
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          if (e.target.files[0].size > 1048576) {
                            inputAICTEApproval.current.value = "";
                            setAICTEApproval();
                            toast.warning("File size must not exceed 1MB");
                            return;
                          }
                          setAICTEApproval(e.target.files[0]);
                        }}
                        ref={inputAICTEApproval}
                      />
                    </div>
                  )}
                </div>
              </td>
              <td>
                {freezeFlag ? (
                  <span></span>
                ) : (
                  collegeData?.Documents?.AICTEApproval == true && (
                    <button onClick={() => handleDocDelete("AICTEApproval")} className="btn btn-sm btn-outline-danger">
                      <i class="bi bi-x-lg"></i>
                    </button>
                  )
                )}
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Anna University Affiliation</td>
              <td>
                {collegeData?.Documents?.AUAffiliation == true ? (
                  <GenerateButtons type={"AUAffiliation"} />
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
                      {collegeData?.Documents?.AUAffiliation == true ? (
                        <button
                          style={{ marginRight: "5px" }}
                          class="btn btn-sm btn-outline-dark"
                          onClick={() => inputAUAffiliation.current.click()}
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          style={{ marginRight: "5px" }}
                          class="btn btn-sm btn-outline-dark"
                          onClick={() => inputAUAffiliation.current.click()}
                        >
                          Add
                        </button>
                      )}

                      {AUAffiliation && (
                        <button
                          class="btn btn-sm btn-outline-dark"
                          onClick={() => {
                            inputAUAffiliation.current.value = "";
                            setAUAffiliation();
                          }}
                        >
                          Remove
                        </button>
                      )}
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          if (e.target.files[0].size > 1048576) {
                            inputAUAffiliation.current.value = "";
                            setAUAffiliation();
                            toast.warning("File size must not exceed 1MB");
                            return;
                          }
                          setAUAffiliation(e.target.files[0]);
                        }}
                        ref={inputAUAffiliation}
                      />
                    </div>
                  )}
                </div>
              </td>
              <td>
                {freezeFlag ? (
                  <span></span>
                ) : (
                  collegeData?.Documents?.AUAffiliation == true && (
                    <button onClick={() => handleDocDelete("AUAffiliation")} className="btn btn-sm btn-outline-danger">
                      <i class="bi bi-x-lg"></i>
                    </button>
                  )
                )}
              </td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Accredation</td>
              <td>
                {collegeData?.Documents?.Accredation == true ? (
                  <GenerateButtons type={"Accredation"} />
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
                      {collegeData?.Documents?.Accredation == true ? (
                        <button
                          style={{ marginRight: "5px" }}
                          class="btn btn-sm btn-outline-dark"
                          onClick={() => inputAccredation.current.click()}
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          style={{ marginRight: "5px" }}
                          class="btn btn-sm btn-outline-dark"
                          onClick={() => inputAccredation.current.click()}
                        >
                          Add
                        </button>
                      )}

                      {Accredation && (
                        <button
                          class="btn btn-sm btn-outline-dark"
                          onClick={() => {
                            inputAccredation.current.value = "";
                            setAccredation();
                          }}
                        >
                          Remove
                        </button>
                      )}
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          if (e.target.files[0].size > 1048576) {
                            inputAccredation.current.value = "";
                            setAccredation();
                            toast.warning("File size must not exceed 1MB");
                            return;
                          }
                          setAccredation(e.target.files[0]);
                        }}
                        ref={inputAccredation}
                      />
                    </div>
                  )}
                </div>
              </td>
              <td>
                {freezeFlag ? (
                  <span></span>
                ) : (
                  collegeData?.Documents?.Accredation == true && (
                    <button onClick={() => handleDocDelete("Accredation")} className="btn btn-sm btn-outline-danger">
                      <i class="bi bi-x-lg"></i>
                    </button>
                  )
                )}
              </td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Autonomous Certification</td>
              <td>
                {collegeData?.Documents?.Autonomous == true ? (
                  <GenerateButtons type={"Autonomous"} />
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
                      {collegeData?.Documents?.Autonomous == true ? (
                        <button
                          style={{ marginRight: "5px" }}
                          class="btn btn-sm btn-outline-dark"
                          onClick={() => inputAutonomous.current.click()}
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          style={{ marginRight: "5px" }}
                          class="btn btn-sm btn-outline-dark"
                          onClick={() => inputAutonomous.current.click()}
                        >
                          Add
                        </button>
                      )}

                      {Autonomous && (
                        <button
                          class="btn btn-sm btn-outline-dark"
                          onClick={() => {
                            inputAutonomous.current.value = "";
                            setAutonomous();
                          }}
                        >
                          Remove
                        </button>
                      )}
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          if (e.target.files[0].size > 1048576) {
                            inputAutonomous.current.value = "";
                            setAutonomous();
                            toast.warning("File size must not exceed 1MB");
                            return;
                          }
                          setAutonomous(e.target.files[0]);
                        }}
                        ref={inputAutonomous}
                      />
                    </div>
                  )}
                </div>
              </td>
              <td>
                {freezeFlag ? (
                  <span></span>
                ) : (
                  collegeData?.Documents?.Autonomous == true && (
                    <button onClick={() => handleDocDelete("Autonomous")} className="btn btn-sm btn-outline-danger">
                      <i class="bi bi-x-lg"></i>
                    </button>
                  )
                )}
              </td>
            </tr>
            {MinorityFlag && (
              <tr>
                <th scope="row">6</th>
                <td>
                  Minority Certification <span style={{ color: "red" }}>*</span>
                </td>
                <td>
                  {collegeData?.Documents?.Minority == true ? (
                    <GenerateButtons type={"Autonomous"} />
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
                        {collegeData?.Documents?.Minority == true ? (
                          <button
                            style={{ marginRight: "5px" }}
                            class="btn btn-sm btn-outline-dark"
                            onClick={() => inputMinority.current.click()}
                          >
                            Update
                          </button>
                        ) : (
                          <button
                            style={{ marginRight: "5px" }}
                            class="btn btn-sm btn-outline-dark"
                            onClick={() => inputMinority.current.click()}
                          >
                            Add
                          </button>
                        )}

                        {Minority && (
                          <button
                            class="btn btn-sm btn-outline-dark"
                            onClick={() => {
                              inputMinority.current.value = "";
                              setMinority();
                            }}
                          >
                            Remove
                          </button>
                        )}
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => {
                            if (e.target.files[0].size > 1048576) {
                              inputMinority.current.value = "";
                              setMinority();
                              toast.warning("File size must not exceed 1MB");
                              return;
                            }
                            setMinority(e.target.files[0]);
                          }}
                          ref={inputMinority}
                        />
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  {/* {freezeFlag ? (
                    <span></span>
                  ) : (
                    collegeData?.Documents?.Minority == true && (
                      <button onClick={() => handleDocDelete("Minority")} className="btn btn-sm btn-outline-danger">
                        <i class="bi bi-x-lg"></i>
                      </button>
                    )
                  )} */}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Button
        type="submit"
        onClick={() => {
          toggleIconTab("7");
        }}
        className="text-center m-4"
        color="danger"
      >
        &lt; Back
      </Button>

      {freezeFlag == false && (
        <Button onClick={handleSubmit} color="primary">
          Submit Changes
        </Button>
      )}
      <div
        style={{
          marginTop: "50px",
          width: "100%",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <button
          onClick={handleShow}
          disabled={freezeFlag}
          style={{ width: "300px", height: "50px", justifyContent: "center" }}
          className="btn btn-danger"
        >
          Freeze
        </button>
      </div>
      <div>
        <span style={{ color: "red" }}>*Important: </span>Click freeze button once you are done with all the changes,
        this action is irreversible.
      </div>
    </Block>
  );
};
export default FormFour;
