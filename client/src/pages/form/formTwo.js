import React, { useState } from "react";
import { Row, Col, Label, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Component";
import classNames from "classnames";
import { RSelect, NSComponent } from "../../components/Component";
import Select from "react-select";
const FormTwo = ({ alter, id }) => {
  const [Course, setCourse] = useState([]);

  const [courseSchema, setcourseSchema] = useState({ courseName: "", courseCode: "", accredation: "", intake: "" });

  const { errors, register, handleSubmit } = useForm();

  const onFormSubmit = (e) => { };
  const formClass = classNames({
    "form-validate": true,
    "is-alter": alter,
  });

  console.log(courseSchema);

  const addCourse = () => {
    let c = Course;
    c.push(c.length);
    setCourse(c);
  };

  const removeCourse = (e) => {
    const updatedCourses = [...Course];
    updatedCourses.splice(e, 1);
    setCourse(updatedCourses);
  };
  const defaultOptions = [
    { value: "GOVT", label: "Government College" },
    { value: "SF", label: "Self Financed" },
    { value: "MIN", label: "Minority" },
  ];
  const AccredationOptions = [
    { value: "ACC", label: "Accredated" },
    { value: "NACC", label: "Non - Accredated" },
  ];
  const CourseOptions = [

  ];
  return (
    <React.Fragment>
      <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
        <Row className="g-gs">
          <Col md="12">
            <table className="table table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Course Name</th>
                  <th scope="col">Course Code</th>
                  <th scope="col">Accredation</th>
                  <th scope="col">Santioned Intake</th>
                  <th scope="col">
                    Action
                  </th>

                </tr>
              </thead>
              <tbody>
                {Course.map((e, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <div className="form-control-select">
                          <Select
                            onChange={(newVal) => setcourseSchema({ ...courseSchema, courseName: newVal })}
                            classNamePrefix="react-select"
                            options={defaultOptions}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-control-select">
                          <Select classNamePrefix="react-select" options={defaultOptions} />
                        </div>
                      </td>
                      <td>
                        <div className="form-control-select">
                          <Select classNamePrefix="react-select" options={AccredationOptions} />
                        </div>
                      </td>
                      <td>
                        <NSComponent min={1} max={250} defaultVal={5} color="light" outline />
                      </td>
                      <td>
                        <a key={index} onClick={() => {
                          removeCourse(index - 1);
                        }} class="btn btn-icon btn-outline-danger"><em class="icon ni ni-cross-c"></em></a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
          <Col md="12" className="text-center">
            <a
              onClick={() => {
                addCourse();
              }}
              className="container-fluid btn btn-secondary btn-md"
              href="#"
              role="button"
            >
              <span className="text-xl-center">+ Add a New Course</span>
            </a>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};
export default FormTwo;
