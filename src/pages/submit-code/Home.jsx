import { Collapse } from "antd";
import { Select } from "antd";
import { Button, message, Upload, Statistic } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Editor from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import "./home.scss";
import problemService from "../../apis/problem/problem.service";
import { useParams } from "react-router-dom";
import submitCodeService from "../../apis/submit-code/submit-code.service";
import { cpp } from "./dataLanguage";

const { Panel } = Collapse;
const { Option } = Select;
const { Countdown } = Statistic;

const deadline = Date.now() + 1000 * 60 * 60;

const Home = () => {
  const { id } = useParams();
  const [dataDetailProblem, setDataDetailProblem] = useState({});
  const [timeLimit, setTimelimit] = useState(deadline);
  const [lang, setLang] = useState("cpp");
  const [theme, setTheme] = useState("vs-dark");
  const [codeSubmit, setCodeSubmit] = useState("");
  const [listTestCase, setListTestCase] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [listResult, setListResult] = useState([]);

  const text = `
  Test cases will be hidden
`;

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

  const handleChangeLang = (value) => {
    console.log(`selected ${value}`);
    setLang(value);
  };

  const handleChangeTheme = (value) => {
    console.log(`selected ${value}`);
    setTheme(value);
  };

  const onFinish = () => {
    console.log("finished!");
  };

  useEffect(() => {
    problemService.getProblemById(id).then((res) => {
      if (res) {
        setDataDetailProblem(res.data);
        setTimelimit(res.data.timeLimit);
        setListTestCase(res.data.testCases);
        console.log(res);
      }
    });
  }, []);

  const handleEditorChange = (value, event) => {
    setCodeSubmit(value);
  };

  const handleSubmitFinal = () => {
    setLoadingSubmit(true);
    const formData = new FormData();
    formData.append("lang", lang);
    formData.append("problemId", id);
    formData.append("sourceString", codeSubmit);
    submitCodeService.submitCode(formData).then((res) => {
      if (res) {
        setLoadingSubmit(false);
        setListResult(res.data.data);
      }
    });
  };

  return (
    <div className="submit">
      <div className="submit__question">
        <h1>{dataDetailProblem.title}</h1>

        <p>{dataDetailProblem.content}</p>

        {listTestCase &&
          listTestCase.slice(0, 2).map((itemTest, idx) => (
            <div className="submit__example" key={itemTest.id}>
              <label>Example {idx + 1}:</label>
              <div className="submit__result">
                <div>
                  <strong>Input</strong>: {itemTest.input}
                  <br />
                  <strong>Output</strong>: {itemTest.output}
                </div>
              </div>
            </div>
          ))}

        <div className="submit__testcase">
          <Collapse onChange={onChange}>
            {listTestCase &&
              listTestCase.map((itemTest, idx) => (
                <Panel
                  header={`This is test case ${idx + 1}`}
                  key={itemTest.id}
                  className={listResult.length !== 0 ? 'site-collapse-custom-panel' : ''}
                  style={{
                    background:
                    listResult.length === 0 ? '' : 
                      listResult[idx]?.message !== "Accepted"
                        ? "#ff4d4f"
                        : "#6abe39",
                  }}
                >
                  <div>{text}</div>
                </Panel>
              ))}
          </Collapse>
        </div>
      </div>
      <div className="submit__coding">
        <div className="coding__control">
          <div>
            <Select
              defaultValue="C++"
              style={{
                width: 120,
                marginRight: "10px",
              }}
              onChange={handleChangeLang}
            >
              <Option value="javascript">Javascript</Option>
              <Option value="java">Java</Option>
              <Option value="cpp">C++</Option>
              <Option value="c">C</Option>
            </Select>

            {/* Theme */}
            <Select
              defaultValue="vs-dark"
              style={{
                width: 120,
              }}
              onChange={handleChangeTheme}
            >
              <Option value="vs-dark">vs-dark</Option>
              <Option value="Monokai">Monokai</Option>
              <Option value="disabled">light</Option>
              <Option value="Yiminghe">dracula</Option>
            </Select>
          </div>

          <Countdown
            value={new Date().setSeconds(new Date().getSeconds() + timeLimit)}
            onFinish={onFinish}
            format="HH:mm:ss"
          />
        </div>
        <div className="coding__main">
          <Editor
            height="75vh"
            className="editor" // By default, it fully fits with its parent
            theme={theme}
            language={lang}
            // loading={<Loader />}
            value={cpp}
            onChange={handleEditorChange}
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
            End Contest
          </Button>
          <Button
            danger
            type="primary"
            loading={loadingSubmit}
            onClick={handleSubmitFinal}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
