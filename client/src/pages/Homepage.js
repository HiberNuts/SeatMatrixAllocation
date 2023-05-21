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

const Homepage = ({ ...props }) => {
  const [activeIconTab, setActiveIconTab] = useState("5");
  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };

  const [personalFlag, setpersonalFlag] = useState(false);
  const [courseFlag, setcourseFlag] = useState(false);
  const [declarationFlag, setdeclarationFlag] = useState(false);
  const [docFlag, setdocFlag] = useState(false);
  const [data,setData]=useState();
  const [loading,setLoading]=useState(true);
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCollegeInfo();
  }, []);

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
              <p>Please fill the form within the due date</p>
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
                  className={classnames({ active: activeIconTab === "6" })}
                  onClick={(ev) => {
                    if (personalFlag) {
                      ev.preventDefault();
                      toggleIconTab("6");
                    } else {
                      return;
                    }
                  }}
                  style={{
                    color: personalFlag == true ? "#526484" : "lightgray",
                    cursor: personalFlag ? "pointer" : "not-allowed",
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
                    color: personalFlag == true && courseFlag == true ? "#526484" : "lightgray",
                    cursor: personalFlag && courseFlag == true ? "pointer" : "not-allowed",
                  }}
                  className={classnames({ active: activeIconTab === "verify" })}
                  onClick={(ev) => {
                    if (personalFlag && courseFlag) {
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
                    color: personalFlag == true && courseFlag == true ? "#526484" : "lightgray",
                    cursor: personalFlag && courseFlag == true ? "pointer" : "not-allowed",
                  }}
                  className={classnames({ active: activeIconTab === "7" })}
                  onClick={(ev) => {
                    if (personalFlag && courseFlag) {
                      ev.preventDefault();
                      toggleIconTab("7");
                    } else {
                      return;
                    }
                  }}
                >
                  <Icon name="check-fill-c" /> <span>Declaration</span>
                </NavLink>
              </NavItem>
            
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  style={{
                    color: personalFlag == true && courseFlag == true && declarationFlag ? "#526484" : "lightgray",
                    cursor: personalFlag && courseFlag == true && declarationFlag ? "pointer" : "not-allowed",
                  }}
                  className={classnames({ active: activeIconTab === "8" })}
                  onClick={(ev) => {
                    if (personalFlag && courseFlag && declarationFlag) {
                      toggleIconTab("8");
                      ev.preventDefault();
                    } else {
                      return;
                    }
                  }}
                >
                  <Icon name="upload" /> <span>Document Upload</span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeIconTab}>
              <TabPane tabId="5">
              {loading ? (
                        spinner          
                ):            
                (<FormOne toggleIconTab={toggleIconTab} updateCollegeInfo={getCollegeInfo} Data={data} alter />)}
                
              </TabPane>
              <TabPane tabId="6">
              {loading ? (
                        spinner          
                ):            
                (<FormTwo toggleIconTab={toggleIconTab} updateCollegeInfo={getCollegeInfo} Data={data} alter />)}
                
              </TabPane>
              <TabPane tabId="verify">
              {loading ? (
                        spinner          
                ):            
                (<Verify toggleIconTab={toggleIconTab} updateCollegeInfo={getCollegeInfo} Data={data} alter />)}
                
              </TabPane>
              <TabPane tabId="7" >
              {loading ? (
                        spinner          
                ):            
                (<FormThree toggleIconTab={toggleIconTab} updateCollegeInfo={getCollegeInfo} Data={data} alter />)}
                
              </TabPane>
              <TabPane tabId="8" >
              {loading ? (
                        spinner          
                ):            
                (<FormFour toggleIconTab={toggleIconTab} updateCollegeInfo={getCollegeInfo} Data={data} alter />)}
                
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
