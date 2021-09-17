import { Menu } from "antd";
import React from "react";
import { useHistory } from "react-router";

const MainLayout = () => {
  const history = useHistory();
  const menuItems = [
    "Home",
    "Profile",
    "Kidzie Catalogue",
    "Sales",
    "Orders",
    "Reports",
    "Products",
    "Returns",
    "Shipments",
    "Statements",
    "Partners",
    "Teams",
    "Communications",
    "Logout",
  ];

  return (
    <Menu style={{ margin: "10px", backgroundColor: "#faf6e6" }}>
      {menuItems.map((x: any, index: number) => {
        return (
          <Menu.Item
            onClick={() => history.push(`/${x}`)}
            style={{
              borderBottom: "2px solid #ba9541",
            }}
            key={index}
          >
            {x}
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default MainLayout;
