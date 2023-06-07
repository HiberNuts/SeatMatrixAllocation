import React, { useState, useEffect } from "react";
import { Row, Col, Label, Form, Spinner } from "reactstrap";
import Select from "react-select";
import { backendURL } from "../../backendurl";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../../components/Component";

const BankDetails = ({ alter, Data, toggleIconTab, updateCollegeInfo, phase1Freeze }) => {
  const [loading, setLoading] = useState(true);
  const [bank, setBank] = useState({ Name: "", IFSC: "", AccNo: "", Holder: "", Branch: "" });
  const [bank2, setBank2] = useState({ Name: "", IFSC: "", AccNo: "", Holder: "", Branch: "" });
  const [editFlag, seteditFlag] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const [frozen, setFrozen] = useState(false);
  const onFormSubmit = (data) => {
    if (phase1Freeze != true) {
      fetch(`${backendURL}/bankData`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          BankDetails: {
            Bank1: bank,
            Bank2: bank2,
          },
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
                toastId: "Bank",
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: false,
              });
            };
            notify();
            updateCollegeInfo();
            seteditFlag(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // if (editFlag) {

    // } else {
    //   seteditFlag(true);
    // }
  };
  const formClass = classNames({
    "form-validate": false,
    "is-alter": alter,
  });

  const getCollegeInfo = async (data) => {
    if (data.BankDetails) {
      setBank(
        data.BankDetails?.Bank1 ? data.BankDetails?.Bank1 : { Name: "", IFSC: "", AccNo: "", Holder: "", Branch: "" }
      );
      setBank2(
        data.BankDetails?.Bank2 ? data.BankDetails?.Bank2 : { Name: "", IFSC: "", AccNo: "", Holder: "", Branch: "" }
      );
    } else {
      seteditFlag(true);
    }
  };

  useEffect(() => {
    getCollegeInfo(Data);
  }, []);
  console.log(editFlag);
  return (
    <div>
      <Form className={formClass} onSubmit={handleSubmit((data) => onFormSubmit(data))}>
        <div className="col">
          <div className="card-head">
            <h5 className="card-title text-primary">Bank Details - TFC Upward</h5>
          </div>

          <Row className="g-4">
            <Col lg="6">
              <div className="form-group">
                <label className="form-label" htmlFor="full-name-1">
                  Bank Name
                </label>
                <div className="form-control-wrap">
                  <input
                    disabled={phase1Freeze}
                    ref={register({
                      required: true,
                    })}
                    type="text"
                    name="bankName"
                    id="full-name-1"
                    className="form-control"
                    value={bank.Name}
                    onChange={(e) => (editFlag ? setBank({ ...bank, Name: e.target.value }) : null)}
                  />
                  {errors.bankName && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="form-group">
                <label className="form-label" htmlFor="email-address-1">
                  Account Number
                </label>
                <div className="form-control-wrap">
                  <input
                    ref={register({
                      required: true,
                    })}
                    disabled={phase1Freeze}
                    type="number"
                    name="bankAcc"
                    id="acc"
                    className="form-control"
                    value={bank.AccNo}
                    onChange={(e) => (editFlag ? setBank({ ...bank, AccNo: e.target.value }) : null)}
                  />
                  {errors.bankAcc && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="form-group">
                <label className="form-label" htmlFor="phone-no-1">
                  Bank Holder Name
                </label>
                <div className="form-control-wrap">
                  <input
                    ref={register({
                      required: true,
                    })}
                    type="text"
                    disabled={phase1Freeze}
                    name="bankHolder"
                    id="bankHolder"
                    className="form-control"
                    value={bank.Holder}
                    onChange={(e) => (editFlag ? setBank({ ...bank, Holder: e.target.value }) : null)}
                  />
                  {errors.bankHolder && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="form-group">
                <label className="form-label" htmlFor="pay-amount-1">
                  IFSC CODE
                </label>
                <div className="form-control-wrap">
                  <input
                    ref={register({
                      required: true,
                    })}
                    type="text"
                    name="bankIFSC"
                    disabled={phase1Freeze}
                    id="IFSC"
                    className="form-control"
                    value={bank.IFSC}
                    onChange={(e) => (editFlag ? setBank({ ...bank, IFSC: e.target.value }) : null)}
                  />
                  {errors.bankIFSC && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="form-group">
                <label className="form-label" htmlFor="pay-amount-1">
                  Branch
                </label>
                <div className="form-control-wrap">
                  <input
                    ref={register({
                      required: true,
                    })}
                    type="text"
                    disabled={phase1Freeze}
                    name="bankAddr"
                    id="bankAddr"
                    className="form-control"
                    value={bank.Branch}
                    onChange={(e) => (editFlag ? setBank({ ...bank, Branch: e.target.value }) : null)}
                  />
                  {errors.bankAddr && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <hr></hr>
        <div className="col">
          <div className="card-head">
            <h5 className="card-title text-primary">Bank Details- 7.5% (Govt Schools)</h5>
          </div>

          <Row className="g-4">
            <Col lg="6">
              <div className="form-group">
                <label className="form-label" htmlFor="full-name-1">
                  Bank Name
                </label>
                <div className="form-control-wrap">
                  <input
                    ref={register({
                      required: true,
                    })}
                    type="text"
                    name="bankName2"
                    disabled={phase1Freeze}
                    id="full-name-2l"
                    className="form-control"
                    value={bank2?.Name}
                    onChange={(e) => (editFlag ? setBank2({ ...bank2, Name: e.target.value }) : null)}
                  />
                  {errors.bankName2 && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="form-group">
                <label className="form-label" htmlFor="email-address-1">
                  Account Number
                </label>
                <div className="form-control-wrap">
                  <input
                    ref={register({
                      required: true,
                    })}
                    type="number"
                    name="bankAcc2"
                    id="acc2"
                    disabled={phase1Freeze}
                    className="form-control"
                    value={bank2?.AccNo}
                    onChange={(e) => (editFlag ? setBank2({ ...bank2, AccNo: e.target.value }) : null)}
                  />
                  {errors.bankAcc2 && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="form-group">
                <label className="form-label" htmlFor="phone-no-1">
                  Bank Holder Name
                </label>
                <div className="form-control-wrap">
                  <input
                    ref={register({
                      required: true,
                    })}
                    type="text"
                    name="bankHolder2"
                    id="bankHolder2"
                    disabled={phase1Freeze}
                    className="form-control"
                    value={bank2?.Holder}
                    onChange={(e) => (editFlag ? setBank2({ ...bank2, Holder: e.target.value }) : null)}
                  />
                  {errors.bankHolder2 && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="form-group">
                <label className="form-label" htmlFor="pay-amount-1">
                  IFSC CODE
                </label>
                <div className="form-control-wrap">
                  <input
                    ref={register({
                      required: true,
                    })}
                    type="text"
                    name="bankIFSC2"
                    id="IFSC2"
                    disabled={phase1Freeze}
                    className="form-control"
                    value={bank2?.IFSC}
                    onChange={(e) => (editFlag ? setBank2({ ...bank2, IFSC: e.target.value }) : null)}
                  />
                  {errors.bankIFSC2 && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="form-group">
                <label className="form-label" htmlFor="pay-amount-1">
                  Bank Address
                </label>
                <div className="form-control-wrap">
                  <input
                    ref={register({
                      required: true,
                    })}
                    type="text"
                    name="bankAddr2"
                    id="bankAddr2"
                    disabled={phase1Freeze}
                    className="form-control"
                    value={bank2?.Branch}
                    onChange={(e) => (editFlag ? setBank2({ ...bank2, Branch: e.target.value }) : null)}
                  />
                  {errors.bankAddr2 && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="pt-5 d-flex justify-content-between">
          <Button
            type="submit"
            onClick={() => {
              toggleIconTab("5");
              seteditFlag(false);
            }}
            color="danger"
          >
            &lt; Back
          </Button>
          {editFlag && (
            <Button name="submit" type="submit" color="warning" size="lg" disabled={phase1Freeze}>
              Save
            </Button>
          )}
          {editFlag == false && (
            <Button
              color={editFlag ? "warning" : "primary"}
              size="lg"
              onClick={() => seteditFlag(true)}
              disabled={phase1Freeze}
            >
              Edit
            </Button>
          )}
          <Button
            onClick={(e) => {
              e.preventDefault();
              toggleIconTab("6");
            }}
            disabled={editFlag || !Data.BankDetailFlag}
            color="success"
            size="lg"
          >
            Next &gt;
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default BankDetails;
