import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Modal, ModalHeader, ModalBody, Form, Spinner, Alert, ModalFooter } from "reactstrap";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";

import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { backendURL } from "../../backendurl";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");
  const [modalForm, setModalForm] = useState(false);
  const [forgotPassModal, setforgotPassModal] = useState(false);
  const [forgotPassCollegeCode, setforgotPassCollegeCode] = useState("");
  const toggleForm = () => setModalForm(!modalForm);
  const toggleForgotPass = () => setforgotPassModal(!forgotPassModal);
  const [collegeCode, setcollegeCode] = useState("");
  const [collegeCodeError, setcollegeCodeError] = useState(false);
  const [diffCodeError, setdiffCodeError] = useState(false);

  const onFormSubmit = (formData) => {
    setcollegeCode(formData.name);
    setLoading(true);
    fetch(`${backendURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ccode: formData.name, CollegePassword: formData.passcode }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Do something with the response data
        localStorage.setItem("accessToken", data.token);
        setError("");
        setLoading(false);
        if (data.resetReq) {
          setModalForm(true);
        } else {
          window.history.pushState(
            `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
            "auth-login",
            `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
          );
          window.location.reload();
        }
      })
      .catch((error) => {
        setTimeout(() => {
          setError("Invalid Credentials, Try Again");
          setLoading(false);
        }, 2000);
      });
  };

  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <ToastContainer />
      <Head title="Login" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <div style={{ fontSize: "30px" }}>Directorate of Technical Education, Chennai</div>
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <div>
                <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              </div>
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
          </div>

          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Sign-In</BlockTitle>
                <BlockDes>
                  <p>Access Seat Matrix Allocation using your email and passcode.</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> Invalid Credentials, Try Again{" "}
                </Alert>
              </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    College Code
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="default-01"
                    name="name"
                    ref={register({ required: "This field is required" })}
                    defaultValue=""
                    placeholder="Enter your College Code"
                    className="form-control-lg form-control"
                  />
                  {errors.name && <span className="invalid">{errors.name.message}</span>}
                </div>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Passcode
                  </label>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    type={passState ? "text" : "password"}
                    id="password"
                    name="passcode"
                    defaultValue=""
                    ref={register({ required: "This field is required" })}
                    placeholder="Enter your passcode"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
                </div>
                <div
                  style={{ textAlign: "right", display: "flex", justifyContent: "flex-end", marginTop: "10px" }}
                  className="forgotpass"
                >
                  <p
                    onClick={() => setforgotPassModal(true)}
                    style={{ textAlign: "right", color: "blueviolet", fontSize: "15px", cursor: "pointer" }}
                  >
                    <u>Forgot password?</u>
                  </p>
                </div>
              </div>
              <div className="form-group">
                <Button size="lg" className="btn-block" type="submit" color="primary">
                  {loading ? <Spinner size="sm" color="light" /> : "Sign in"}
                </Button>
              </div>
              <a
                href="https://drive.google.com/file/d/1pXIci9A25JDqATavp6jHKLtUDmtn_vLi/view?usp=share_link"
                target="_blank"
              >
                <Icon name="link"></Icon>
                <span>If any doubts please watch this video tutorial</span>
              </a>
              {/* <a href="https://youtu.be/cQi4x03U12E" target="_blank">
                <Icon name="link"></Icon>
                <span>If any doubts please watch this video tutorial</span>
              </a> */}
            </Form>
            <Modal isOpen={modalForm} toggle={toggleForm}>
              <ModalHeader toggle={toggleForm}>Reset Password</ModalHeader>
              <ModalBody>
                <form>
                  <div className="form-group">
                    <label className="form-label" htmlFor="passwordOne">
                      Password
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="password"
                        onChange={() => {
                          setdiffCodeError(false);
                          setcollegeCodeError(false);
                        }}
                        className="form-control"
                        id="passwordOne"
                      />
                      {collegeCodeError && <span className="invalid">New passowrd cannot be same as old one</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="passwordTwo">
                      Confirm Password
                    </label>
                    <div className="form-control-wrap">
                      <input
                        onChange={() => {
                          setdiffCodeError(false);
                          setcollegeCodeError(false);
                        }}
                        type="password"
                        className="form-control"
                        id="passwordTwo"
                      />
                      {diffCodeError && <span className="invalid">Password and Confirm Password must be same</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <Button
                      color="primary"
                      type="submit"
                      onClick={(ev) => {
                        ev.preventDefault();
                        var passone = document.getElementById("passwordOne").value;
                        var passtwo = document.getElementById("passwordTwo").value;

                        if (passone == collegeCode) {
                          setcollegeCodeError(true);
                        } else if (passone != passtwo) {
                          setdiffCodeError(true);
                        } else {
                          if (passone == passtwo) {
                            setLoading(true);
                            fetch(`${backendURL}/resetPasswordInitial`, {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                              },
                              body: JSON.stringify({ CollegePassword: passone }),
                            })
                              .then((response) => {
                                if (!response.ok) {
                                  throw new Error("Network response was not ok");
                                }
                                return response.json();
                              })
                              .then((data) => {
                                // Do something with the response data
                                setModalForm(false);
                                window.history.pushState(
                                  `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
                                  "auth-login",
                                  `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
                                );
                                window.location.reload();
                              })
                              .catch((error) => {
                                setModalForm(true);
                                setTimeout(() => {
                                  setError("Invalid Credentials, Try Again");
                                  setLoading(false);
                                }, 2000);
                              });
                          }
                        }
                      }}
                      size="lg"
                    >
                      {loading ? <Spinner size="sm" color="light" /> : "Change"}
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </Modal>
            <Modal isOpen={forgotPassModal} toggle={toggleForgotPass}>
              <ModalHeader toggle={toggleForgotPass}>Forgot password</ModalHeader>
              <ModalBody>
                <form>
                  <div className="form-group">
                    <p>
                      *Your password will be sent to you on the college email that was provided while submiting personal
                      details form.
                    </p>
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="default-01">
                        College Code
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        id="default-01"
                        name="name"
                        value={forgotPassCollegeCode}
                        onChange={(e) => setforgotPassCollegeCode(e.target.value)}
                        defaultValue=""
                        placeholder="Enter your College Code"
                        className="form-control-lg form-control"
                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <Button
                      color="primary"
                      type="submit"
                      onClick={(ev) => {
                        setLoading(true);
                        ev.preventDefault();
                        fetch(`${backendURL}/forgotpass`, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ CollegeCode: forgotPassCollegeCode }),
                        })
                          .then((response) => {
                            console.log(response);
                            if (!response.ok) {
                              setLoading(false);
                              throw new Error("Network response was not ok");
                            }
                            setLoading(false);
                            return response.json();
                          })
                          .then((data) => {
                            if (data.status) {
                              toast.success("Pasword has been sent");
                              setLoading(false);
                            } else {
                              toast.error(`${data.message}`);
                              setLoading(false);
                            }
                          })
                          .catch((error) => {
                            toast.error("Something went wrong!");
                            setLoading(false);
                          });
                      }}
                      size="lg"
                    >
                      {loading ? <Spinner size="sm" color="light" /> : "Submit"}
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </Modal>
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Login;
