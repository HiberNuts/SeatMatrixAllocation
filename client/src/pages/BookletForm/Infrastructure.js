import React, { useState, useEffect } from "react";
import { Row, Col, Label, Form, Spinner } from "reactstrap";
import Select from "react-select";
import { backendURL } from "../../backendurl";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Component";
import classNames from "classnames";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Infrastructure = ({ alter,Data,toggleIconTab,updateCollegeInfo }) => {
  const [loading, setLoading] = useState(true);
  const { errors, register, handleSubmit } = useForm();
  const [editFlag, seteditFlag] = useState(true);
  const [DHQ, setDHQ] = useState("");
  const [DRS, setDRS] = useState("");
  const [railway, setRailway] = useState("");
  const [acc, setAcc] = useState({ boys: true, girls: true });
  const [htype, setHtype] = useState({ boys:"Rental", girls: "Rental" });
  const [mess, setMess] = useState({ boys: "Both", girls: "Both" })
  const [bill, setBill] = useState({ boys: 0, girls: 0 });
  const [rent, setRent] = useState({ boys: 0, girls: 0 });
  const [elec, setElec] = useState({ boys: 0, girls: 0 });
  const [caution, setCaution] = useState(0);
  const [estab, setEstab] = useState(0);
  const [adm, setAdm] = useState(0);
  const [transport, setTransport] = useState(false);
  const [transportType, setTransportType] = useState("Optional");
  const [mintrans, setMintrans] = useState(0);
  const [maxtrans, setMaxtrans] = useState(0);
  const [frozen,setFrozen]=useState(false);

  const HostelType = [
    { label: "Permanent", value: "Permanent" },
    { label: "Rental", value: "Rental" },
  ];
  const TransportOption = [
    { label: "Optional", value: "Optional" },
    { label: "Compulsory", value: "Compulsory" },
  ];
  const MessType = [
    { label: "Veg", value: "Veg" },
    { label: "Non Veg", value: "Non Veg" },
    { label: "Both", value: "Both" },
  ];
  const BooleanOption = [
    { label: "YES", value: true },
    { label: "NO", value: false },
  ];
  const onFormSubmit = (data) => {
    
    if (frozen) {
          toggleIconTab("PDF");
    }
    else
    fetch(`${backendURL}/bookletInfrastructre`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(
        {
          Infra:
          {
            DHQ: DHQ,
            railway: railway,
            DRS: DRS,
            acc: acc,
            htype: htype,
            mess: mess,
            bill: bill,
            rent: rent,
            elec: elec,
            caution: caution,
            estab: estab,
            adm: adm,
            transport: transport,
            transportType: transportType,
            mintrans: mintrans,
            maxtrans: maxtrans
          }
        }
      ),
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
            toast.success("Submitted successfully", {
              position: "bottom-right",
              autoClose: true,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: false,
            });
          };

          notify();
        updateCollegeInfo();
          toggleIconTab("PDF");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const formClass = classNames({
    "form-validate": false,
    "is-alter": alter,
  });

  const getCollegeInfo = async (data) => {


      
        if (data.Booklet) {
          setFrozen(data.Booklet.Frozen);
          data = data.Booklet.Infrastructure;
         
          setDHQ(data.DHQ);
          setDRS(data.DRS);
          setRailway(data.railway);
          setAcc(data.acc);
          setHtype(data.htype);
          setMess(data.mess);
          setBill(data.bill);
          setRent(data.rent);
          setElec(data.elec);
          setCaution(data.caution);
          setEstab(data.estab);
          setAdm(data.adm);
          setTransport(data.transport);
          setTransportType(data.transportType);
          setMintrans(data.mintrans);
          setMaxtrans(data.maxtrans);
        }

  };

  useEffect(() => {
    getCollegeInfo(Data);
  }, []);

  const updateHandler = (data) => {
    seteditFlag(false);
    onFormSubmit(data);
  };

    return (
      <React.Fragment>
        <Form className={formClass} onSubmit={handleSubmit((data) => onFormSubmit(data))}>
          <Row className="g-gs">
            <Col md="6">
              <div className="form-group">
                <Label className="form-label" htmlFor="fv-distanceHQ">
                  Distance from District Headquarters in KM
                </Label>
                <div className="form-control-wrap">
                  <input
                    ref={register({ required: true })}
                    type="number"
                    id="fv-distanceHQ"
                    name="distanceHQ"
                    className="form-control"
                    disabled={frozen}
                    onChange={(e) => (editFlag ? setDHQ(e.target.value) : null)}
                    value={DHQ}
                  />
                  {errors.distanceHQ && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="form-group">
                <Label className="form-label" htmlFor="fv-RS">
                  Nearest Railway Station
                </Label>
                <div className="form-control-wrap">
                  <input
                    ref={register({
                      required: true,
                    })}
                    type="text"
                    id="fv-RS"
                    name="railway"
                    disabled={frozen}
                    className="form-control"
                    onChange={(e) => (editFlag ? setRailway(e.target.value) : null)}
                    value={railway}
                  />
                  {errors.railway && errors.railway.type === "required" && (
                    <span className="invalid">This is required</span>
                  )}

                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="form-group">
                <Label className="form-label" htmlFor="fv-distanceRS">
                  Railway Station Distance in KM
                </Label>
                <div className="form-control-wrap">
                  <input
                    ref={register({
                      required: true,
                    })}
                    type="number"
                    id="fv-distanceRS"
                    name="distanceRS"
                    disabled={frozen}
                    className="form-control"
                    onChange={(e) => (editFlag ? setDRS(e.target.value) : null)}
                    value={DRS}
                  />
                  {errors.distanceRS && errors.distanceRS.type === "required" && (
                    <span className="invalid">This is required</span>
                  )}

                </div>
              </div>
            </Col>
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th scope="col">Hostel Facilities</th>
                  <th scope="col">Boys</th>
                  <th scope="col">Girls</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Accomodation Available for UG
                  </td>
                  <td>
                    <div className="form-control-select">
                      <Select
                        value={acc.boys ? BooleanOption[0] : BooleanOption[1]}
                        onChange={(event) => {
                          setAcc({ ...acc, boys: event.value });
                       
                        }}
                        isDisabled={frozen}
                        classNamePrefix="react-select"
                        options={BooleanOption}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-control-select">
                      <Select
                        value={acc.girls ? BooleanOption[0] : BooleanOption[1]}
                        onChange={(event) => {
                          setAcc({ ...acc, girls: event.value });
                    
                        }}
                        isDisabled={frozen}
                        classNamePrefix="react-select"
                        options={BooleanOption}
                      />
                    </div>

                  </td>
                </tr>
                <tr hidden={!acc.boys && !acc.girls}>
                  <td>
                    Permanent / Rental
                  </td>
                  <td hidden={!acc.boys}>
                    <div className="form-control-select">
                      <Select
                        value={htype.boys == "Permanent" ? HostelType[0] : HostelType[1]}
                        onChange={(event) => {
                          setHtype({ ...htype, boys: event.value });
                        }}
                        isDisabled={frozen}
                        classNamePrefix="react-select"
                        options={HostelType}
                      />
                    </div>
                  </td>
                  <td hidden={acc.boys}>
                  </td>
                  <td hidden={!acc.girls}>
                    <div className="form-control-select">
                      <Select
                        value={htype.girls == "Permanent" ? HostelType[0] : HostelType[1]}
                        onChange={(event) => {
                          setHtype({ ...htype, girls: event.value });
                        }}
                        isDisabled={frozen}
                        classNamePrefix="react-select"
                        options={HostelType}
                      />
                    </div>

                  </td>
                  <td hidden={acc.girls}>
                  </td>
                </tr>
                <tr hidden={!acc.boys && !acc.girls}>
                  <td>
                    Type of Mess [Veg/Non Veg/Both]
                  </td>
                  <td hidden={!acc.boys}>
                    <div className="form-control-select">
                      <Select
                        value={mess.boys == "Veg" ? MessType[0] : mess.boys == "Non Veg" ? MessType[1] : MessType[2]}
                        onChange={(event) => {
                          setMess({ ...mess, boys: event.value });
                        }}
                        isDisabled={frozen}
                        classNamePrefix="react-select"
                        options={MessType}
                      />
                    </div>
                  </td>
                  <td hidden={acc.boys}></td>
                  <td hidden={!acc.girls}>
                    <div className="form-control-select">
                      <Select
                        value={mess.girls == "Veg" ? MessType[0] : mess.girls == "Non Veg" ? MessType[1] : MessType[2]}
                        onChange={(event) => {
                          setMess({ ...mess, girls: event.value });
                        }}
                        isDisabled={frozen}
                        classNamePrefix="react-select"
                        options={MessType}
                      />
                    </div>
                  </td>
                  <td hidden={acc.girls}></td>
                </tr>
                <tr hidden={!acc.boys && !acc.girls}>
                  <td>
                    Mess Bill [Rs./Month]
                  </td>
                  <td hidden={!acc.boys}>
                    <div className="form-control-wrap">
                      <input
                        ref={register({ required: true })}
                        type="number"
                        id="fv-billb"
                        name="billb"
                        className="form-control"
                        disabled={frozen}
                        onChange={(e) => (editFlag ? setBill({ ...bill, boys: e.target.value }) : null)}
                        value={bill.boys}
                      />
                      {errors.billb && <span className="invalid">This field is required</span>}
                    </div>
                  </td>
                  <td hidden={acc.boys}></td>
                  <td hidden={!acc.girls}>

                    <div className="form-control-wrap">
                      <input
                        ref={register({ required: true })}
                        type="number"
                        id="fv-billg"
                        name="billg"
                        disabled={frozen}
                        className="form-control"
                        onChange={(e) => (editFlag ? setBill({ ...bill, girls: e.target.value }) : null)}
                        value={bill.girls}
                      />
                      {errors.billlg && <span className="invalid">This field is required</span>}
                    </div>


                  </td>
                  <td hidden={acc.girls}></td>

                </tr>
                <tr hidden={!acc.boys && !acc.girls}>
                  <td>
                    Room Rent [Rs./Month]
                  </td>
                  <td hidden={!acc.boys}>
                    <div className="form-control-wrap">
                      <input
                        ref={register({ required: true })}
                        type="number"
                        id="fv-rentb"
                        name="rentb"
                        disabled={frozen}
                        className="form-control"
                        onChange={(e) => (editFlag ? setRent({ ...rent, boys: e.target.value }) : null)}
                        value={rent.boys}
                      />
                      {errors.rentb && <span className="invalid">This field is required</span>}
                    </div>
                  </td>
                  <td hidden={acc.boys}></td>

                  <td hidden={!acc.girls}>

                    <div className="form-control-wrap">
                      <input
                        ref={register({ required: true })}
                        type="number"
                        id="fv-rentg"
                        name="rentg"
                        disabled={frozen}
                        className="form-control"
                        onChange={(e) => (editFlag ? setRent({ ...rent, girls: e.target.value }) : null)}
                        value={rent.girls}
                      />
                      {errors.rentg && <span className="invalid">This field is required</span>}
                    </div>


                  </td>
                  <td hidden={acc.girls}></td>


                </tr>
                <tr hidden={!acc.boys && !acc.girls}>
                  <td>
                    Electricity Charges [Rs./Year]
                  </td>
                  <td hidden={!acc.boys}>
                    <div className="form-control-wrap">
                      <input
                        ref={register({ required: true })}
                        type="number"
                        id="fv-elecb"
                        name="elecb"
                        disabled={frozen}
                        className="form-control"
                        onChange={(e) => (editFlag ? setElec({ ...elec, boys: e.target.value }) : null)}
                        value={elec.boys}
                      />
                      {errors.elecb && <span className="invalid">This field is required</span>}
                    </div>
                  </td>
                  <td hidden={acc.boys}></td>

                  <td hidden={!acc.girls}>
                    <div className="form-control-wrap">
                      <input
                        ref={register({ required: true })}
                        type="number"
                        id="fv-rentg"
                        name="rentg"
                        disabled={frozen}
                        className="form-control"
                        onChange={(e) => (editFlag ? setRent({ ...rent, girls: e.target.value }) : null)}
                        value={rent.girls}
                      />
                      {errors.rentg && <span className="invalid">This field is required</span>}
                    </div>


                  </td>
                  <td hidden={acc.girls}></td>
                </tr>
                <tr>
                  <td>
                    Caution Deposit(Rs.)
                  </td>
                  <td colSpan={2}>
                    <div className="form-control-wrap">
                      <input
                        ref={register({ required: true })}
                        type="number"
                        id="fv-caution"
                        name="caution"
                        disabled={frozen}
                        className="form-control"
                        onChange={(e) => (editFlag ? setCaution(e.target.value) : null)}
                        value={caution}
                      />
                      {errors.caution && <span className="invalid">This field is required</span>}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    Establishment Charges(Rs.)
                  </td>
                  <td colSpan={2}>
                    <div className="form-control-wrap">
                      <input
                        ref={register({ required: true })}
                        type="number"
                        id="fv-estab"
                        name="estab"
                        disabled={frozen}
                        className="form-control"
                        onChange={(e) => (editFlag ? setEstab(e.target.value) : null)}
                        value={estab}
                      />
                      {errors.estab && <span className="invalid">This field is required</span>}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    Admission Fee(Rs.)
                  </td>
                  <td colSpan={2}>
                    <div className="form-control-wrap">
                      <input
                        ref={register({ required: true })}
                        type="number"
                        id="fv-adm"
                        name="adm"
                        disabled={frozen}
                        className="form-control"
                        onChange={(e) => (editFlag ? setAdm(e.target.value) : null)}
                        value={adm}
                      />
                      {errors.adm && <span className="invalid">This field is required</span>}
                    </div>
                  </td>
                </tr>
                <tr >
                  <td>
                    Transport Facility(Yes/No)
                  </td>
                  <td colSpan={2}>
                    <div className="form-control-select">
                      <Select
                        value={transport ? BooleanOption[0] : BooleanOption[1]}
                        onChange={(event) => setTransport(event.value)}
                        classNamePrefix="react-select"
                        isDisabled={frozen}
                        options={BooleanOption}
                      />
                    </div>
                  </td>
                </tr>
                <tr hidden={!transport}>
                  <td>
                    Transport(Optional/Compulsory)
                  </td>
                  <td colSpan={2}>
                    <div className="form-control-select">
                      <Select
                        value={transportType == "Optional" ? TransportOption[0] : TransportOption[1]}
                        onChange={(event) => setTransportType(event.value)}
                        classNamePrefix="react-select"
                        isDisabled={frozen}
                        options={TransportOption}
                      />
                    </div>
                  </td>
                </tr>
                <tr hidden={!transport}>
                  <td>
                    Min Transport Charges(Rs./Year)
                  </td>
                  <td colSpan={2}>
                    <div className="form-control-wrap">
                      <input
                        ref={register({ required: true })}
                        type="number"
                        id="fv-mintrans"
                        name="mintrans"
                        disabled={frozen}
                        className="form-control"
                        onChange={(e) => (editFlag ? setMintrans(e.target.value) : null)}
                        value={mintrans}
                      />
                      {errors.mintrans && <span className="invalid">This field is required</span>}
                    </div>
                  </td>
                </tr>
                <tr hidden={!transport}>
                  <td>
                    Max Transport Charges(Rs./Year)
                  </td>
                  <td colSpan={2}>
                    <div className="form-control-wrap">
                      <input
                        ref={register({ required: true })}
                        type="number"
                        id="fv-maxtrans"
                        name="maxtrans"
                        disabled={frozen}
                        className="form-control"
                        onChange={(e) => (editFlag ? setMaxtrans(e.target.value) : null)}
                        value={maxtrans}
                      />
                      {errors.maxtrans && <span className="invalid">This field is required</span>}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </Row>

          <div className="pt-5 d-flex justify-content-between">
            <Button
              type="submit"
              onClick={() => { toggleIconTab("Branch"); }}

              color="danger"
            >
              &lt; Back
            </Button>
            <Button
              type="submit"
              name="Submit"
              color="success"
              size="lg"
              
            >
              {frozen?("Next"):("Save and Proceed")}
              
            </Button>
          </div>
        </Form>
    
      </React.Fragment >
    );
  
};
export default Infrastructure;
