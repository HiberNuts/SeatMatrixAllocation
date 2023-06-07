import React, { useState, useRef, useEffect } from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import Icon from "../components/icon/Icon";
import classnames from "classnames";
import FormOne from "./form/formOne";
import FormTwo from "./form/formTwo";
import { Nav, NavItem, NavLink, Row, Col, TabContent, TabPane } from "reactstrap";
import { Block, BlockHead, BlockHeadContent, BlockTitle, BlockDes, BackTo } from "../components/block/Block";
import { PreviewCard } from "../components/preview/Preview";
import FormFour from "./form/formFour";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PdfDcoument from "../utils/PdfUtils/generatorPdf";
import FormThree from "./form/formThree";
import { backendURL } from "../backendurl";
import { ToastContainer } from "react-toastify";
import { Spinner } from "reactstrap";
import Verify from "./form/Verify";
import BankDetails from "./form/BankDetails";

const Homepage = ({ ...props }) => {
  const [activeIconTab, setActiveIconTab] = useState("5");
  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };

  const [personalFlag, setpersonalFlag] = useState(false);
  const [courseFlag, setcourseFlag] = useState(false);
  const [declarationFlag, setdeclarationFlag] = useState(false);
  const [bankDetailFlag, setbankDetailFlag] = useState(false);
  const [docFlag, setdocFlag] = useState(false);
  const [data, setData] = useState();
  const [Course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [phase1Freeze, setphase1Freeze] = useState(false);

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
        setData(data);
        setpersonalFlag(data?.PersonalDetailFlag == true ? true : false);
        setcourseFlag(data?.CourseDetails?.length >= 1 ? true : false);
        setdeclarationFlag(data?.DeclarationFlag == true ? true : false);
        setdocFlag(data?.DocumentUploadFlag == true ? true : false);
        setLoading(false);
        setphase1Freeze(data?.Phase1Freeze == true ? true : false);
        setbankDetailFlag(data?.BankDetailFlag == true ? true : false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCollegeInfo();
  }, []);
  useEffect(() => {}, [data]);
  const spinner = (
    <div className="d-flex justify-content-center">
      <Spinner style={{ width: "5rem", height: "5rem" }} color="primary" />
    </div>
  );
  return (
    <React.Fragment>
      <Head title="HomePage" />
      <Content>
        <Block>
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Seat Matrix Form</BlockTitle>
              <p>
                <a href="/Instructions">Click here to view instructions or click General Instructions in left panel</a>
              </p>
              <p style={{ color: "red" }}>
                *Declaration and Documents Upload section are part of Phase 2 and will be enabled after June 15th.
              </p>
              {/* <p>Please fill the form within the due date</p> */}
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>
            <Nav tabs>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "5" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("5");
                  }}
                >
                  <Icon name="user-fill" /> <span>Personal Details</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  style={{
                    color: personalFlag == true ? "#526484" : "lightgray",
                    cursor: personalFlag == true ? "pointer" : "not-allowed",
                  }}
                  className={classnames({ active: activeIconTab === "10" })}
                  onClick={(ev) => {
                    if (personalFlag) {
                      ev.preventDefault();
                      toggleIconTab("10");
                    } else {
                      return;
                    }
                  }}
                >
                  <Icon name="user-fill" /> <span>Bank Details</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "6" })}
                  onClick={(ev) => {
                    if (personalFlag && bankDetailFlag) {
                      ev.preventDefault();
                      toggleIconTab("6");
                    } else {
                      return;
                    }
                  }}
                  style={{
                    color: personalFlag == true && bankDetailFlag == true ? "#526484" : "lightgray",
                    cursor: personalFlag && bankDetailFlag == true ? "pointer" : "not-allowed",
                  }}
                >
                  <Icon name="book-fill" /> <span>Course Details</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  style={{
                    color: personalFlag == true && courseFlag && bankDetailFlag == true ? "#526484" : "lightgray",
                    cursor: personalFlag && courseFlag && bankDetailFlag == true ? "pointer" : "not-allowed",
                  }}
                  className={classnames({ active: activeIconTab === "verify" })}
                  onClick={(ev) => {
                    if (personalFlag && courseFlag && bankDetailFlag) {
                      ev.preventDefault();
                      toggleIconTab("verify");
                    } else {
                      return;
                    }
                  }}
                >
                  <Icon name="reload-alt" /> <span>Verify</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  style={{
                    // color: personalFlag == true && courseFlag == true && declarationFlag ? "#526484" : "lightgray",
                    // cursor: personalFlag && courseFlag == true && declarationFlag ? "pointer" : "not-allowed",
                    color: "lightgray",
                    cursor: "not-allowed",
                  }}
                  className={classnames({ active: activeIconTab === "7" })}
                  // onClick={(ev) => {
                  //   if (personalFlag && courseFlag) {
                  //     ev.preventDefault();
                  //     // getCollegeInfo();
                  //   } else {
                  //     toggleIconTab("7");
                  //     return;
                  //   }
                  // }}
                >
                  <Icon name="check-fill-c" /> <span>Declaration</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  style={{
                    // color: personalFlag == true && courseFlag == true && declarationFlag ? "#526484" : "lightgray",
                    // cursor: personalFlag && courseFlag == true && declarationFlag ? "pointer" : "not-allowed",
                    color: "lightgray",
                    cursor: "not-allowed",
                  }}
                  className={classnames({ active: activeIconTab === "8" })}
                  // onClick={(ev) => {
                  //   if (personalFlag && courseFlag && declarationFlag) {
                  //     ev.preventDefault();
                  //   } else {
                  //     toggleIconTab("8");
                  //     return;
                  //   }
                  // }}
                >
                  <Icon name="upload" /> <span>Document Upload</span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeIconTab}>
              <TabPane tabId="5">
                {loading ? (
                  spinner
                ) : (
                  <FormOne
                    phase1Freeze={phase1Freeze}
                    toggleIconTab={toggleIconTab}
                    updateCollegeInfo={getCollegeInfo}
                    Data={data}
                    alter
                  />
                )}
              </TabPane>
              <TabPane tabId="10">
                {loading ? (
                  spinner
                ) : (
                  <BankDetails
                    toggleIconTab={toggleIconTab}
                    setParentCourse={setCourse}
                    updateCollegeInfo={getCollegeInfo}
                    Data={data}
                    phase1Freeze={phase1Freeze}
                    alter
                  />
                )}
              </TabPane>
              <TabPane tabId="6">
                {loading ? (
                  spinner
                ) : (
                  <FormTwo
                    toggleIconTab={toggleIconTab}
                    setParentCourse={setCourse}
                    updateCollegeInfo={getCollegeInfo}
                    Data={data}
                    phase1Freeze={phase1Freeze}
                    alter
                  />
                )}
              </TabPane>
              <TabPane tabId="verify">
                {loading ? (
                  spinner
                ) : (
                  <Verify
                    activeIconTab={activeIconTab}
                    toggleIconTab={toggleIconTab}
                    updateCollegeInfo={getCollegeInfo}
                    Data={Course}
                    Category={data?.Category}
                    ccode={data?.ccode}
                    phase1Freeze={phase1Freeze}
                    alter
                  />
                )}
              </TabPane>
              <TabPane tabId="7">
                {loading ? (
                  spinner
                ) : (
                  <FormThree toggleIconTab={toggleIconTab} updateCollegeInfo={getCollegeInfo} Data={data} alter />
                )}
              </TabPane>
              <TabPane tabId="8">
                {loading ? (
                  spinner
                ) : (
                  <FormFour toggleIconTab={toggleIconTab} updateCollegeInfo={getCollegeInfo} Data={Course} alter />
                )}
              </TabPane>
            </TabContent>
          </PreviewCard>
        </Block>
      </Content>
      <ToastContainer />
    </React.Fragment>
  );
};

export default Homepage;
