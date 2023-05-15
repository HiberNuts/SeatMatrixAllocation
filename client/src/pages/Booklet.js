import React, { useState, useRef, useEffect } from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import Icon from "../components/icon/Icon";
import classnames from "classnames";
import PersonalDetails from "./BookletForm/PersonalDetails";
import {Spinner} from "reactstrap";
import { backendURL } from "../backendurl";
import BankDetails from "./BookletForm/BankDetails";
import { Nav, NavItem, NavLink, Row, Col, TabContent, TabPane } from "reactstrap";
import { Block, BlockHead, BlockHeadContent, BlockTitle, BlockDes, BackTo } from "../components/block/Block";
import { PreviewCard } from "../components/preview/Preview";
import Infrastructure from "./BookletForm/Infrastructure";
import CourseDetails from "./BookletForm/CourseDetails";
import PDF from "./BookletForm/PDF";
import { ToastContainer } from "react-toastify";
const Booklet = ({ ...props }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [activeIconTab, setActiveIconTab] = useState("Personal");
const spinner=(<div className="d-flex justify-content-center">
<Spinner style={{ width: "5rem", height: "5rem" }} color="primary" />
</div>);
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
            setData(data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
        });
};
useEffect(() => {
  getCollegeInfo();
},[])
  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };

  return (
    <React.Fragment>
      <Head title="Booklet" />
      <Content>
        <Block>
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Booklet Data Collection</BlockTitle>
              <p>Please fill the form within the due date</p>
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>
            <Nav tabs>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "Personal" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    // toggleIconTab("Personal");
                  }}
                >
                  <Icon name="user-fill" /> <span>College Details</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "Bank" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    // toggleIconTab("Bank");
                  }}
                >
                  <Icon name="coins" /> <span>Bank Details</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "Branch" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    // toggleIconTab("Branch");
                  }}
                >
                  <Icon name="tile-thumb-fill" /> <span>Branch Details</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "Infrastructure" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    // toggleIconTab("Infrastructure");
                  }}
                >
                  <Icon name="building-fill" /> <span>Infrastructure</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "PDF" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("PDF");
                  }}
                >
                  <Icon name="file-pdf" /> <span>PDF</span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeIconTab}>
              <TabPane tabId="Personal">
                {loading ? (
                        spinner          
                ):            
                (<PersonalDetails Data={data} id="form-1" toggleIconTab={toggleIconTab} alter />)}
              </TabPane>
              <TabPane tabId="Bank">
              {loading ? (
                        spinner          
                ):            
                (<BankDetails Data={data} id="form-2" toggleIconTab={toggleIconTab} alter />)}
               
              </TabPane>
              <TabPane tabId="Branch">
              {loading ? (
                        spinner          
                ):            
                (<CourseDetails Data={data} id="form-3" toggleIconTab={toggleIconTab} alter />)}
              </TabPane>
              <TabPane toggleIconTab={toggleIconTab} tabId="Infrastructure">
              {loading ? (
                        spinner          
                ):            
                (<Infrastructure Data={data} id="form-4" toggleIconTab={toggleIconTab} alter />)}
              </TabPane>
              <TabPane toggleIconTab={toggleIconTab} tabId="PDF">
              {loading ? (
                        spinner          
                ):            
                (<PDF Data={data} id="form-4" toggleIconTab={toggleIconTab} alter />)}
              </TabPane>
            </TabContent>
          </PreviewCard>
        </Block>
        <ToastContainer />
      </Content>
    </React.Fragment>
  );
};

export default Booklet;
