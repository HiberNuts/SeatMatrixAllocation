import React, { useState, useRef } from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import Icon from "../components/icon/Icon";
import classnames from "classnames";
import PersonalDetails from "./BookletForm/PersonalDetails";
import BankDetails from "./BookletForm/BankDetails";
import { Nav, NavItem, NavLink, Row, Col, TabContent, TabPane } from "reactstrap";
import { Block, BlockHead, BlockHeadContent, BlockTitle, BlockDes, BackTo } from "../components/block/Block";
import { PreviewCard } from "../components/preview/Preview";
import Infrastructure from "./BookletForm/Infrastructure";
import CourseDetails from "./BookletForm/CourseDetails";

const Booklet = ({ ...props }) => {
    const [activeIconTab, setActiveIconTab] = useState("Personal");
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
                                        toggleIconTab("Personal");
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
                                        toggleIconTab("Bank");
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
                                        toggleIconTab("Branch");
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
                                        toggleIconTab("Infrastructure");
                                    }}
                                >
                                    <Icon name="building-fill" /> <span>Infrastructure</span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeIconTab}>
                            <TabPane tabId="Personal">
                                <PersonalDetails id="form-1" toggleIconTab={toggleIconTab} alter />
                            </TabPane>
                            <TabPane tabId="Bank">
                                <BankDetails id="form-2" toggleIconTab={toggleIconTab} alter />
                            </TabPane>
                            <TabPane tabId="Branch">
                                <CourseDetails toggleIconTab={toggleIconTab} />
                            </TabPane>
                            <TabPane toggleIconTab={toggleIconTab} tabId="Infrastructure">
                                <Infrastructure toggleIconTab={toggleIconTab} />
                            </TabPane>
                        </TabContent>
                    </PreviewCard>
                </Block>
            </Content>
        </React.Fragment>
    );
};

export default Booklet;
