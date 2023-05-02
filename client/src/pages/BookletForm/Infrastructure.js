import React, { useState, useEffect } from "react";
import { Row, Col, Label, Form, Spinner } from "reactstrap";
import Select from "react-select";
import { backendURL } from "../../backendurl";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Component";
import classNames from "classnames";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Infrastructure = ({ alter, toggleIconTab }) => {
  const [loading, setLoading] = useState(true);
  const { errors, register, handleSubmit } = useForm();
  const [editFlag, seteditFlag] = useState(true);
  const [DHQ, setDHQ] = useState("");
  const [DRS, setDRS] = useState("");
  const [railway, setRailway] = useState("");


  const HostelType = [
    { label: "Permanent", value: "Permanent" },
    { label: "Rental", value: "Rental" },
  ];
  const MessType = [
    { label: "Veg", value: "Veg" },
    { label: "Non Veg", value: "Non Veg" },
    { label: "Both", value: "Both" },

  ];
  const BooleanOption = [
    { label: "YES", value: true },
    { label: "NO", value: false },
  ];
  const onFormSubmit = (data) => {
    console.log("Here Data", data);
    fetch(`${backendURL}/bookletInfrastructre`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(
        {
          Infra:
          {
            hqDistance: DHQ,
            railway: railway,
            railwayDistance: DRS
          }
        }
      ),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status) {

          const notify = () => {
            toast.success("Data added successfully", {
              position: "bottom-right",
              autoClose: true,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: false,
            });
          };

          notify();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const formClass = classNames({
    "form-validate": false,
    "is-alter": alter,
  });

  const getCollegeInfo = async () => {
    fetch(`${backendURL}/collegeData`, {
      headers: {
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

        setLoading(false);
        setcollegeName(data.can);
        setcollegeCode(data.ccode);
        if (["NM", "CENTRAL GOVT", "GOVT", "GOVT AIDED", "UNIV"].includes(data?.Category))
          setMinorityStatus("No");
        else
          setMinorityStatus("Yes");
        data = data.Booklet.Personal;
        if (data) {
          setprincipalName(data?.PrincipalName);
          setPhone(data?.PhoneNumber);
          setAutonomous(data.Autonomous ? AutonomousOptions[0] : AutonomousOptions[1]);
          if (data.NACC) {
            setNACC(data?.NACC.Status ? NACCOptions[0] : NACCOptions[1]);
            setNACCGrade(data?.NACC.Grade);
            setNACCValid(data?.NACC.ValidUpto);
          }
          setDistrict(data?.District);
          setWebsite(data?.Website);
          setPincode(data?.Pincode);
          setTaluk(data?.Taluk);
          setEmail(data?.Email);
          setAddress(data?.Address);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCollegeInfo();
  }, []);

  const updateHandler = (data) => {
    seteditFlag(false);
    onFormSubmit(data);
  };
  if (!loading)
    return (
      <React.Fragment>
        <Form className={formClass} onSubmit={handleSubmit((data) => onFormSubmit(data))}>
          <Row className="g-gs">
            <Col md="6">
              <div className="form-group">
                <Label className="form-label" htmlFor="fv-distanceHQ">
                  Distance from District Headquarters in KM
                </Label>
                <div className="form-control-wrap">
                  <input
                    ref={register({ required: true })}
                    type="number"
                    id="fv-distanceHQ"
                    name="distanceHQ"
                    className="form-control"
                    onChange={(e) => (editFlag ? setDHQ(e.target.value) : null)}
                    value={DHQ}
                  />
                  {errors.distanceHQ && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="form-group">
                <Label className="form-label" htmlFor="fv-RS">
                  Nearest Railway Station
                </Label>
                <div className="form-control-wrap">
                  <input
                    ref={register({
                      required: true,
                    })}
                    type="text"
                    id="fv-RS"
                    name="railway"
                    className="form-control"
                    onChange={(e) => (editFlag ? setRailway(e.target.value) : null)}
                    value={railway}
                  />
                  {errors.railway && errors.railway.type === "required" && (
                    <span className="invalid">This is required</span>
                  )}

                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="form-group">
                <Label className="form-label" htmlFor="fv-distanceRS">
                  Railway Station Distance in KM
                </Label>
                <div className="form-control-wrap">
                  <input
                    type="number"
                    id="fv-distanceRS"
                    name="distanceRS"
                    className="form-control"
                    onChange={(e) => (editFlag ? setDRS(e.target.value) : null)}
                    value={DRS}
                  />
                  {errors.distanceRS && errors.distanceRS.type === "required" && (
                    <span className="invalid">This is required</span>
                  )}

                </div>
              </div>
            </Col>
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th scope="col">Hostel Facilities</th>
                  <th scope="col">Boys</th>
                  <th scope="col">Girls</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Accomodation Available for UG
                  </td>
                  <td>
                    <div className="form-control-select">
                      <Select
                        value={BooleanOption[0]}
                        // onChange={(event) => handleAccrChange(event, index)}
                        classNamePrefix="react-select"
                        options={BooleanOption}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-control-select">
                      <Select
                        value={BooleanOption[0]}
                        // onChange={(event) => handleAccrChange(event, index)}
                        classNamePrefix="react-select"
                        options={BooleanOption}
                      />
                    </div>

                  </td>

                </tr>
                <tr>
                  <td>
                    Permanent / Rental
                  </td>
                  <td>
                    <div className="form-control-select">
                      <Select
                        value={HostelType[0]}
                        // onChange={(event) => handleAccrChange(event, index)}
                        classNamePrefix="react-select"
                        options={HostelType}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-control-select">
                      <Select
                        value={HostelType[0]}
                        // onChange={(event) => handleAccrChange(event, index)}
                        classNamePrefix="react-select"
                        options={HostelType}
                      />
                    </div>

                  </td>

                </tr>
                <tr>
                  <td>
                    Type of Mess [Veg/Non Veg/Both]
                  </td>
                  <td>
                    <div className="form-control-select">
                      <Select
                        value={MessType[0]}
                        // onChange={(event) => handleAccrChange(event, index)}
                        classNamePrefix="react-select"
                        options={MessType}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-control-select">
                      <Select
                        value={MessType[0]}
                        // onChange={(event) => handleAccrChange(event, index)}
                        classNamePrefix="react-select"
                        options={MessType}
                      />
                    </div>

                  </td>

                </tr>
              </tbody>
            </table>
          </Row>

          <div className="pt-5 d-flex justify-content-between">
            <Button
              name="submit"
              type="submit"
              color="warning"
              size="lg"
            >
              Save
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                toggleIconTab("Bank");
              }}
              color="success"
              size="lg"
            >
              Next &gt;
            </Button>
          </div>
        </Form>
        <ToastContainer />
      </React.Fragment >
    );
  else
    return (
      <div className="d-flex justify-content-center">
        <Spinner style={{ width: "5rem", height: "5rem" }} color="primary" />
      </div>
    );
};
export default Infrastructure;
