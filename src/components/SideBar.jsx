import { useState } from "react";
import { Menu, ConfigProvider } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
const items = [
  {
    label: "Availibility",
    key: "availibility",
    icon: <ClockCircleOutlined />,
  },
];
const SideBar = () => {
  const [current, setCurrent] = useState("availibility");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            darkItemSelectedBg: "#404040",
            darkItemBg: "#1f1f1f",
          },
        },
      }}
    >
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="inline"
        theme="dark"
        items={items}
        style={{ height: "125vh", padding: 10 }}
      />
    </ConfigProvider>
  );
};

export default SideBar;
