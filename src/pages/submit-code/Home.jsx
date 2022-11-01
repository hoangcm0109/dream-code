import { Collapse } from "antd";
import { Select } from "antd";
import { Button, message, Upload, Statistic } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Editor from "@monaco-editor/react";
import React from "react";
import "./home.scss";

const { Panel } = Collapse;
const { Option } = Select;
const { Countdown } = Statistic;

const Home = () => {
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onChange = (key) => {
    console.log(key);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onFinish = () => {
    console.log("finished!");
  };

  return (
    <div className="submit">
      <div className="submit__question">
        <h1>1. Two Sum</h1>

        <p>
          Given an array of integers nums and an integer target, return indices of the two numbers
          such that they add up to target. You may assume that each input would have exactly one
          solution, and you may not use the same element twice. You can return the answer in any
          order.
        </p>

        <div className="submit__example">
          <label>Example 1:</label>
          <div className="submit__result">
            <div>
              Input: nums = [2,7,11,15], target = 9 Output: [0,1] Explanation: Because nums[0] +
              nums[1] == 9, we return [0, 1].
            </div>
            <div>
              Input: nums = [2,7,11,15], target = 9 Output: [0,1] Explanation: Because nums[0] +
              nums[1] == 9, we return [0, 1].
            </div>
            <div>
              Input: nums = [2,7,11,15], target = 9 Output: [0,1] Explanation: Because nums[0] +
              nums[1] == 9, we return [0, 1].
            </div>
          </div>
        </div>
        <div className="submit__example">
          <label>Example 2:</label>
          <div className="submit__result">
            <div>
              Input: nums = [2,7,11,15], target = 9 Output: [0,1] Explanation: Because nums[0] +
              nums[1] == 9, we return [0, 1].
            </div>
            <div>
              Input: nums = [2,7,11,15], target = 9 Output: [0,1] Explanation: Because nums[0] +
              nums[1] == 9, we return [0, 1].
            </div>
            <div>
              Input: nums = [2,7,11,15], target = 9 Output: [0,1] Explanation: Because nums[0] +
              nums[1] == 9, we return [0, 1].
            </div>
          </div>
        </div>

        <div className="submit__testcase">
          <Collapse onChange={onChange}>
            <Panel header="This is test case 1" key="1">
              <Collapse defaultActiveKey="1">
                <Panel header="This is panel nest panel" key="1">
                  <div>{text}</div>
                </Panel>
              </Collapse>
            </Panel>
            <Panel header="This is test case 2" key="2">
              <div>{text}</div>
            </Panel>
            <Panel header="This is test case 3" key="3">
              <div>{text}</div>
            </Panel>
          </Collapse>
        </div>
      </div>
      <div className="submit__coding">
        <div className="coding__control">
          <div>
            <Select
              defaultValue="Javascript"
              style={{
                width: 120,
                marginRight: "10px",
              }}
              onChange={handleChange}
            >
              <Option value="jack">Javascript</Option>
              <Option value="lucy">Java</Option>
              <Option value="disabled">C++</Option>
              <Option value="Yiminghe">C</Option>
            </Select>

            {/* Theme */}
            <Select
              defaultValue="vs-dark"
              style={{
                width: 120,
              }}
              onChange={handleChange}
            >
              <Option value="jack">vs-dark</Option>
              <Option value="lucy">Monokai</Option>
              <Option value="disabled">light</Option>
              <Option value="Yiminghe">dracula</Option>
            </Select>
          </div>

          <Countdown value={deadline} onFinish={onFinish} />
        </div>
        <div className="coding__main">
          <Editor
            height="75vh"
            className="editor" // By default, it fully fits with its parent
            theme={"vs-dark"}
            language={"javascript"}
            // loading={<Loader />}
            // value={examples[language]}
            // editorDidMount={handleEditorDidMount}
          />
        </div>
        <div className="coding_upload">
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
        <div className="coding__panel">
          <Button
            type="primary"
            style={{ marginRight: "10px" }}
            loading={true}
            onClick={() => undefined}
          >
            Run code
          </Button>
          <Button danger type="primary" loading={false} onClick={() => undefined}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
