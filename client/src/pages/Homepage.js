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

const Homepage = ({ ...props }) => {

  const [activeIconTab, setActiveIconTab] = useState("5");
  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };

  return (
    <React.Fragment>
      <Head title="HomePage" />
      <Content page="component">
        <Block>
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Seat Matrix Form</BlockTitle>
              <p>
                Please fill the form within the due date
              </p>
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
                  Fugiat id quis dolor culpa eiusmod anim velit excepteur proident dolor aute qui magna. Ad proident
                  laboris ullamco esse anim Lorem Lorem veniam quis Lorem irure occaecat velit nostrud magna nulla.
                  Velit et et proident Lorem do ea tempor officia dolor. Reprehenderit Lorem aliquip labore est magna
                  commodo est ea veniam consectetur.
                </p>
              </TabPane>
              <TabPane tabId="8">
                <p>
                  Eu dolore ea ullamco dolore Lorem id cupidatat excepteur reprehenderit consectetur elit id dolor
                  proident in cupidatat officia. Voluptate excepteur commodo labore nisi cillum duis aliqua do. Aliqua
                  amet qui mollit consectetur nulla mollit velit aliqua veniam nisi id do Lorem deserunt amet. Culpa
                  ullamco sit adipisicing labore officia magna elit nisi in aute tempor commodo eiusmod.
                </p>
              </TabPane>
            </TabContent>
          </PreviewCard>

        </Block>
      </Content>
    </React.Fragment>
  );
};


export default Homepage;
