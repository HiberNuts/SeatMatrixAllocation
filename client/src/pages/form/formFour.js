import { useState } from "react";
import { Button, Row, Col } from "reactstrap";
import { Block, BlockHead, BlockHeadContent, BlockTitle, BlockDes, BackTo } from "../../components/block/Block";
import { PreviewCard } from "../../components/preview/Preview";
const FormFour = () => {
  const [seatMatrix, setSeatMatrix] = useState("");
  const [AICTEApproval, setAICTEApproval] = useState("");
  const [AUAffiliation, setAUAffiliation] = useState("");
  const [Accredation, setAccredation] = useState("");
  const [Autonomous , setAutonomous ] = useState("");
  return (
    <Block size="lg" className="container-fluid align-items-center justify-content-center">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Details</th>
            <th scope="col">PDF Upload</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Seat Matrix Declaration</td>
            <td>
              <div className="form-control-wrap">
                <div className="form-file">
                  <input id="seatMatrix"
                   onChange={(e) =>  setSeatMatrix(e.target.files[0])}
                   type="file" accept=".pdf" className="form-control" />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>AICTE Approval</td>
            <td>
              <div className="form-control-wrap">
                <div className="form-file">
                  <input id="AICTE"
                   onChange={(e) => setAICTEApproval(e.target.files[0])}
                   type="file" accept=".pdf" className="form-control" />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Anna University Affiliation</td>
            <td>
              <div className="form-control-wrap">
                <div className="form-file">
                  <input id="AUAffiliation" type="file" accept=".pdf"
                   onChange={(e) => setAUAffiliation(e.target.files[0])}
                   className="form-control" />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Accredation</td>
            <td>
              <div className="form-control-wrap">
                <div className="form-file">
                  <input id="Accredation"
                   onChange={(e) => setAccredation(e.target.files[0])}
                   type="file" accept=".pdf" className="form-control" />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Autonomous Certification</td>
            <td>
              <div className="form-control-wrap">
                <div className="form-file">
                  <input id="autonomous" 
                  onChange={(e) => setAutonomous(e.target.files[0])}
                  type="file" accept=".pdf" className="form-control" />
                </div>
              </div>
            </td>
          </tr>
       
        </tbody>
      </table>
      <Button color="primary"> Submit </Button>
    </Block>
  );
};
export default FormFour;
