import React, { useEffect, useState } from "react";
import { Row, Col, Form, Modal, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "../../components/Component";
import classNames from "classnames";
import { backendURL } from "../../backendurl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "../../components/Component";
import { courseRank } from "../../utils/CourseRank";
const Verify = ({ alter, activeIconTab, toggleIconTab, Data, updateCollegeInfo, Category, ccode, phase1Freeze }) => {
  const [freezeFlag, setfreezeFlag] = useState(false);
  const [show, setShow] = useState(false);
  const [Course, setcourse] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleSubmit = () => {
    setfreezeFlag(true);
    onFormSubmit();
    handleClose();
  };
  const onFormSubmit = () => {
    fetch(`${backendURL}/Phase1Freeze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        Course: Course,
        freeze: true,
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
          window.location.href = "/";
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
    SS: 0.7,
  };

  const getCollegeInfo = () => {
    var ec = [];
    for (let index = 0; index < Course.length; index++) {
      const element = Course[index];
      if (element.Quota !== 1 && element.Management > 0) {
        ec.push({ ...element, index: index });
      }
    }
    ec.sort((a, b) => {
      if (a.Pending === b.Pending) {
        return courseRank[ccode]?.indexOf(a.courseCode) - courseRank[ccode]?.indexOf(b.courseCode);
      } else return b.Pending - a.Pending;
    });

    let seat = seatsToAdd();

    let mgmt = 0;
    for (let index = 0; index < ec.length; index++) {
      if (seat === 0) {
        break;
      }
      mgmt += ec[index].Management;
      let indexVal = ec[index].index;

      if (indexVal >= 0) {
        onAddSeat(indexVal);
        seat--;
      }
    }
    if (seat > 0 && mgmt >= seat) {
      getCollegeInfo();
    }
  };

  const seatsToAdd = () => {
    let intake = 0;
    let GOVT = 0;

    Course.forEach((element) => {
      if (element.Quota !== 1) {
        intake += element.intake;
        GOVT += element.Govt;
      }
    });
    if (GOVTSeats[Category] * intake - GOVT < 1) return 0;
    else if ((GOVTSeats[Category] * intake - GOVT) % 1 > 0.9)
      return Math.floor(GOVTSeats[Category] * intake - GOVT) + 1;
    else return Math.floor(GOVTSeats[Category] * intake - GOVT);
  };
  // useEffect(() => {
  //   const data = Data;
  //   setcourse(data);
  //
  // }, [Data]);
  useEffect(() => {
    getCollegeInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Course]);
  useEffect(() => {
    const data = Data;
    setcourse(data);
    setfreezeFlag(phase1Freeze);
  }, [activeIconTab]);
  const onAddSeat = (i) => {
    const course = Course;
    if (course) {
      course[i]["Govt"] += 1;
      course[i]["Management"] -= 1;
      course[i]["SWS"] += 1;
      course[i]["Added"] += 1;
    }
    setcourse(course);
  };
  const formClass = classNames({
    "form-validate": true,
    "is-alter": alter,
  });

  const pending = () => {
    let GOVTSeats = 0;
    let intake = 0;
    let added = 0;
    const data = Course;
    data.forEach((element) => {
      if (element.Quota !== 1) {
        intake += element.intake;
        GOVTSeats += element.Govt;
        added += element.Added ? element.Added : 0;
      }
    });
    return [intake, GOVTSeats, ((GOVTSeats / intake) * 100).toFixed(2), added];
  };
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
          <Button color="success" onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
      {Category !== "GOVT AIDED" && Category !== "GOVT" && Category !== "UNIV" ? (
        <>
          <h5 style={{ color: "red" }}> Total Intake: {pending()[0]}</h5>
          <h5 style={{ color: "red" }}> Total Govt Seats: {pending()[1]}</h5>
          <h5 style={{ color: "red" }}> Total Percentage: {pending()[2]}%</h5>
          <h5 style={{ color: "red" }}> Quota Percentage: {GOVTSeats[Category] * 100}%</h5>
          <h5 style={{ color: "red" }}> Extra Seats Added: {pending()[3]}</h5>
        </>
      ) : null}
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
                      {element.Added ? (
                        <td>
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                            className="btn"
                            color="warning"
                            size="lg"
                          >
                            {element.Govt}
                          </Button>
                        </td>
                      ) : (
                        <td>
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                            className="btn"
                            color="secondary"
                            size="lg"
                          >
                            {element.Govt}
                          </Button>
                        </td>
                      )}

                      <td className="text-center">{element.Management}</td>
                      <td className="text-center">{element.Surrender}</td>
                      <td className="text-center">{element.SWS}</td>
                      {element.Added ? (
                        <td className="text-center">
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                            className="btn btn-icon"
                            color="success"
                            size="lg"
                          >
                            <Icon name="plus" />
                            <h5 className="px-2 text-white">{element.Added}</h5>
                          </Button>
                        </td>
                      ) : (
                        <td className="text-center">
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                            className="btn"
                            color="danger"
                            size="lg"
                          >
                            <h5 className="text-white">--</h5>
                          </Button>
                        </td>
                      )}
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
            {freezeFlag ? "Frozen" : "Freeze"}
          </button>
        </div>
        <div hidden={freezeFlag} className="text-center">
          <span className="text-center" style={{ color: "red" }}>
            *Important:{" "}
          </span>
          Click freeze button once you are done with all the changes, this action is irreversible.
        </div>
      </Form>
    </React.Fragment>
  );
};
export default Verify;
