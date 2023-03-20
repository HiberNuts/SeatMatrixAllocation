import React, { useState, useRef } from "react";
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

const Homepage = ({ ...props }) => {

  const [activeIconTab, setActiveIconTab] = useState("5");
  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };

  return (
    <React.Fragment>
      <Head title="HomePage" />
      <Content  >
        <Block >
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Seat Matrix Form</BlockTitle>
              <p>
                Please fill the form within the due date
              </p>
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard >
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
                    ev.preventDefault();
                    toggleIconTab("6");
                  }}
                >
                  <Icon name="book-fill" /> <span>Course Details</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "7" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("7");
                  }}
                >
                  <Icon name="check-fill-c" /> <span>Declaration</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "8" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("8");
                  }}
                >
                  <Icon name="upload" /> <span>Document Upload</span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeIconTab}>
              <TabPane tabId="5">
                <FormOne id="form-2" alter />
              </TabPane>
              <TabPane tabId="6">
                <FormTwo id="form-2" alter />
              </TabPane>
              <TabPane tabId="7">
                <p>
                  We, declare that I have thoroughly reviewed and verified all seat allocation matrix for TNEA. I have ensured that all seats have been allocated appropriately and that no further changes will be made to the allocation matrix without proper authorization from the relevant authorities.

                  I take full responsibility for any errors or omissions that may have occurred during the verification process and certify that all changes made to the matrix were necessary and within the scope of the project/task/assignment.
                </p>
              </TabPane>
              <TabPane tabId="8">
                <FormFour></FormFour>
              </TabPane>
            </TabContent>
          </PreviewCard>

        </Block>
      </Content>
    </React.Fragment>
  );
};


export default Homepage;
