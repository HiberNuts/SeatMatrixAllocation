import React, { useState, useEffect } from "react";
import { Row, Col, Label, Form, Spinner } from "reactstrap";
import Select from "react-select";
import { backendURL } from "../../backendurl";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Component";
import classNames from "classnames";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PersonalDetails = ({alter,Data,toggleIconTab,updateCollegeInfo }) => {
  const [loading, setLoading] = useState(true);
  const { errors, register, handleSubmit } = useForm();
  const [collegeName, setcollegeName] = useState("");
  const [collegeCode, setcollegeCode] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [taluk, setTaluk] = useState("");
  const [NACC, setNACC] = useState("");
  const [NACCbool, setNACCBool] = useState(false);
  const [NACCValid, setNACCValid] = useState("");
  const [NACCGrade, setNACCGrade] = useState("");
  const [Autonomous, setAutonomous] = useState("");
  const [minorityStatus, setMinorityStatus] = useState("");
  const [principalName, setprincipalName] = useState("");
  const [email, setEmail] = useState("");
  const [editFlag, seteditFlag] = useState(false);
  const [frozen,setFrozen]=useState(false);

  const AutonomousOptions = [
    { label: "Autonomous", value: true },
    { label: "Non Autonomous", value: false },
  ];
  const NACCOptions = [
    { label: "YES", value: true },
    { label: "NO", value: false },
  ];
  const onFormSubmit = (data) => {
   
    if (editFlag) {
      fetch(`${backendURL}/bookletData`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          Booklet: {
            PrincipalName: data.principalName,
            Email: data.email,
            PhoneNumber: phone,
            Pincode: data.pincode,
            District: data.district,
            Website: data.website,
            Taluk: data.taluk,
            Autonomous: Autonomous.value,
            NACC: {
              Status: NACC.value,
              ValidUpto: data.NACCValid,
              Grade: data.NACCGrade
            },
            Address: data.address
          }
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
                toastId: "personal",
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: false,
              });
            };
            notify();
            updateCollegeInfo();
            seteditFlag(false)
          }
        })
        .catch((error) => {
          console.log(error);
        });

    }
    else {
      seteditFlag(true);
    }

  };
  const formClass = classNames({
    "form-validate": false,
    "is-alter": alter,
  });

  const getCollegeInfo = async (data) => {
  
        setLoading(false);
        setcollegeName(data.can);
        setcollegeCode(data.ccode);
        if (["NM", "CENTRAL GOVT", "GOVT", "GOVT AIDED", "UNIV"].includes(data?.Category))
          setMinorityStatus("No");
        else
          setMinorityStatus("Yes");
        if (data.Booklet) {
          setFrozen(data.Booklet.Frozen?true:false);
          data = data.Booklet.Personal;
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
        else {
          seteditFlag(true);
        }
      
  };

  useEffect(() => {
  
    getCollegeInfo(Data);
  }, []);

  const updateHandler = (data) => {
    seteditFlag(false);
    onFormSubmit(data);
  };

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
                    ref={register({ required: true })}
                    type="text"
                    id="fv-full-name"
                    name="CollegeName"
                    className="form-control"
                    value={collegeName}
                    disabled
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
                    disabled
                    value={collegeCode}
                  />
                  {errors.CollegeCode && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="form-group">
                <Label className="form-label" htmlFor="fv-subject">
                  MINORITY Status
                </Label>
                <input
                  ref={register({ required: true })}
                  type="text"
                  id="fv-full-code"
                  name="CollegeType"
                  className="form-control"
                  disabled
                  value={minorityStatus}
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
                    disabled={frozen}
                    ref={register({ required: true })}
                    type="text"
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
                    disabled={frozen}
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
                  Phone Number/Fax
                </Label>
                <div className="form-control-wrap">
                  <input
                    disabled={frozen}
                    type="number"
                    id="fv-phone"
                    name="phone"
                    className="form-control"
                    ref={register({
                      required: true,
                      pattern: {
                        value: /^[0-9]{10}$/i,
                        message: "Invalid Phone Number",
                      },
                    })}
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
                <Label className="form-label" htmlFor="fv-address">
                  Address
                </Label>
                <div className="form-control-wrap">
                  <textarea
                    ref={register({
                      required: true,
                    })}
                    disabled={frozen}
                    type="text"
                    id="fv-address"
                    name="address"
                    className="form-control"
                    onChange={(e) => (editFlag ? setAddress(e.target.value) : null)}
                    value={address}
                  />
                  {errors.address && errors.address.type === "required" && (
                    <span className="invalid">This is required</span>
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
                    disabled={frozen}
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
                <Label className="form-label" htmlFor="fv-taluk">
                  Taluk
                </Label>
                <div className="form-control-wrap">
                  <input
                    disabled={frozen}
                    ref={register({
                      required: true,
                      pattern: {
                        value: /^[A-Za-z]*$/i,
                        message: "Invalid taluk Name",
                      },
                    })}
                    type="text"
                    id="fv-taluk"
                    name="taluk"
                    className="form-control"
                    onChange={(e) => (editFlag ? setTaluk(e.target.value) : null)}
                    value={taluk}
                  />
                  {errors.taluk && errors.taluk.type === "required" && (
                    <span className="invalid">This is required</span>
                  )}
                  {errors.taluk && errors.taluk.type === "pattern" && (
                    <span className="invalid">{errors.taluk.message}</span>
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
                    disabled={frozen}
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
                    disabled={frozen}
                    type="text"
                    id="fv-website"
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

                <div className="form-control-select" style={{ width: "400px" }}>
                  <Select
                    id="autonomous"
                    name="autonomous"
                    isDisabled={!editFlag||frozen}
                    classNamePrefix="react-select"
                    onChange={(e) => (editFlag ? setAutonomous(e) : null)}
                    options={AutonomousOptions}
                    value={Autonomous}
                  />
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="form-group">
                <Label className="form-label" htmlFor="fv-NACC">
                  NACC Status
                </Label>

                <div className="form-control-select" style={{ width: "400px" }}>
                  <Select
                    isDisabled={!editFlag||frozen}
                    id="nacc"
                    name="nacc"
                    classNamePrefix="react-select"
                    onChange={(e) => {
                      editFlag ? setNACC(e) : null;
                      editFlag ? setNACCBool(e.value) : null;
                    }}
                    options={NACCOptions}
                    value={NACC}
                  />
                </div>
              </div>
            </Col>
            <Col hidden={!NACCbool} md="6">
              <div className="form-group">
                <Label className="form-label" htmlFor="fv-NACC-grade">
                  NACC Grade
                </Label>
                <div className="form-control-wrap">
                  <input
                    disabled={frozen}
                    ref={register({
                      required: NACCbool,
                    })}
                    type="text"
                    id="fv-grade"
                    name="grade"
                    className="form-control"
                    onChange={(e) => (editFlag ? setNACCGrade(e.target.value) : null)}
                    value={NACCGrade}

                  />
                  {errors.grade && errors.grade.type === "required" && (
                    <span className="invalid">This is required</span>
                  )}
                </div>
              </div>
            </Col>
            <Col hidden={!NACCbool} md="6">
              <div className="form-group">
                <Label className="form-label" htmlFor="fv-NACC-valid">
                  NACC Valid Upto
                </Label>
                <div className="form-control-wrap">
                  <input
                    disabled={frozen}
                    ref={register({
                      required: NACCbool,
                    })}
                    type="text"
                    id="fv-valid"
                    name="valid"
                    className="form-control"
                    onChange={(e) => (editFlag ? setNACCValid(e.target.value) : null)}
                    value={NACCValid}
                  />
                  {errors.valid && errors.valid.type === "required" && (
                    <span className="invalid">This is required</span>
                  )}
                </div>
              </div>
            </Col>

          </Row>

          <div className="pt-5 d-flex justify-content-between">
            <Button
              name="submit"
              disabled={frozen}
              type="submit"
              color={editFlag ? "warning" : "primary"}
              size="lg"
            >
              {editFlag ? "Save" : "Edit"}

            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                toggleIconTab("Bank");
              }}
              disabled={editFlag==true || !Data.Booklet?.PersonalDetailFlag}
              color="success"
              size="lg"
            >
              Next &gt;
            </Button>
          </div>
        </Form>
      
      </React.Fragment >
    );
};
export default PersonalDetails;
