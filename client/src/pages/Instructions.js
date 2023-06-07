import React from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import {
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  TabContent,
  TabPane,
  List,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import { Block, BlockHead, BlockHeadContent, BlockTitle, BlockDes, BackTo } from "../components/block/Block";
import { PreviewCard } from "../components/preview/Preview";
import { ToastContainer, toast } from "react-toastify";
const Instructions = () => {
  return (
    <React.Fragment>
      <Head title="HomePage" />
      <Content>
        <Block>
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">General Instructions</BlockTitle>
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>
            <List>
              <ListGroup>
                <ListGroupItemHeading>Seat Matrix Form containes 6 sections in total</ListGroupItemHeading>
                <ListGroupItemText>
                  {" "}
                  <b>Personal Details :</b> To enter basic details of college
                </ListGroupItemText>
                <ListGroupItemText>
                  <b>Bank Details :</b> To enter the bank account information
                </ListGroupItemText>
                <ListGroupItemText>
                  <b> Course Details :</b>
                  To enter offered courses by the college and total number of seats
                </ListGroupItemText>
                <ListGroupItemText>
                  <b>Verify Details : </b> To verify the seat distribution
                </ListGroupItemText>
                <ListGroupItemText>
                  <b>Declaration section: </b>
                  This section lets you download the pdf of the list of courses you entered in previous section, to be
                  signed by principal of the college and uploaded in next section
                </ListGroupItemText>
                <ListGroupItemText>
                  <b>Document Upload section: </b>
                  This section is to upload all the applicable document to the college in pdf form
                </ListGroupItemText>
              </ListGroup>
              <ListGroup>
                <ListGroupItemHeading>Phase distribution</ListGroupItemHeading>
                <ListGroupItemText>
                  <b>Phase1 (Current): </b>
                  Only the Personal Detail, Bank detail, Course Detail,Verify section will be enabled in this phase
                </ListGroupItemText>
                <ListGroupItemText>
                  <b>Phase2:</b> Declaration and Document upload section will be enabled in this phase
                </ListGroupItemText>
                <ListGroupItemText>Phase 2 will be enabled after June 15th 2023</ListGroupItemText>
                <ListGroupItemText>
                  If any issue presists in data updating please try to refresh once to view the latest changes.
                </ListGroupItemText>
                <ListGroupItemText>
                  For any issues please contact the TNEA Seatmatrix tech team through the below stated contact details
                </ListGroupItemText>
              </ListGroup>
            </List>
          </PreviewCard>
        </Block>
      </Content>
      <ToastContainer />
    </React.Fragment>
  );
};

export default Instructions;
