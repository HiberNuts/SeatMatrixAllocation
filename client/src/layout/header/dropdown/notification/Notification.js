import React from "react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown } from "reactstrap";

import Icon from "../../../../components/icon/Icon";
import data from "./NotificationData";

const NotificationItem = (props) => {
  const { icon, iconStyle, text, time, id } = props;
  return (
   <div/>
  );
};

const Notification = () => {
  return (
    <UncontrolledDropdown className="user-dropdown">
      <DropdownToggle tag="a" className="dropdown-toggle nk-quick-nav-icon">
        <div className="icon-status icon-status-info">
          <Icon name="bell" />
        </div>
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-xl dropdown-menu-s1">
        <div className="dropdown-head">
          <span className="sub-title nk-dropdown-title">{data.title}</span>
          <a href="#markasread" onClick={(ev) => ev.preventDefault()}>
            Mark All as Read
          </a>
        </div>
        <div className="dropdown-body">
          <div className="nk-notification">
            {data.notification.map((item) => {
              return (
                <NotificationItem
                  key={item.id}
                  id={item.id}
                  icon={item.icon}
                  iconStyle={item.iconStyle}
                  text={item.text}
                  time={item.time}
                />
              );
            })}
          </div>
        </div>
        <div className="dropdown-foot center">
          <a href="#viewall" onClick={(ev) => ev.preventDefault()}>
            View All
          </a>
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default Notification;
