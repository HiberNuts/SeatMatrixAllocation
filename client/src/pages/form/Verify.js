import React, { useEffect, useState } from "react";
import { Row, Col, Form, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Component";
import classNames from "classnames";
import { backendURL } from "../../backendurl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { CourseList, SSCourse } from "./CourseList";
import { Icon } from "../../components/Component";
const Verify = ({ alter,activeIconTab,toggleIconTab, Data, updateCollegeInfo }) => {
  const [clgCAT, setclgCAT] = useState("NM");
  const [data, setData] = useState();
  const { errors, register, handleSubmit } = useForm();
  const [freezeFlag, setfreezeFlag] = useState(false);
  const [show, setShow] = useState(false);
  const [elegibleCourse,setElegibleCourse]=useState([]);
  const [Course, setcourse] = useState([]);
  


  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
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
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const GOVTSeats = {
    "CENTRAL GOVT": 0.5,
    CHRISTIAN: 0.5,
    GOVT: 1,
    "GOVT AIDED": 0.7,
    HINDI: 0.5,
    JAIN: 0.5,
    MALAYALAM: 0.5,
    "MALAYALAM LINGUISTIC": 0.5,
    MIN: 0.5,
    MUSLIM: 0.5,
    NM: 0.65,
    SOWRASHTRA: 0.5,
    TELUGU: 0.5,
    UNIV: 0.7,
    IRTT: 0.65,
    SS: 0.7
  };

  const getCollegeInfo = () => {
  //   const data = Data;
    const ec = [];
    // setfreezeFlag(data?.data?.FreezeFlag ? data.data.FreezeFlag : false);
    for (let index = 0; index < Course.length; index++) {
      const element =Course[index];
      if (element.Quota != 1 && element.Management > 0) {
        ec.push({...element, index:index});              
      }
    }     
    ec.sort((a, b) => {
      return b.Pending-a.Pending  ;
    })  
    
    setElegibleCourse(ec);
    console.log("ElegibleCourse",ec);
    
    let seat=seatsToAdd();
    console.log("seats",seat,Course);

    for (let index = 0; index < ec.length; index++) {
      if (seat==0) {
        break;        
      }
      let indexVal=ec[index].index;       
      console.log("indexVal",indexVal);
      if (indexVal>=0) {

        onAddSeat(indexVal);
        seat--;
      }
    }
  };

  const seatsToAdd = () => {
    let intake = 0;
    let GOVT = 0;

    Course.forEach((element) => {
      if (element.Quota != 1) {
        intake += element.intake;
        GOVT += element.Govt;
      }
    })
    if ((GOVTSeats[Data?.Category] * intake - GOVT) < 1)
      return 0;
    else
      return Math.floor(GOVTSeats[Data?.Category] * intake - GOVT)
  }
  useEffect(() => {
      const data =Data.CourseDetails;
      setcourse(data)
      console.log("Props",Data);  
  }, [Data]);
  useEffect(() => {  
    console.log("Triggered",Course);
    getCollegeInfo();
}, [Course]);
  const onAddSeat = (i) => {
    const course = Course;
    if (course) {    
    course[i]["Govt"] += 1;
    course[i]["Management"] -= 1;
    course[i]["SWS"] += 1;
    }
    console.log("culprit");
    setcourse(course);

  }
  const formClass = classNames({
    "form-validate": true,
    "is-alter": alter,
  });   

  const pending = () => {
    let GOVTSeats = 0;
    let intake = 0;
    const data = Course;
    data.forEach((element) => {
      if (element.Quota != 1) {
        intake += element.intake;
        GOVTSeats += element.Govt;
      }
    })
    return [intake, GOVTSeats, (GOVTSeats / intake * 100).toFixed(2)];
  }
  const managementSum = () => {
    let mgmt = 0;
    const data = Course;
    data.forEach((element) => {
      mgmt += element.Management;
    })
    return mgmt;
  }


  return (
    <React.Fragment>
      <Modal isOpen={show} onExit={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <ModalBody>
          <h4>Warning</h4>
          <p>
            Are you sure you want to submit the form?
            <br />
            This action is irreversible
          </p>
        </ModalBody>
        <ModalFooter style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <Button outline color="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button color="success" onClick={handleClose}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
      <h5 style={{ color: "red" }}> Total Intake: {pending()[0]}</h5>
      <h5 style={{ color: "red" }}> Total Govt Seats: {pending()[1]}</h5>
      <h5 style={{ color: "red" }}> Total Percentage: {pending()[2]}%</h5>
      <h5 style={{ color: "red" }}> Quota Percentage: {GOVTSeats[Data?.Category] * 100}%</h5>
      <h5 style={{ color: "red" }}> Extra Seats Added: {seatsToAdd()}</h5>


      <Form className={formClass} onSubmit={(e) => e.preventDefault()}>
        <Row className="g-gs">
          <Col md="12">
            <div className={window.innerWidth <= 1150 ? "table-responsive " : ""}>
              <table className="table">
                <thead className="table-dark text-center">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Course Name</th>
                    <th scope="col">Govt Seats</th>
                    <th scope="col">Management</th>
                    <th scope="col">Surrender</th>
                    <th scope="col">SWS</th>
                    <th scope="col">Adjustment Seats</th>

                  </tr>
                </thead>
                <tbody>
                  {Course.map((element, index) => (
                    <tr key={element.courseCode}>
                      <th scope="row">{index + 1}</th>
                      <td>{element.courseName.label}</td>
                      <td className="text-center">
                        {element.Govt}
                      </td>
                      <td className="text-center">

                        {element.Management}
                      </td>
                      <td className="text-center">

                        {element.Surrender}
                      </td>
                      <td className="text-center">

                        {element.SWS}
                      </td>
                      {
                       
                          (elegibleCourse.includes(element))?
                            (<td className="text-center" key={idx}>
                              {
                                item.index != index ? (
                                  <Button
                                
                                    onClick={(e) => {
                                      // console.log(buttonDisabled);
                                      e.preventDefault();
                
                                    }} className="btn btn-icon" color={item.color} size="lg">
                                    <Icon name="plus" /><h5 className="px-2 text-white">1</h5>
                                  </Button>
                                ) :
                                  (
                                    <Button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        onRemoveSeat(index, idx);
                                      }} className="btn btn-icon" color="danger" size="lg">
                                      <Icon name="minus" />
                                    </Button>
                                  )
                              }

                            </td>): (<td></td>)
                            }
                            
                     
                    </tr>
                  ))}



                </tbody>
              </table>
            </div>
          </Col>

        </Row>
        <div className="d-flex justify-content-between">
          <Button
            type="submit"
            onClick={() => {
              toggleIconTab("6");
            }}
            className="text-center m-4"
            color="danger"
          >
            &lt; Back
          </Button>

        </div>

        <div
          style={{
            marginTop: "50px",
            width: "100%",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <button
            onClick={handleShow}
            disabled={freezeFlag}
            style={{ width: "300px", height: "50px", justifyContent: "center" }}
            className="btn btn-danger"
          >
            Freeze
          </button>
        </div>
        <div className="text-center">
          <span className="text-center" style={{ color: "red" }}>*Important: </span>Click freeze button once you are done with all the changes,
          this action is irreversible.
        </div>
      </Form>
    </React.Fragment>

  );
};
export default Verify;
