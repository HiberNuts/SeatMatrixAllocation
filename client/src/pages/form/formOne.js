import React, { useState, useEffect } from "react";
import { Row, Col, Label, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Component";
import classNames from "classnames";
import { RSelect } from "../../components/Component";

const FormOne = ({ alter, id }) => {
  const { errors, register, handleSubmit } = useForm();
  const [collegeName, setcollegeName] = useState("");
  const [collegeCode, setcollegeCode] = useState("");
  const [collegeCategory, setcollegeCategory] = useState("GOVT");
  const [data, setdata] = useState([]);
  const [collegeType, setCollegeType] = useState("");
  const onFormSubmit = (data) => {
    console.log(data);
  };
  const formClass = classNames({
    "form-validate": false,
    "is-alter": alter,
  });

  const getCollegeInfo = async () => {
    fetch("https://seatmatrixallocationbackend.onrender.com/collegeData", {
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
        console.log(data)
        setcollegeName(data.can);
        setcollegeCode(data.CollegeCode);
        setCollegeType(data.Category);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCollegeInfo();
  }, []);

  const collegeCategoryOptions = [
    { value: "GOVT", label: "Government College" },
    { value: "UNI", label: "University" },
    { value: "SF", label: "Self Financed" },
    { value: "MIN", label: "Minority" },
    { value: "NMIN", label: "Non Minority" },
  ];
  const collegeCategoryMap = {
    "GOVT": "Government College",
    "UNI": "University",
    "SF": "Self Financed",
    "MIN": "Minority",
    "NMIN": "Non Minority"
  }


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
                />
                {errors.email && errors.email.type === "required" && <span className="invalid">This is required</span>}
                {errors.email && errors.email.type === "pattern" && (
                  <span className="invalid">{errors.email.message}</span>
                )}
              </div>
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
                />
                {errors.principalName && <span className="invalid">This field is required</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <Label className="form-label" htmlFor="fv-topics">
                College Type
              </Label>
              {console.log(collegeCategory)}
              <RSelect disabled value={{ value: collegeType, label: collegeCategoryMap[collegeType] }} options={collegeCategoryOptions} />
            </div>
          </Col>
          <Col md="12">
            <div className="form-group">
              <Button color="primary" size="lg">
                Next Section
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};
export default FormOne;
