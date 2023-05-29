import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Component";
import classNames from "classnames";
import { backendURL } from "../../backendurl";
import { ToastContainer, toast } from "react-toastify";
import { CourseList,SSCourse } from "./CourseList";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

const CourseDetails = ({ alter,Data, toggleIconTab,updateCollegeInfo }) => {
  const courseSchema = {
    courseName: null,
    courseCode: null,
    accredation: null,
    intake: null,
    year: null,
    accUpto: null

  };
  const [Course, setCourse] = useState([courseSchema]);
  const { errors, register, handleSubmit } = useForm();
  const [errSurrender, seterrSurrender] = useState(false);
  const [clgCAT, setclgCAT] = useState("NM");
  const [clgCode, setclgCode] = useState("");
  const [frozen,setFrozen] = useState(false);
  const [pending,setPending]=useState();
  const onFormSubmit = (data) => {
   
    if (frozen) {
      toggleIconTab("Infrastructure");
    }
    else {

    fetch(`${backendURL}/bookletCourse`, {
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

        if (data.status) {

          const notify = () => {
            toast.success("Data added successfully");
          };
          notify();
          updateCollegeInfo();
          toggleIconTab("Infrastructure");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };


  const getCollegeInfo = async (data) => {
   
        if (data.Booklet) {
        
          setFrozen(data.Booklet.Frozen);
          setCourse(data.Booklet.CourseDetails ? data.Booklet.CourseDetails : [courseSchema]);
          setclgCAT(data.Category);
          removeCourseOnFetch(data.Booklet.CourseDetails, data.ccode);
        }
    

  };
  useEffect(() => {
    getCollegeInfo(Data);

  }, []);

  const formClass = classNames({
    "form-validate": true,
    "is-alter": alter,
  });
  const removeCourseOnFetch = (Course, clgCode) => {

    setclgCode(clgCode);
    //to Add SS Course
    if (["1", "2", "4", "2006", "2007", "5008"].includes(clgCode)) {
      CourseList.push(...SSCourse);
    }

    //to Remove Added Course
    Course?.forEach(element => {
      let ind = CourseList.findIndex(p => p.value === element.courseCode);
      if (ind !== -1)
        CourseList.splice(ind, 1);
    });
  }

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
    let data = [...Course];
    data[index]["intake"] = event.target.value;
    setCourse(data);
   
  };
  const handlevalidChange = (event, index) => {
    let data = [...Course];
    data[index]["accUpto"] = event.target.value;
    setCourse(data);
  };
  const handleyearChange = (event, index) => {
    let data = [...Course];
    data[index]["year"] = event.target.value;
    setCourse(data);
  }
  const checkErr = () => {
    let val = true;
    Course.forEach(e => {
      if (e.courseCode != null && e.accredation != null && e.intake != 0 && e.year != 0 && e.valid != 0 && e.year>1000 && e.year<2024) {
   
        if (e.accredation.value=='ACC') {
          if (e.accUpto > 2022) {
          val = val && true;
          }
          else
          {
            val=val&& false;
          }
        }
        else
        {
          val = val && true;
        }
      }
      else {
        val = val && false;
      }
    })
    return val;


  }
  const proceedNextBool = () => {
    let val = true;
    Course.forEach(e => {
      if (e.courseCode != null && e.accredation != null && e.intake != 0 && e.year != 0 && e.valid != 0 && e.year>1000 && e.year<2024) {
   
        if (e.accredation.value=='ACC') {
          if (e.accUpto > 2022) {
          val = val && true;
          }
          else
          {
            val=val&& false;
          }
        }
        else
        {
          val = val && true;
        }
      }
      else {
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
      <Form className={formClass} onSubmit={(e) => e.preventDefault()}>
        <Row className="g-gs">
          <Col md="12">
            <table className="table table-responsive  w-auto">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Branch Name</th>
                  <th scope="col">Branch Code</th>
                  <th scope="col">Approved Intake</th>
                  <th scope="col">Year of Starting</th>
                  <th scope="col">NBA Accredited</th>
                  <th scope="col">Accredation Upto</th>
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
                            isDisabled={frozen}
                            onChange={(event) => handleCourseChange(event, index)}
                            classNamePrefix="react-select"
                            options={CourseList}
                            value={e.courseName}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-control-warp" style={{ width: "min-width" }}>
                          <input type="text" id="fv-subject" className="form-control" disabled value={e.courseCode} />
                        </div>
                      </td>
                      <td>
                        <input
                          type="number"
                          name="intake"
                          disabled={frozen}
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
                        <input
                        disabled={frozen}
                          onChange={(event) => handleyearChange(event, index)} type="text" id="fv-subject" className="form-control" value={e.year} />
                      </td>
                      <td>
                        <div className="form-control-select">
                          <Select
                          isDisabled={frozen}
                            value={e.accredation}
                            onChange={(event) => handleAccrChange(event, index)}
                            classNamePrefix="react-select"
                            options={AccredationOptions}
                          />
                        </div>
                      </td>
                      <td>
                        <input
                          onChange={(event) => handlevalidChange(event, index)}
                          type="number"
                          disabled={frozen}
                          id="fv-subject"
                          name="accredation"
                          ref={register({ required: true })}
                          className={`form-control ${errSurrender ? "error" : ""}`}
                          value={e.accUpto}
                        />
                      </td>
                      <td>
                        <Button
                        disabled={frozen}
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
            disabled={frozen}
              className="container-fluid btn btn-secondary btn-md"
              onClick={() => {
                addCourse();
              }}
            >
              <span className="text-xl-center">+ Add a New Course</span>
            </Button>
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button
            type="submit"
            onClick={() => { toggleIconTab("Bank"); }}
            className="text-center m-4"
            color="danger"
          >
            &lt; Back
          </Button>

          <Button

            onClick={(data) => onFormSubmit(data)}
            className="text-center m-4"
            color="success"
            disabled={!proceedNextBool()}
          >
            Proceed to Next &gt;
          </Button>
        </div>
      </Form>
    </React.Fragment>
  );
};
export default CourseDetails;