import React, { useCallback } from "react";
import {
  Space,
  Table,
  Button,
  Drawer,
  Row,
  Input,
  Typography,
  Col,
  Tag,
  Select,
} from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { CHANGE_DATA, CREATE_DATA } from "../constant";
import problemService from "../../../apis/problem/problem.service";
import testcaseService from "../../../apis/testcase/testcase.service";
const { Text } = Typography;
const { Option } = Select;
const style = { padding: "20px 0" };

const AdminTestCase = () => {
  const [allData, setAllData] = useState([]);
  const [type, setType] = useState("");
  const [idData, setIdData] = useState(null);
  const [open, setOpen] = useState(false);
  const [listProblem, setListProblem] = useState([]);
  const [problemId, setProblemId] = useState("");
  const [valueRequest, setValueRequest] = useState({
    input: "",
    output: "",
  });

  const getCallBack = useCallback(() => {
    testcaseService.getAllTestCase().then((res) => {
      if (res) {
        setAllData(res.data);
        console.log(res.data);
      }
    });
  }, []);

  useEffect(() => {
    problemService.getAllProblem().then((res) => {
      if (res) {
        setListProblem(res.data);
      }
    });
    getCallBack();
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Input",
      dataIndex: "input",
      key: "input",
    },

    {
      title: "Output",
      dataIndex: "output",
      key: "output",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space Bill="middle">
          <Button onClick={() => hanleShowDrawer(record)}>Change</Button>
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const hanleShowDrawer = (record) => {
    setType(CHANGE_DATA);
    setIdData(record.id);
    setOpen(true);
    testcaseService.getTestCaseById(record.id).then((res) => {
      setValueRequest({
        input: res.data.input,
        output: res.data.output,
      });
    });
  };

  const handleCreate = (record) => {
    setType(CREATE_DATA);
    setOpen(true);
    setValueRequest({
      input: "",
      output: "",
    });
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleDelete = (record) => {
    testcaseService.deleteTestCase(record.id).then((res) => {
      if (res) {
        getCallBack();
      }
    });
  };

  const onSubmit = () => {
    if (type === CREATE_DATA) {
      testcaseService.createTestCase(problemId, valueRequest).then((res) => {
        if (res) {
          getCallBack();
          setOpen(false);
        }
      });
    } else {
      const objValue = {
        ...valueRequest,
        testCaseId: idData
      }
      testcaseService.changeTestCase(idData, objValue).then((res) => {
        if (res) {
          getCallBack();
          setOpen(false);
        }
      });
    }
  };

  console.log(problemId);

  return (
    <div>
      <div style={{ margin: "15px 0" }}>
        <Button type="primary" onClick={handleCreate}>
          Create
        </Button>
      </div>
      <div className="table">
        <Table
          loading={allData.length === 0}
          columns={columns}
          dataSource={allData}
        />
      </div>
      <Drawer
        title={`${type === CHANGE_DATA ? "Change Data" : "Create Data"}`}
        width={720}
        placement="right"
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onSubmit}>
              Submit
            </Button>
          </Space>
        }
      >
        {type === CREATE_DATA && (
          <Row gutter={16} style={style}>
            <Col span={24}>
              <Text level={5}>Problem</Text>
              <Select
                showArrow
                placeholder="Select problem"
                style={{ width: "100%" }}
                value={problemId}
                onChange={(value) => setProblemId(value)}
              >
                {listProblem?.map((item, idx) => (
                  <Option value={item.id} key={idx}>
                    {item.title}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
        )}
        <Row gutter={16}>
          <Col span={24}>
            <Text level={5}>Input</Text>
            <Input
              value={valueRequest.input}
              placeholder="Please enter input"
              onChange={(e) =>
                setValueRequest({
                  ...valueRequest,
                  input: e.target.value,
                })
              }
            />
          </Col>
          <Col span={24}>
            <Text level={5}>Output</Text>
            <Input
              value={valueRequest.output}
              placeholder="Please enter output"
              onChange={(e) =>
                setValueRequest({
                  ...valueRequest,
                  output: e.target.value,
                })
              }
            />
          </Col>
        </Row>
      </Drawer>
    </div>
  );
};

export default AdminTestCase;
