import React, { useState, useEffect } from "react";
import { Row, Col, Label, Form, Spinner } from "reactstrap";
import Select from "react-select";
import { backendURL } from "../../backendurl";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../../components/Component";


const BankDetails = ({ alter, toggleIconTab }) => {
    const [loading, setLoading] = useState(true);
    const [bank, setBank] = useState({ Name: "", IFSC: "", AccNo: "", Holder: "", Branch: "" })
    const [bank2, setBank2] = useState({ Name: "", IFSC: "", AccNo: "", Holder: "", Branch: "" })
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
                        Bank2: bank2
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
                if (data.Booklet) {
                    if (data.Booklet.BankDetails) {
                        setBank(data.Booklet.BankDetails.Bank1);
                        setBank2(data.Booklet.BankDetails.Bank2);
                        console.log(data);
                    }
                    else {
                        seteditFlag(true);
                    }
                }
                else {
                    seteditFlag(true);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getCollegeInfo();
    }, []);

    if (!loading)
        return (
            <div>
                <Form className={formClass} onSubmit={handleSubmit((data) => onFormSubmit(data))}>
                    <div className="col">
                        <div className="card-head">
                            <h5 className="card-title text-primary">Bank One</h5>
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
                    <div className="col">
                        <div className="card-head">
                            <h5 className="card-title text-primary">Bank Two</h5>
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
                                            name="bankName2"
                                            id="full-name-2l"
                                            className="form-control"
                                            value={bank2.Name}
                                            onChange={(e) => (editFlag ? setBank2({ ...bank2, Name: e.target.value }) : null)} />
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
                                                required: true
                                            })}
                                            type="number"
                                            name="bankAcc2"
                                            id="acc2"
                                            className="form-control"
                                            value={bank2.AccNo}
                                            onChange={(e) => (editFlag ? setBank2({ ...bank2, AccNo: e.target.value }) : null)} />
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
                                                required: true
                                            })}
                                            type="text"
                                            name="bankHolder2"
                                            id="bankHolder2"
                                            className="form-control"
                                            value={bank2.Holder}
                                            onChange={(e) => (editFlag ? setBank2({ ...bank2, Holder: e.target.value }) : null)} />
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
                                                required: true
                                            })}
                                            type="text"
                                            name="bankIFSC2"
                                            id="IFSC2"
                                            className="form-control"
                                            value={bank2.IFSC}
                                            onChange={(e) => (editFlag ? setBank2({ ...bank2, IFSC: e.target.value }) : null)} />
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
                                                required: true
                                            })}
                                            type="text"
                                            name="bankAddr2"
                                            id="bankAddr2"
                                            className="form-control"
                                            value={bank2.Branch}
                                            onChange={(e) => (editFlag ? setBank2({ ...bank2, Branch: e.target.value }) : null)} />
                                        {errors.bankAddr2 && <span className="invalid">This field is required</span>}
                                    </div>
                                </div>
                            </Col>
                        </Row>


                    </div>
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
                <ToastContainer />

            </div>

        );
    else
        return (
            <div className="d-flex justify-content-center">
                <Spinner style={{ width: "5rem", height: "5rem" }} color="primary" />
            </div>
        );
};
export default BankDetails;
