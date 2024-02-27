import "./App.css";
import "./custom.css";

import type { GetProp, RadioChangeEvent } from "antd";
import { useState } from "react";

import { Radio, Space, Switch, Checkbox, Button, ConfigProvider } from "antd";

import { CheckboxValueType } from "antd/lib/checkbox/Group";

import { data } from "./data";

import { theme } from "./theme";

function App() {
  // Options for the checkbox group
  const options = [
    { label: "Redux", value: 0 },
    { label: "Lodash", value: 1 },
    { label: "Ant design", value: 2 },
    { label: "Webpack", value: 3 },
    { label: "Other", value: 4 },
  ];

  // Parsing tools used options from data and initializing state
  const toolsUsedOptions = data.toolsUsed
    .split(",")
    .map((value) => parseInt(value, 10) as CheckboxValueType);

  const [editable, setEditable] = useState<boolean>(true);

  const [radio, setRadio] = useState<boolean>(data.isProficient);

  const [toolsUsedValue, setToolsUsedValue] =
    useState<CheckboxValueType[]>(toolsUsedOptions);

  // Handler for checkbox group change
  const onCheckBoxChange: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    setToolsUsedValue(checkedValues as CheckboxValueType[]);
  };

  // Handler for radio button change
  const onRadioChange = (e: RadioChangeEvent) => {
    setRadio(e.target.value);
  };


  const onProcessClicked = () => {
    const updatedData = {
      isProficient: radio,
      toolsUsed: toolsUsedValue.join(","),
    };
    console.log("Data:", updatedData);
  };

  const buttonStyle = {
    backgroundColor: editable ? "#6B47ED" : "#D4CCF7",
  };

  return (
    <ConfigProvider theme={theme}>
      <div className="w-2/5 m-auto">
        {/* Editable */}
        <div className="flex justify-between my-4">
          <p className="text-base">Editable</p>
          <Switch
            defaultChecked
            className="custom-switch"
            onChange={(_) => setEditable((prev) => !prev)}
          />
        </div>
        {/* Yes/no */}
        <div className="flex flex-col text-justify my-2 h-32 justify-around">
          <p className="w-5/6 text-lg font-bold text-wrap">
            Are you proficient in ReactJS development?
          </p>
          <Radio.Group
            value={radio}
            disabled={!editable}
            onChange={onRadioChange}
          >
            <Space direction="vertical">
              <Radio value={false}>No</Radio>
              <Radio value={true}>Yes</Radio>
            </Space>
          </Radio.Group>
        </div>
        {/* CheckBox*/}
        <div className="flex flex-col text-justify my-2 h-60 justify-evenly">
          <p className="text-lg font-bold">Which tools do you use?</p>
          <p className="text-base" style={{ color: "#616161" }}>
            Please select all that apply.
          </p>
          <Checkbox.Group
            className="flex-col grow justify-evenly"
            disabled={!editable}
            options={options}
            defaultValue={toolsUsedValue}
            onChange={onCheckBoxChange}
          />
        </div>
        {/* Process button*/}
        <Button
          className="font-semibold text-lg custom-button"
          style={buttonStyle}
          disabled={!editable}
          onClick={onProcessClicked}
          shape="round"
        >
          Process
        </Button>
      </div>
    </ConfigProvider>
  );
}

export default App;
