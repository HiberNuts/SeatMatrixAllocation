import React, { useEffect, useState } from "react";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import UserAvatar from "../../../../components/user/UserAvatar";
import { backendURL } from "../../../../backendurl";
const User = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(false);

  const toggle = () => setOpen((prevState) => !prevState);

  const handleSignout = () => {
    localStorage.removeItem("accessToken");
  };

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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCollegeInfo();
  }, []);
  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <UserAvatar icon="user-alt" className="sm" />
          <div className="user-info d-none d-md-block">
            <div className="user-status">Administrator</div>
            <div className="user-name dropdown-indicator">{data.can}</div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-md dropdown-menu-s1">
        {/* <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              <span>CN</span>
            </div>
            <div className="user-info">
              <span className="lead-text">{data.name}</span>
              <span className="sub-text">Mail ID</span>
            </div>
          </div>
        </div> */}
        {/* <div className="dropdown-inner">
          <LinkList>
            <LinkItem link="/user-profile-regular" icon="user-alt" onClick={toggle}>
              View Profile
            </LinkItem>
            <LinkItem link="/user-profile-setting" icon="setting-alt" onClick={toggle}>
              Account Setting
            </LinkItem>
          </LinkList>
        </div> */}
        <div className="dropdown-inner">
          <LinkList>
            {/* <a href="https://youtu.be/cQi4x03U12E" target="_blank">
              <Icon name="link"></Icon>
              <span>Video Demo</span>
            </a> */}
            <a
              href="https://drive.google.com/file/d/1pXIci9A25JDqATavp6jHKLtUDmtn_vLi/view?usp=share_link"
              target="_blank"
            >
              <Icon name="link"></Icon>
              <span>Video Tutorial</span>
            </a>
          </LinkList>
          <LinkList>
            <a href={`${process.env.PUBLIC_URL}/auth-login`} onClick={handleSignout}>
              <Icon name="signout"></Icon>
              <span>Sign Out</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
