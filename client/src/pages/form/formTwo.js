import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Component";
import classNames from "classnames";
import { backendURL } from "../../backendurl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { CourseList, SSCourse } from "./CourseList";

const GOVTSeats = {
  "CENTRAL GOVT": 0.5,
  CHRISTIAN: 0.5,
  GOVT: 1,
  "GOVT AIDED": 1,
  HINDI: 0.5,
  JAIN: 0.5,
  MALAYALAM: 0.5,
  "MALAYALAM LINGUISTIC": 0.5,
  MIN: 0.5,
  MUSLIM: 0.5,
  NM: 0.65,
  SOWRASHTRA: 0.5,
  TELUGU: 0.5,
  UNIV: 1,
  IRTT: 0.65,
  SS: 0.7,
};

const AccredationOptions = [
  { value: "ACC", label: "Accredited", disabled: true },
  { value: "NACC", label: "Non - Accredited", disabled: true },
];

const FormTwo = ({ alter, toggleIconTab, Data, setParentCourse, updateCollegeInfo, phase1Freeze }) => {
  const courseSchema = {
    courseName: "",
    courseCode: "",
    accredation: "",
    intake: "",
    Govt: "",
    Surrender: "",
    Management: "",
    SWS: "",
    Quota: "",
    Added: 0,
    Pending: 0,
    error: false,
  };
  const [Course, setCourse] = useState([courseSchema]);
  const { errors, register, handleSubmit } = useForm();
  // const [errSurrender, seterrSurrender] = useState(false);
  const [clgCAT, setclgCAT] = useState("NM");
  const [clgCode, setclgCode] = useState("");
  const [freezeFlag, setfreezeFlag] = useState(false);
  const [comparingArray, setcomparingArray] = useState("");
  const [changesTracker, setchangesTracker] = useState(false);

  const onFormSubmit = () => {
    fetch(`${backendURL}/setCourseDetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        CourseDetails: Course,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          toast.error("Something went wrong please try again");
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status) {
          const notify = () => {
            toast.success("Data added successfully");
          };
          updateCollegeInfo();
          notify();
          toggleIconTab("verify");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCollegeInfo = async () => {
    const data = Data;

    setCourse(data.CourseDetails.length ? [...data.CourseDetails] : [courseSchema]);
    setcomparingArray(JSON.stringify(Course));
    setfreezeFlag(data?.Phase1Freeze ? true : false);
    if (["1", "2", "3", "4"].includes(data.ccode)) setfreezeFlag(true);
    setParentCourse(Course);
    if (data.ccode === "2709") {
      setclgCAT("IRTT");
    } else {
      setclgCAT(data.Category);
    }
    removeCourseOnFetch(data.CourseDetails, data.ccode);
  };
  useEffect(() => {
    getCollegeInfo();
  }, [Data]);

  useEffect(() => {
    if (comparingArray === JSON.stringify(Course)) {
      setchangesTracker(false);
    } else {
      setchangesTracker(true);
    }
  }, [Course]);

  const formClass = classNames({
    "form-validate": true,
    "is-alter": alter,
  });
  const removeCourseOnFetch = (Course, clgCode) => {
    setclgCode(clgCode);
    if (["1", "2", "4", "2006", "2007", "5008"].includes(clgCode)) {
      CourseList.push(...SSCourse);
    }

    Course?.forEach((element) => {
      let ind = CourseList.findIndex((p) => p.value === element.courseCode);
      if (ind !== -1) CourseList.splice(ind, 1);
    });
  };
  const handleFormChange = (event, index) => {
    let data = [...Course];
    data[index][event.target.name] = event.target.value;
    setCourse(data);
  };
  const handleCourseChange = (event, index) => {
    let data = [...Course];
    let ind = CourseList.indexOf(event);
    if (ind !== -1) CourseList.splice(ind, 1);
    if (data[index]["courseCode"]) {
      CourseList.splice(0, 0, data[index]["courseName"]);
    }

    data[index] = {
      courseName: event,
      courseCode: event.value,
      accredation: null,
      intake: 0,
      Govt: 0,
      Surrender: 0,
      Management: 0,
      SWS: 0,
      Quota: 0,
      Added: 0,
      Pending: 0,
      error: false,
    };
    setCourse(data);
  };
  const handleAccrChange = (event, index) => {
    let data = [...Course];
    data[index]["accredation"] = event;
    setCourse(data);
  };
  const handleinTakeChange = (event, index) => {
    let intake = Math.floor(event.target.value);
    if (intake < 0) intake = -intake;
    let data = [...Course];
    data[index]["intake"] = Math.floor(intake);
    data[index]["Surrender"] = 0;
    //SSCourse
    if (data[index]["courseName"].label.includes("(SS)")) {
      data[index]["Govt"] = Math.floor(intake * 0.7);
      data[index]["Quota"] = 0.7;
      data[index]["Pending"] = (intake * 0.7) % 1;
    }
    //NormalCourse
    else {
      data[index]["Govt"] = Math.floor(intake * GOVTSeats[clgCAT]);
      data[index]["Quota"] = GOVTSeats[clgCAT];
      data[index]["Pending"] = (intake * GOVTSeats[clgCAT]) % 1;
    }
    data[index]["Management"] = intake - data[index]["Govt"];
    data[index]["SWS"] = data[index]["Govt"];
    if (!intake) {
      data[index]["Govt"] = "";
      data[index]["Management"] = "";
      data[index]["Surrender"] = "";
      data[index]["SWS"] = "";
      data[index]["intake"] = "";
    }
    setCourse(data);
  };
  const handleSurrenderChange = (event, index) => {
    let data = [...Course];
    let surrender = Math.floor(event.target.value);
    let Govt = data[index]["Govt"];
    let Intake = data[index]["intake"];
    let Management = Intake - Govt;
    if (!surrender) {
      surrender = 0;
      data[index]["Surrender"] = "";
    } else {
      data[index]["Surrender"] = surrender;
    }
    if (surrender > Management) {
      data[index]["Surrender"] = Math.floor(surrender / 10);
    } else {
      data[index]["error"] = false;
      data[index]["Management"] = data[index]["intake"] - data[index]["Govt"] - surrender;
      data[index]["SWS"] = data[index]["Govt"] + surrender;

      setCourse(data);
    }
  };
  const handleSurrenderBlur = (event, index) => {
    let data = [...Course];
    let surrender = Math.floor(event.target.value);
    if (!surrender) {
      data[index]["Surrender"] = 0;
      setCourse(data);
    }
  };
  const checkErr = (tst) => {
    let val = true;

    Course.forEach((e) => {
      if (
        e.Govt >= 0 &&
        e.SWS === e.Govt + e.Surrender &&
        e.Govt + e.Surrender + e.Management === e.intake &&
        e.courseCode != null &&
        e.accredation != null &&
        e.intake != 0
      ) {
        val = val && true;
      } else {
        if (tst) {
          toast.error("Please Fill all Fields, to add New Course");
        }
        val = val && false;
      }
    });
    return val;
  };
  const addCourse = () => {
    let data = [...Course];
    if (checkErr(true)) {
      data.push(courseSchema);
      setCourse(data);
    }
  };
  const removeCourse = (e) => {
    if (Course.length == 1) {
      return;
    }
    const updatedCourses = [...Course];

    try {
      const courseObj = updatedCourses[e]["courseName"];
      if (courseObj) {
        CourseList.splice(0, 0, courseObj);
      }
    } finally {
      updatedCourses.splice(e, 1);
      setCourse(updatedCourses);
    }
  };
  const updateHandler = async () => {
    let val = [...Course];
    if (!val.at(Course.length - 1).courseCode) {
      val.splice(val.length - 1, 1);
    }
    setCourse(val);
    setParentCourse(Course);
    // if(checkErr())
    onFormSubmit();
  };

  return (
    <React.Fragment>
      <Form className={formClass} onSubmit={(e) => e.preventDefault()}>
        <Row className="g-gs">
          <Col md="12">
            <div className={window.innerWidth <= 1150 ? "table-responsive " : ""}>
              <table className={window.innerWidth <= 1150 ? "table table-responsive table-hover" : "table table-hover"}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Course Name</th>
                    <th scope="col">Course Code</th>
                    <th scope="col">Accreditation</th>
                    <th scope="col">Santioned Intake</th>
                    <th scope="col">Govt</th>
                    <th scope="col">Surrender</th>
                    <th scope="col">Management</th>
                    <th scope="col">SWS</th>
                    <th scope="col">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {Course.map((e, index) => {
                    return (
                      <tr UseSubmitBehavior={false} onClick={(e) => e.preventDefault()} key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <div className="form-control-select" style={{ width: "400px" }}>
                            {phase1Freeze ? (
                              <input disabled={true} className="form-control" value={e.courseName.label}></input>
                            ) : (
                              <Select
                                isOptionDisabled={(option) => (phase1Freeze ? option.disabled : false)}
                                onChange={(event) => handleCourseChange(event, index)}
                                classNamePrefix="react-select"
                                options={CourseList}
                                value={e.courseName}
                              />
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="form-control-warp" style={{ width: "auto" }}>
                            <input type="text" id="fv-subject" className="form-control" disabled value={e.courseCode} />
                          </div>
                        </td>
                        <td>
                          <div className="form-control-select">
                            <Select
                              isOptionDisabled={(option) => (phase1Freeze ? option.disabled : false)}
                              style={{ zIndex: "10000", width: "auto" }}
                              value={e.accredation}
                              isDisabled={e.courseCode == ""}
                              onChange={(event) => handleAccrChange(event, index)}
                              classNamePrefix="react-select"
                              options={AccredationOptions}
                            />
                          </div>
                        </td>
                        <td>
                          <input
                            type="number"
                            id="fv-intake"
                            name="intake"
                            disabled={phase1Freeze || e.courseCode == ""}
                            ref={register({ required: true })}
                            className="form-control"
                            onChange={(event) => handleinTakeChange(event, index)}
                            value={e.intake}
                            color="light"
                            outline
                          />
                        </td>
                        <td>
                          <input type="text" id="fv-subject" className="form-control" disabled value={e.Govt} />
                        </td>
                        <td>
                          <input
                            onBlur={(event) => handleSurrenderBlur(event, index)}
                            onChange={(event) => handleSurrenderChange(event, index)}
                            type="number"
                            id="fv-subject"
                            name="Surrender"
                            disabled={phase1Freeze || e.courseCode == ""}
                            ref={register({ required: true })}
                            className={`form-control`}
                            value={e.Surrender}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            onChange={(event) => handleFormChange(event, index)}
                            value={e.Management}
                            id="fv-subject"
                            className="form-control"
                            disabled
                          />
                        </td>
                        <td>
                          <input type="text" id="fv-subject" className="form-control" disabled value={e.SWS} />
                        </td>
                        <td>
                          {phase1Freeze !== true && (
                            <Button
                              UseSubmitBehavior={false}
                              key={index}
                              onClick={(e) => {
                                e.preventDefault();
                                removeCourse(index);
                              }}
                              class="btn btn-icon btn-outline-danger"
                            >
                              <em class="icon ni ni-cross-c"></em>
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Col>
          {phase1Freeze == false && (
            <Col md="12" className="text-center">
              <Button
                className="container-fluid btn btn-secondary btn-md"
                onClick={() => {
                  addCourse();
                }}
              >
                <span className="text-xl-center">+ Add a New Course</span>
              </Button>
            </Col>
          )}
        </Row>
        <div className="d-flex justify-content-between">
          <Button
            type="submit"
            onClick={() => {
              toggleIconTab("10");
            }}
            className="text-center m-4"
            color="danger"
          >
            &lt; Back
          </Button>
          {phase1Freeze == true ? (
            <Button
              type="submit"
              onClick={() => {
                setParentCourse(Course);
                toggleIconTab("verify");
              }}
              className="text-center m-4"
              color="success"
              disabled={!checkErr(false)}
            >
              Next &gt;
            </Button>
          ) : changesTracker ? (
            <Button
              type="submit"
              onClick={() => {
                updateHandler();
              }}
              className="text-center m-4"
              color="primary"
              disabled={!checkErr(false)}
            >
              Save and Proceed to Next &gt;
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={() => {
                toggleIconTab("verify");
              }}
              className="text-center m-4"
              color="success"
              disabled={!checkErr(false)}
            >
              Next &gt;
            </Button>
          )}
        </div>
      </Form>
    </React.Fragment>
  );
};
export default FormTwo;
