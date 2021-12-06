import React, { useState } from "react";
import Tab from "../../../Common/Tab";

const TabSwitcher = () => {
  const [active, setActive] = useState(true);
  return (
    <div className="inline-block float-right">
      <Tab>
        <Tab.Item active={active} onClick={() => setActive(true)}>
          Rich Text
        </Tab.Item>
        <Tab.Item active={!active} onClick={() => setActive(false)}>
          Markdown
        </Tab.Item>
      </Tab>
    </div>
  );
};

export default TabSwitcher;
