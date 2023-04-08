import { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { Block } from "../../components/block/Block";
import axios from "axios";
import FormData from "form-data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backendURL } from "../../backendurl";
const FormFour = () => {
  const [seatMatrix, setSeatMatrix] = useState("");
  const [AICTEApproval, setAICTEApproval] = useState("");
  const [AUAffiliation, setAUAffiliation] = useState("");
  const [Accredation, setAccredation] = useState("");
  const [Autonomous, setAutonomous] = useState("");
  const [collegeData, setcollegeData] = useState({});
  const [signedUrls, setSignedUrls] = useState({});

  const [tooltipDownload, setTooltipDownload] = useState(false);
  const toggleDownload = () => setTooltipDownload(!tooltipDownload);

  const [tooltipUpload, setTooltipUpload] = useState(false);
  const toggleUpload = () => setTooltipUpload(!tooltipUpload);

  const handleSubmit = async () => {
    try {
      var formData = new FormData();
      if (seatMatrix) {
        formData.append("seatMatrix", seatMatrix);
      }
      if (AICTEApproval) {
        formData.append("AICTEApproval", AICTEApproval);
      }
      if (AUAffiliation) {
        formData.append("AUAffiliation", AUAffiliation);
      }
      if (Accredation) {
        formData.append("Accredation", Accredation);
      }
      if (Autonomous) {
        formData.append("Autonomous", Autonomous);
      }
      const res = await axios.post(`${backendURL}/DocUpload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.data.status) {
        const notify = () => {
          toast("Data added successfully");
        };
        notify();
        setSeatMatrix({});
        setAICTEApproval({});
        setAUAffiliation({});
        setAccredation({});
        setAutonomous({});
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
    getCollegeData();
    getDocUrls();
  }, []);

  const GenerateButtons = ({ type }) => {
    return (
      <a class="btn btn-success" style={{ textDecoration: "none" }} href={signedUrls[`${type}.pdf`]} target="_blank">
        <i style={{ fontSize: "20px", fontWeight: "bold" }} class="bi bi-download"></i> {/* </Button> */}
      </a>
    );
  };

  return (
    <Block size="lg" className="container-fluid align-items-center justify-content-center">
      <ToastContainer />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Details</th>
            <th scope="col">PDF Download</th>
            <th scope="col">PDF Upload</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Seat Matrix Declaration</td>
            <td>
              {collegeData?.Documents?.seatMatrix == true ? (
                <GenerateButtons type={"seatMatrix"} />
              ) : (
                <div>Upload first</div>
              )}
            </td>
            <td>
              <div className="form-control-wrap">
                <div className="form-file">
                  <input
                    id="seatMatrix"
                    onChange={(e) => setSeatMatrix(e.target.files[0])}
                    type="file"
                    accept=".pdf"
                    name="file"
                    className="form-control"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>AICTE Approval</td>
            <td>
              {collegeData?.Documents?.AICTEApproval == true ? (
                <GenerateButtons type={"AICTEApproval"} />
              ) : (
                <div>Upload first</div>
              )}
            </td>
            <td>
              <div className="form-control-wrap">
                <div className="form-file">
                  <input
                    id="AICTE"
                    onChange={(e) => setAICTEApproval(e.target.files[0])}
                    type="file"
                    accept=".pdf"
                    className="form-control"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Anna University Affiliation</td>
            <td>
              {collegeData?.Documents?.AUAffiliation == true ? (
                <GenerateButtons type={"AUAffiliation"} />
              ) : (
                <div>Upload first</div>
              )}
            </td>
            <td>
              <div className="form-control-wrap">
                <div className="form-file">
                  <input
                    id="AUAffiliation"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setAUAffiliation(e.target.files[0])}
                    className="form-control"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Accredation</td>
            <td>
              {collegeData?.Documents?.Accredation == true ? (
                <GenerateButtons type={"Accredation"} />
              ) : (
                <div>Upload first</div>
              )}
            </td>
            <td>
              <div className="form-control-wrap">
                <div className="form-file">
                  <input
                    id="Accredation"
                    onChange={(e) => setAccredation(e.target.files[0])}
                    type="file"
                    accept=".pdf"
                    className="form-control"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Autonomous Certification</td>
            <td>
              {collegeData?.Documents?.Autonomous == true ? (
                <GenerateButtons type={"Autonomous"} />
              ) : (
                <div>Upload first</div>
              )}
            </td>
            <td>
              <div className="form-control-wrap">
                <div className="form-file">
                  <input
                    id="Autonomous"
                    onChange={(e) => setAutonomous(e.target.files[0])}
                    type="file"
                    accept=".pdf"
                    className="form-control"
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <Button onClick={handleSubmit} color="primary">
        {" "}
        Submit{" "}
      </Button>
    </Block>
  );
};
export default FormFour;
