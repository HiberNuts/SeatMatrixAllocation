import React, { useState, useEffect } from "react";
import { Row, Col, Label, Form, Spinner } from "reactstrap";
import Select from "react-select";
import { backendURL } from "../../backendurl";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../../components/Component";


const BankDetails = ({alter,Data, toggleIconTab }) => {
    const [loading, setLoading] = useState(true);
    const [bank, setBank] = useState({ Name: "", IFSC: "", AccNo: "", Holder: "", Branch: "" })
    const [editFlag, seteditFlag] = useState(false);
    const { errors, register, handleSubmit } = useForm();
    const onFormSubmit = (data) => {
        if (editFlag) {
            fetch(`${backendURL}/bankData`, {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify({
                    BankDetails: {
                        Bank1: bank,
                      
                    }
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
                        seteditFlag(false);

                    }
                })
                .catch((error) => {
                    console.log(error);
                });

        } else {
            seteditFlag(true);
        }

    };
    const formClass = classNames({
        "form-validate": false,
        "is-alter": alter,
    });

    const getCollegeInfo = async (data) => {
        
                console.log(data);
                if (data.Booklet) {
                    if (data.Booklet.BankDetails) {
                        setBank(data.Booklet.BankDetails.Bank1);
                
                        console.log(data);
                    }
                    else {
                        seteditFlag(true);
                    }
                }
                else {
                    seteditFlag(true);
                }
                
           
    };

    useEffect(() => {
        getCollegeInfo(Data);
    }, []);

        return (
            <div>
                <Form className={formClass} onSubmit={handleSubmit((data) => onFormSubmit(data))}>
                    <div className="col">
                        <div className="card-head">
                            <h5 className="card-title text-primary">Bank Details</h5>
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
                                                required: true
                                            })}
                                            type="text"
                                            name="bankName"
                                            id="full-name-1"
                                            className="form-control"
                                            value={bank.Name}
                                            onChange={(e) => (editFlag ? setBank({ ...bank, Name: e.target.value }) : null)} />
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
                                                required: true
                                            })}
                                            type="number"
                                            name="bankAcc"
                                            id="acc"
                                            className="form-control"
                                            value={bank.AccNo}
                                            onChange={(e) => (editFlag ? setBank({ ...bank, AccNo: e.target.value }) : null)} />
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
                                                required: true
                                            })}
                                            type="text"
                                            name="bankHolder"
                                            id="bankHolder"
                                            className="form-control"
                                            value={bank.Holder}
                                            onChange={(e) => (editFlag ? setBank({ ...bank, Holder: e.target.value }) : null)} />
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
                                                required: true
                                            })}
                                            type="text"
                                            name="bankIFSC"
                                            id="IFSC"
                                            className="form-control"
                                            value={bank.IFSC}
                                            onChange={(e) => (editFlag ? setBank({ ...bank, IFSC: e.target.value }) : null)} />
                                        {errors.bankIFSC && <span className="invalid">This field is required</span>}
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
                                                required: true
                                            })}
                                            type="text"
                                            name="bankAddr"
                                            id="bankAddr"
                                            className="form-control"
                                            value={bank.Branch}
                                            onChange={(e) => (editFlag ? setBank({ ...bank, Branch: e.target.value }) : null)} />
                                        {errors.bankAddr && <span className="invalid">This field is required</span>}
                                    </div>
                                </div>
                            </Col>
                        </Row>


                    </div>
                    <hr></hr>
                    
                    <div className="pt-5 d-flex justify-content-between">
                        <Button
                            type="submit"
                            onClick={() => { toggleIconTab("Personal"); }}
                            
                            color="danger"
                        >
                            &lt; Back
                        </Button>
                        <Button
                            name="submit"
                            type="submit"
                            color={editFlag ? "warning" : "primary"}
                            size="lg"
                        >
                            {editFlag ? "Save" : "Edit"}

                        </Button>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                toggleIconTab("Branch");
                            }}
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
