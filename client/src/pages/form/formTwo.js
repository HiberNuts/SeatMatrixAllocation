import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Component";
import classNames from "classnames";
import { backendURL } from "../../backendurl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
const CourseList = [
  { label: "ARTIFICIAL INTELLIGENCE AND DATA SCIENCE", value: "AD" },
  { label: "AERONAUTICAL ENGINEERING", value: "AE" },
  { label: "AGRICULTURAL ENGINEERING", value: "AG" },
  { label: "Artificial Intelligence and Machine Learning", value: "AL" },
  { label: "COMPUTER SCIENCE AND ENGINEERING (ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING)", value: "AM" },
  { label: "AEROSPACE ENGINEERING", value: "AO" },
  { label: "APPAREL TECHNOLOGY (SS)", value: "AP" },
  { label: "AUTOMOBILE ENGINEERING (SS)", value: "AS" },
  { label: "ARTIFICIAL INTELLIGENCE AND DATA SCIENCE (SS)", value: "AT" },
  { label: "AUTOMOBILE ENGINEERING", value: "AU" },
  { label: "Bio Technology and Bio Chemical Engineering", value: "BC" },
  { label: "BIO MEDICAL ENGINEERING ", value: "BM" },
  { label: "B.Plan", value: "BP" },
  { label: "BIO TECHNOLOGY (SS)", value: "BS" },
  { label: "BIO TECHNOLOGY", value: "BT" },
  { label: "BIO MEDICAL ENGINEERING  (SS)", value: "BY" },
  { label: "COMPUTER SCIENCE AND BUSSINESS SYSTEM", value: "CB" },
  { label: "CHEMICAL AND ELECTRO CHEMICAL  ENGINEERING (SS)", value: "CC" },
  { label: "COMPUTER SCIENCE AND DESIGN", value: "CD" },
  { label: "CIVIL  ENGINEERING ", value: "CE" },
  { label: "COMPUTER SCIENCE AND ENGINEERING (DATA SCIENCE)", value: "CF" },
  { label: "Computer Science and Engineering (Artificial Intelligence and Machine Learning) (SS)", value: "CG" },
  { label: "CHEMICAL  ENGINEERING ", value: "CH" },
  { label: "Computer Science and Engineering (Internet of Things)", value: "CI" },
  { label: "M.Tech. Computer Science and Engineering (Integrated 5 years)", value: "CJ" },
  { label: "CHEMICAL  ENGINEERING (SS)", value: "CL" },
  { label: "COMPUTER SCIENCE AND ENGINEERING (SS)", value: "CM" },
  { label: "CIVIL  ENGINEERING (SS)", value: "CN" },
  { label: "COMPUTER AND  COMMUNICATION ENGINEERING", value: "CO" },
  { label: "CERAMIC TECHNOLOGY (SS)", value: "CR" },
  { label: "COMPUTER SCIENCE AND ENGINEERING", value: "CS" },
  { label: "COMPUTER TECHNOLOGY", value: "CT" },
  { label: "Computer Science and Business System (SS)", value: "CW" },
  { label: "Cyber Security", value: "CY" },
  { label: "CIVIL AND STRUCTUTURAL ENGINEERING", value: "CZ" },
  { label: "ELECTRONICS AND COMMUNICATION ENGINEERING", value: "EC" },
  { label: "ELECTRICAL AND ELECTRONICS ENGINEERING", value: "EE" },
  { label: "ELECTRONICS AND INSTRUMENTATION ENGINEERING", value: "EI" },
  { label: "ELECTRONICS AND COMMUNICATION ENGINEERING (SS)", value: "EM" },
  { label: "ENVIRONMENTAL ENGINEERING", value: "EN" },
  { label: "ELECTRICAL AND ELECTRONICS (SANDWICH) (SS)", value: "ES" },
  { label: "ELECTRONICS AND  TELECOMMUNICATION ENGINEERING", value: "ET" },
  { label: "ELECTRICAL AND ELECTRONICS ENGINEERING (SS)", value: "EY" },
  { label: "FOOD TECHNOLOGY ", value: "FD" },
  { label: "FOOD TECHNOLOGY (SS)", value: "FS" },
  { label: "FASHION TECHNOLOGY", value: "FT" },
  { label: "FASHION TECHNOLOGY (SS)", value: "FY" },
  { label: "GEO INFORMATICS", value: "GI" },
  { label: "HANDLOOM AND TEXTILE TECHNOLOGY", value: "HT" },
  { label: "INDUSTRIAL BIO TECHNOLOGY", value: "IB" },
  { label: "INSTRUMENTATION AND CONTROL ENGINEERING", value: "IC" },
  { label: "INDUSTRIAL ENGINEERING", value: "IE" },
  { label: "INFORMATION TECHNOLOGY (SS)", value: "IM" },
  { label: "INDUSTRIAL ENGINEERING AND MANAGEMENT", value: "IN" },
  { label: "INDUSTRIAL BIO TECHNOLOGY (SS)", value: "IS" },
  { label: "INFORMATION TECHNOLOGY", value: "IT" },
  { label: "INSTRUMENTATION AND CONTROL ENGINEERING (SS)", value: "IY" },
  { label: "LEATHER TECHNOLOGY", value: "LE" },
  { label: "MATERIAL SCIENCE AND ENGINEERING (SS)", value: "MA" },
  { label: "MECHATRONICS", value: "MC" },
  { label: "MEDICAL ELECTRONICS ENGINEERING", value: "MD" },
  { label: "MECHANICAL ENGINEERING", value: "ME" },
  { label: "MECHANICAL ENGINEERING (SS)", value: "MF" },
  { label: "MECHATRONICS (SS)", value: "MG" },
  { label: "MECHANICAL ENGINEERING (SANDWICH)", value: "MH" },
  { label: "MINING ENGINEERING", value: "MI" },
  { label: "MECHANICAL ENGINEERING (MANUFACTURING)", value: "MM" },
  { label: "MANUFACTURING ENGINEERING", value: "MN" },
  { label: "Mechanical and Mechatronics Engineering (Additive Manufacturing)", value: "MO" },
  { label: "MARINE ENGINEERING", value: "MR" },
  { label: "MECHANICAL ENGINEERING (SANDWICH) (SS)", value: "MS" },
  { label: "METALLURGICAL ENGINEERING", value: "MT" },
  { label: "MECHANICAL AND AUTOMATION ENGINEERING", value: "MU" },
  { label: "METALLURGICAL ENGINEERING (SS)", value: "MY" },
  { label: "Mechatronics Engineering", value: "MZ" },
  { label: "PLASTIC TECHNOLOGY", value: "PA" },
  { label: "PETRO CHEMICAL TECHNOLOGY", value: "PC" },
  { label: "PETRO CHEMICAL ENGINEERING", value: "PD" },
  { label: "PETROLEUM ENGINEERING", value: "PE" },
  { label: "PHARMACEUTICAL TECHNOLOGY", value: "PH" },
  { label: "PHARMACEUTICAL TECHNOLOGY (SS)", value: "PM" },
  { label: "PRODUCTION ENGINEERING (SS)", value: "PN" },
  { label: "PETROLEUM ENGINEERING AND TECHNOLOGY (SS)", value: "PP" },
  { label: "PRODUCTION ENGINEERING", value: "PR" },
  { label: "PRODUCTION ENGINEERING (SANDWICH) (SS)", value: "PS" },
  { label: "PRINTING AND PACKING TECHNOLOGY", value: "PT" },
  { label: "ROBOTICS AND AUTOMATION (SS)", value: "RA" },
  { label: "ROBOTICS AND AUTOMATION", value: "RM" },
  { label: "RUBBER AND PLASTIC TECHNOLOGY", value: "RP" },
  {
    label: "Computer Science and Engineering (Internet of Things and Cyber Security including Block Chain Technology)",
    value: "SB",
  },
  { label: "Computer Science and Engineering (Cyber Security)", value: "SC" },
  { label: "Information Science and Engineering", value: "SE" },
  { label: "Safety and Fire Engineering", value: "SF" },
  { label: "TEXTILE CHEMISTRY", value: "TC" },
  { label: "Computer Science and Technology", value: "TS" },
  { label: "TEXTILE TECHNOLOGY (SS)", value: "TT" },
  { label: "TEXTILE TECHNOLOGY", value: "TX" },
  { label: "CIVIL ENGINEERING (TAMIL MEDIUM)", value: "XC" },
  { label: "MECHANICAL ENGINEERING (TAMIL MEDIUM)", value: "XM" },
  { label: "COMPUTER SCIENCE AND ENGINEERING (TAMIL)", value: "XS" },
];
const GOVTSeats = {
  "CENTRAL GOVT": 50,
  CHRISTIAN: 50,
  GOVT: 100,
  "GOVT AIDED": 100,
  HINDI: 50,
  JAIN: 50,
  MALAYALAM: 50,
  "MALAYALAM LINGUISTIC": 50,
  MIN: 50,
  MUSLIM: 50,
  NM: 65,
  SOWRASHTRA: 50,
  TELUGU: 50,
  UNIV: 100,
  IRTT: 65,

};
const FormTwo = ({ alter, id }) => {
  const courseSchema = {
    courseName: null,
    courseCode: null,
    accredation: null,
    intake: 0,
    Govt: 0,
    Surrender: 0,
    Management: 0,
    SWS: 0,
  };
  const [Course, setCourse] = useState([courseSchema]);
  const { errors, register, handleSubmit } = useForm();
  const [errSurrender, seterrSurrender] = useState(false);
  const [clgCAT, setclgCAT] = useState("NM");
  const onFormSubmit = (data) => {
    fetch(`${backendURL}/setCourseDetails`, {
      method: "Post",
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
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status) {
          console.log("s");
          const notify = () => {
            toast.success("Data added successfully");
          };
          notify();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        console.log(data);
        setCourse(data.CourseDetails ? data.CourseDetails : []);
        if (data.ccode == '2709') {
          setclgCAT("IRTT");

        }
        else {
          setclgCAT(data.Category);

        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCollegeInfo();
  }, []);

  const formClass = classNames({
    "form-validate": true,
    "is-alter": alter,
  });
  const handleFormChange = (event, index) => {
    let data = [...Course];
    data[index][event.target.name] = event.target.value;
    setCourse(data);
  };
  const handleCourseChange = (event, index) => {
    let data = [...Course];
    let ind = CourseList.indexOf(event);
    if (ind !== -1)
      CourseList.splice(ind, 1);
    if (data[index]["courseCode"]) {
      CourseList.splice(0, 0, data[index]["courseName"]);
    }
    data[index]["courseName"] = event;
    data[index]["courseCode"] = event.value;
    setCourse(data);
  };
  const handleAccrChange = (event, index) => {
    let data = [...Course];
    data[index]["accredation"] = event;
    setCourse(data);
  };
  const handleinTakeChange = (event, index) => {
    let intake = parseInt(event.target.value);
    if (intake < 0) intake = -intake;
    if (!intake) intake = 0;
    console.log(event);
    let data = [...Course];
    data[index]["intake"] = intake;
    data[index]["Surrender"] = 0;
    if (data[index]["courseName"].label.includes("(SS)")) {
      data[index]["Govt"] = Math.floor(data[index]["intake"] * 0.01 * 70);

    } else {
      data[index]["Govt"] = Math.floor(data[index]["intake"] * 0.01 * GOVTSeats[clgCAT]);

    }
    data[index]["Management"] = data[index]["intake"] - data[index]["Govt"];
    data[index]["SWS"] = data[index]["Govt"];

    setCourse(data);
  };
  const handleSurrenderChange = (event, index) => {
    let data = [...Course];
    let surrender = parseInt(event.target.value);
    if (!surrender) surrender = 0;
    data[index]["Surrender"] = surrender;
    if (data[index]["Surrender"] > data[index]["Management"]) {
      // if (data[index]["courseName"].label.includes("(SS)")) {
      //   data[index]["Govt"] = Math.floor(data[index]["intake"] * 0.01 * 70);
      // } else {
      //   data[index]["Govt"] = Math.floor(data[index]["intake"] * 0.01 * GOVTSeats[clgCAT]);
      // }
      data[index]["Management"] = data[index]["intake"] - data[index]["Govt"];
      data[index]["SWS"] = data[index]["Govt"];

      seterrSurrender(true);
    } else {
      seterrSurrender(false);
      // if (data[index]["courseName"].label.includes("(SS)")) {
      //   data[index]["Govt"] = Math.floor(data[index]["intake"] * 0.01 * 70) + surrender;
      // } else {
      //   data[index]["Govt"] = Math.floor(data[index]["intake"] * 0.01 * GOVTSeats[clgCAT]) + surrender;
      // }
      data[index]["Management"] = data[index]["intake"] - data[index]["Govt"]-surrender;
      data[index]["SWS"] = data[index]["Govt"] + surrender;

      setCourse(data);
    }
  };
  const checkErr = () => {
    let val = true;
    Course.forEach(e => {
      if (e.Govt >= 0 && e.SWS === e.Govt + e.Surrender && e.Govt + e.Surrender + e.Management === e.intake && e.courseCode != null && e.accredation != null) {
        val = val && true;
      }
      else {

        toast.error("Please Fill all Fields, to add New Course");

        val = val && false;
      }
    })
    return val;


  }

  const addCourse = () => {
    let data = [...Course];
    if (checkErr()) {
      data.push(courseSchema);
      setCourse(data);
    }
  };
  const removeCourse = (e) => {
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
  const updateHandler = (data) => {
    let val = [...Course];
    if (!val.at(Course.length - 1).courseCode) {
      val.splice(val.length - 1, 1);
    }
    setCourse(val);
    // if(checkErr())
    onFormSubmit(data);
  };

  const AccredationOptions = [
    { value: "ACC", label: "Accredited" },
    { value: "NACC", label: "Non - Accredited" },
  ];

  return (
    <React.Fragment>
      <ToastContainer />
      <Form className={formClass} onSubmit={(e) => e.preventDefault()}>
        <Row className="g-gs">
          <Col md="12">
            <table className="table table-responsive text-nowrap w-auto">
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
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {Course.map((e, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <div className="form-control-select" style={{ width: "400px" }}>
                          <Select
                            onChange={(event) => handleCourseChange(event, index)}
                            classNamePrefix="react-select"
                            options={CourseList}
                            value={e.courseName}
                          />
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
                            value={e.accredation}
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
                          onChange={(event) => handleSurrenderChange(event, index)}
                          type="number"
                          id="fv-subject"
                          name="Surrender"
                          ref={register({ required: true })}
                          className={`form-control ${errSurrender ? "error" : ""}`}
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
                        <Button
                          key={index}
                          onClick={() => {
                            removeCourse(index);
                          }}
                          class="btn btn-icon btn-outline-danger"
                        >
                          <em class="icon ni ni-cross-c"></em>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
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
        </Row>
        <Button
          type="submit"
          onClick={handleSubmit((data) => updateHandler(data))}
          className="text-center m-4"
          color="success"
        >
          Save Progress
        </Button>
      </Form>
    </React.Fragment>
  );
};
export default FormTwo;
