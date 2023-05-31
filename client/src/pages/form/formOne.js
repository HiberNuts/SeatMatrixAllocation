import React, { useState, useEffect } from "react";
import { Row, Col, Label, Form, Spinner } from "reactstrap";
import Select from "react-select";
import { backendURL } from "../../backendurl";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Component";
import classNames from "classnames";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PDFViewer } from "@react-pdf/renderer";
import PdfDcoument from "../../utils/PdfUtils/generatorPdf";
const FULLFORM = {
  "CENTRAL GOVT": "CENTRAL GOVERNMENT",
  CHRISTIAN: "CHRISTIAN",
  GOVT: "GOVERNMENT",
  "GOVT AIDED": "GOVERNMENT AIDED",
  HINDI: "HINDI",
  JAIN: "JAIN",
  MALAYALAM: "MALAYALAM",
  "MALAYALAM LINGUISTIC": "MALAYALAM LINGUISTIC",
  MIN: "MINORITY",
  MUSLIM: "MUSLIM",
  NM: "NON MINORITY",
  SOWRASHTRA: "SOWRASHTRA",
  TELUGU: "TELUGU",
  UNIV: "UNIVERSITY",
};
const FormOne = ({ alter, toggleIconTab, updateCollegeInfo, Data }) => {
  const [loading, setLoading] = useState(true);
  const { errors, register, handleSubmit } = useForm();
  const [collegeName, setcollegeName] = useState("");
  const [collegeCode, setcollegeCode] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [district, setDistrict] = useState("");
  const [website, setWebsite] = useState("");
  const [Autonomous, setAutonomous] = useState("");
  const [personalDetailFlag, setpersonalDetailFlag] = useState(false);
  const [collegeType, setCollegeType] = useState("");
  const [principalName, setprincipalName] = useState("");
  const [email, setEmail] = useState("");
  const [editFlag, seteditFlag] = useState(false);
  const [phase1Freeze, setphase1Freeze] = useState(false);

  const AutonomousOptions = [
    { label: "Autonomous", value: true },
    { label: "Non Autonomous", value: false },
  ];
  const onFormSubmit = (data) => {
    fetch(`${backendURL}/personalDetail`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        PrincipalName: data.principalName,
        Email: data.email,
        PhoneNumber: data.phone,
        Pincode: data.pincode,
        District: data.district,
        Website: data.website,
        Autonomous: Autonomous.value,
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
          updateCollegeInfo();
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
    const data = Data;

    setLoading(false);
    setcollegeName(data.can);
    setcollegeCode(data.ccode);
    setCollegeType(FULLFORM[data.Category]);
    setpersonalDetailFlag(data?.PersonalDetailFlag ? true : false);
    if (data?.PersonalDetailFlag == false || data?.PersonalDetailFlag == undefined) {
      seteditFlag(true);
    }
    setprincipalName(data?.PrincipalName);
    setPhone(data?.PhoneNumber);
    setAutonomous(data.Autonomous ? AutonomousOptions[0] : AutonomousOptions[1]);
    setDistrict(data?.District);
    setWebsite(data?.Website);
    setPincode(data?.Pincode);
    setEmail(data?.Email);
    setphase1Freeze(data?.Phase1Freeze ? data.Phase1Freeze : false);
  };

  useEffect(() => {
    getCollegeInfo();
    updateCollegeInfo();
    // if(personalDetailFlag==false){
    //   seteditFlag(true)
    // }
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
                <Label className="form-label" htmlFor="fv-full-name">
                  College Name
                </Label>
                <div className="form-control-wrap">
                  <input
                    disabled={!editFlag}
                    ref={register({ required: true })}
                    type="text"
                    id="fv-full-name"
                    name="CollegeName"
                    className="form-control"
                    value={collegeName}
                  />
                  {errors.CollegeName && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="form-group">
                <Label className="form-label" htmlFor="fv-full-name">
                  College Code
                </Label>
                <div className="form-control-wrap">
                  <input
                    ref={register({ required: true })}
                    type="text"
                    id="fv-full-code"
                    name="CollegeCode"
                    className="form-control"
                    disabled={!editFlag}
                    value={collegeCode}
                  />
                  {errors.CollegeCode && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="form-group">
                <Label className="form-label" htmlFor="fv-subject">
                  College Type
                </Label>
                <input
                  ref={register({ required: true })}
                  type="text"
                  id="fv-full-code"
                  name="CollegeType"
                  className="form-control"
                  disabled={!editFlag}
                  value={collegeType}
                />
              </div>
            </Col>
            <Col md="6">
              <div className="form-group">
                <Label className="form-label" htmlFor="fv-subject">
                  Principal Name
                </Label>
                <div className="form-control-wrap">
                  <input
                    ref={register({ required: true })}
                    type="text"
                    disabled={phase1Freeze}
                    id="fv-subject"
                    name="principalName"
                    className="form-control"
                    onChange={(e) => (editFlag ? setprincipalName(e.target.value) : null)}
                    value={principalName}
                  />
                  {errors.principalName && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="form-group">
                <Label className="form-label" htmlFor="fv-email">
                  Email address
                </Label>
                <div className="form-control-wrap">
                  <input
                    ref={register({
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    id="fv-email"
                    name="email"
                    disabled={phase1Freeze}
                    className="form-control"
                    onChange={(e) => (editFlag ? setEmail(e.target.value) : null)}
                    value={email}
                  />
                  {errors.email && errors.email.type === "required" && (
                    <span className="invalid">This is required</span>
                  )}
                  {errors.email && errors.email.type === "pattern" && (
                    <span className="invalid">{errors.email.message}</span>
                  )}
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="form-group">
                <Label className="form-label" htmlFor="fv-phone">
                  Phone Number
                </Label>
                <div className="form-control-wrap">
                  <input
                    ref={register({
                      required: true,
                      pattern: {
                        value: /^[0-9]{10}$/i,
                        message: "Invalid Phone Number",
                      },
                    })}
                    disabled={phase1Freeze}
                    type="phone"
                    id="fv-phone"
                    name="phone"
                    className="form-control"
                    onChange={(e) => (editFlag ? setPhone(e.target.value) : null)}
                    value={phone}
                  />
                  {errors.phone && errors.phone.type === "required" && (
                    <span className="invalid">This is required</span>
                  )}
                  {errors.phone && errors.phone.type === "pattern" && (
                    <span className="invalid">{errors.phone.message}</span>
                  )}
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="form-group">
                <Label className="form-label" htmlFor="fv-district">
                  District
                </Label>
                <div className="form-control-wrap">
                  <input
                    ref={register({
                      required: true,
                      pattern: {
                        value: /^[A-Za-z]*$/i,
                        message: "Invalid District Name",
                      },
                    })}
                    type="text"
                    id="fv-district"
                    name="district"
                    disabled={phase1Freeze}
                    className="form-control"
                    onChange={(e) => (editFlag ? setDistrict(e.target.value) : null)}
                    value={district}
                  />
                  {errors.district && errors.district.type === "required" && (
                    <span className="invalid">This is required</span>
                  )}
                  {errors.district && errors.district.type === "pattern" && (
                    <span className="invalid">{errors.district.message}</span>
                  )}
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="form-group">
                <Label className="form-label" htmlFor="fv-pincode">
                  Pincode
                </Label>
                <div className="form-control-wrap">
                  <input
                    ref={register({
                      required: true,
                      pattern: {
                        value: /^[0-9]{6}$/i,
                        message: "Invalid Pincode",
                      },
                    })}
                    type="text"
                    id="fv-pincode"
                    name="pincode"
                    disabled={phase1Freeze}
                    className="form-control"
                    onChange={(e) => (editFlag ? setPincode(e.target.value) : null)}
                    value={pincode}
                  />
                  {errors.pincode && errors.pincode.type === "required" && (
                    <span className="invalid">This is required</span>
                  )}
                  {errors.pincode && errors.pincode.type === "pattern" && (
                    <span className="invalid">{errors.pincode.message}</span>
                  )}
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="form-group">
                <Label className="form-label" htmlFor="fv-website">
                  Website
                </Label>
                <div className="form-control-wrap">
                  <input
                    ref={register({
                      required: true,
                    })}
                    type="text"
                    id="fv-website"
                    disabled={phase1Freeze}
                    name="website"
                    className="form-control"
                    onChange={(e) => (editFlag ? setWebsite(e.target.value) : null)}
                    value={website}
                  />
                  {errors.website && errors.website.type === "required" && (
                    <span className="invalid">This is required</span>
                  )}
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="form-group">
                <Label className="form-label" htmlFor="fv-website">
                  Autonomous Status
                </Label>

                <div className="form-control-select" style={{ width: "300px" }}>
                  <Select
                    id="autonomous"
                    name="autonomous"
                    disabled={phase1Freeze}
                    classNamePrefix="react-select"
                    onChange={(e) => (editFlag ? setAutonomous(e) : null)}
                    options={AutonomousOptions}
                    value={Autonomous}
                  />
                </div>
              </div>
            </Col>
            <Col md="12">
              <div className="form-group">
                {/* {!personalDetailFlag && editFlag === false && (
                  <Button type="submit" color="primary" size="lg">
                    Submit
                  </Button>
                )} */}
                {editFlag === true && (
                  <Button type="submit" onClick={handleSubmit((data) => updateHandler(data))} color="warning" size="lg">
                    Update
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Form>
        {phase1Freeze != true && personalDetailFlag && !editFlag && (
          <Button onClick={() => seteditFlag(true)} color="danger" size="lg">
            Edit
          </Button>
        )}

        <div className="d-flex justify-content-end">
          {personalDetailFlag && (
            <Button
              onClick={() => {
                toggleIconTab("10");
              }}
              type="submit"
              color="success"
              size="lg"
            >
              Next &gt;
            </Button>
          )}
        </div>
      </React.Fragment>
    );
  else
    return (
      <div className="d-flex justify-content-center">
        <Spinner style={{ width: "5rem", height: "5rem" }} color="primary" />
      </div>
    );
};
export default FormOne;
