import React, { useState, useEffect } from "react";
import { Row, Col, Label, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Component";
import classNames from "classnames";
import { RSelect } from "../../components/Component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormOne = ({ alter, id }) => {
  const { errors, register, handleSubmit } = useForm();
  const [collegeName, setcollegeName] = useState("");
  const [collegeCode, setcollegeCode] = useState("");
  const [collegeCategory, setcollegeCategory] = useState("GOVT");
  const [data, setdata] = useState([]);
  const [personalDetailFlag, setpersonalDetailFlag] = useState(false);
  const [collegeType, setCollegeType] = useState("");
  const [principalName, setprincipalName] = useState("");
  const [email, setEmail] = useState("");
  const [editFlag, seteditFlag] = useState(false);

  const onFormSubmit = (data) => {
    console.log(data.principalName);
    console.log(data.email);
    fetch("http://localhost:5555/personalDetail", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        PrincipalName: data.principalName,
        Email: data.email,
      }),
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
          console.log("s");
          const notify = () => {
            toast("Data added successfully");
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
    fetch("http://localhost:5555/collegeData", {
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
        console.log(data);
        setcollegeName(data.can);
        setcollegeCode(data.ccode);
        setCollegeType(data.Category);
        setpersonalDetailFlag(data.PersonalDetailFlag);
        setprincipalName(data.PrincipalName);
        setEmail(data.Email);
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

  const collegeCategoryOptions = [
    { value: "GOVT", label: "Government College" },
    { value: "UNI", label: "University" },
    { value: "SF", label: "Self Financed" },
    { value: "MIN", label: "Minority" },
    { value: "NMIN", label: "Non Minority" },
  ];
  const collegeCategoryMap = {
    GOVT: "Government College",
    UNI: "University",
    SF: "Self Financed",
    MIN: "Minority",
    NMIN: "Non Minority",
  };

  return (
    <React.Fragment>
      <ToastContainer />
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
                  value={collegeCode}
                />
                {errors.CollegeCode && <span className="invalid">This field is required</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              {/* <Label className="form-label" htmlFor="fv-topics">
                College Type
              </Label>
              {console.log(collegeCategory)}
              <RSelect
                disabled
                value={{ value: collegeType, label: collegeCategoryMap[collegeType] }}
                options={collegeCategoryOptions}
              /> */}
              <Label className="form-label" htmlFor="fv-subject">
                College Type
              </Label>

              <input
                ref={register({ required: true })}
                type="text"
                id="fv-full-code"
                name="CollegeType"
                className="form-control"
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
                  className="form-control"
                  onChange={(e) => (editFlag ? setEmail(e.target.value) : null)}
                  value={email}
                />
                {errors.email && errors.email.type === "required" && <span className="invalid">This is required</span>}
                {errors.email && errors.email.type === "pattern" && (
                  <span className="invalid">{errors.email.message}</span>
                )}
              </div>
            </div>
          </Col>
          <Col md="12">
            <div className="form-group">
              {!personalDetailFlag && editFlag == false && (
                <Button type="submit" color="primary" size="lg">
                  Submit
                </Button>
              )}
              {editFlag == true && (
                <Button type="submit" onClick={handleSubmit((data) => updateHandler(data))} color="warning" size="lg">
                  Update
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Form>
      {personalDetailFlag && !editFlag && (
        <Button onClick={() => seteditFlag(true)} color="danger" size="lg">
          Edit
        </Button>
      )}
    </React.Fragment>
  );
};
export default FormOne;
