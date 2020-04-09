import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { findLast } from "lodash";
import SubMenu from "antd/lib/menu/SubMenu";
import MenuItem from "antd/lib/menu/MenuItem";
import * as _ from 'lodash'
import { history } from "../../../redux/store";

const sidebarMenu = [
  {
    key: "property",
    text: "Dự án",
    url: "/projects",
    icon: "project",
  },
  // {
  //   key: "transaction",
  //   text: "Giao dịch",
  //   url: "/transactions",
  //   icon: "apartment",
  // },
  // {
  //   // key: "processing",
  //   key: "processing",
  //   text: "Đang xử lý",
  //   url: "/transactions/processing",
  //   icon: "project",
  // },
  // {
  //   // key: "completed",
  //   key: "completed",
  //   text: "Hoàn thành",
  //   url: "/transactions/completed",
  //   icon: "project",
  // },
  // {
  //   // key: "canceled",
  //   key: "canceled",
  //   text: "Đã hủy",
  //   url: "/transactions/canceled",
  //   icon: "project",
  // },
  {
    key: "transactions",
    text: "Giao dịchv2",
    url: "/transactions",
    icon: "apartment",
    subMenu: [
      {
        key: "processing",
        text: "Đang xử lý",
        url: "/transactions/processing",
        icon: "project",
      },
      {
        key: "completed",
        text: "Hoàn thành",
        url: "/transactions/completed",
        icon: "project",
      },
      {
        key: "canceled",
        text: "Đã hủy",
        url: "/transactions/canceled",
        icon: "project",
      },
    ],
  },
  {
    key: "collaborators",
    text: "Người môi giới",
    url: "/realtors",
    icon: "user",
  },
  {
    key: "mail",
    text: "Hộp thư",
    url: "/inbox",
    icon: "inbox",
  },
  {
    key: "events",
    text: "Sự kiện",
    url: "/events",
    icon: "schedule",
  },
  {
    key: "education",
    text: "Đào tạo",
    url: "/trainings",
    icon: "audit",
  },
  {
    key: "online-support",
    text: "Hỗ trợ trực tuyến",
    url: "/online-supports",
    icon: "solution",
  },
  {
    key: "staff",
    text: "Quản trị viên",
    url: "/staffs",
    icon: "tool",
  },
  {
    key: "Partner",
    text: "Partner",
    url: "/partners",
    icon: "team",
  },
  {
    key: "option",
    text: "Cài đặt",
    url: "/options",
    icon: "setting",
  },
];

// Flatten sidebar menu
const sidebarMenuFlatten = _.map(
  _.flatMap(sidebarMenu, item => {
    if (item.subMenu) {
      return _.map(item.subMenu, subMenuItem => ({
        ...subMenuItem,
        parent: item.key, // gán parent của submenu
      }));
    }
    return item;
  }))

export default class SideBarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // current : "dashboard",
      defaultSelectedKeys: findLast(
        sidebarMenuFlatten,
        (menu) => window.location.pathname.indexOf(menu.url) === 0,
      ) || { key: "dashboard" },

    };
  }


  render() {
    return (
      <Menu
        mode="inline"
        defaultSelectedKeys={this.state.defaultSelectedKeys.key}
        defaultOpenKeys={
          this.state.defaultSelectedKeys.parent === "transactions"
            ? ["transactions"]
            : []
        }
        location={this.props.children}
        className="sidebarMenu"
      >
        <Menu.Item key="dashboard" onClick={() => history.push("/")}>
          <span>
            <Icon type="dashboard" />
            <span>Dashboard</span>
          </span>
        </Menu.Item>
        {sidebarMenu.map((el) => {
          if (el.subMenu && el.subMenu.length > 0) {
            return (
              <Menu.SubMenu
                key={el.key}
                title={(
                  <span>
                    <Icon type="apartment" />
                    <span>{el.text}</span>
                  </span>
                )}
              >
                {el.subMenu.map((sube) => (
                  <Menu.Item
                    key={sube.key}
                    onClick={() => history.push(sube.url)}
                  >
                    <span>
                      <Icon type={sube.icon} />
                      <span>{sube.text}</span>
                    </span>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            );
          }
          return (
            <Menu.Item key={el.key} onClick={() => history.push(el.url)}>
              <span>
                <Icon type={el.icon} />
                <span>{el.text}</span>
              </span>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
}
