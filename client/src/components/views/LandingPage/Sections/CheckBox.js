import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

function CheckBox(props) {
  const [Checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    // 누른 항목의 Index를 구하고,
    const currentIndex = Checked.indexOf(value);
    // 전체 Checked된 State에서 현재 누른 Checkbox가 이미 있다면
    const newChecked = [...Checked];

    // 현재 State에 넣어준다.
    if (currentIndex === -1) {
      newChecked.push(value);
      // 없다면 현재 State에서 빼준다.
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    // LandingPage.js에 newChecked 배열 전달
    props.handleFilters(newChecked);
  };

  const renderCheckboxLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          checked={Checked.indexOf(value._id) === -1 ? false : true}
        />
        <span>{value.name}</span>
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="Continents" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
