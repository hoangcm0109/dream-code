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
  Select,
} from "antd";
import { useEffect } from "react";

import { useState } from "react";
import problemService from "../../../apis/problem/problem.service";
import toast from "react-hot-toast";
import contestService from "../../../apis/contest/contest.service";
import testcaseService from "../../../apis/testcase/testcase.service";

const { TextArea } = Input;
const { Text } = Typography;
const { Option } = Select;
const style = { padding: "20px 0" };

export const CHANGE_DATA = "CHANGE_DATA";
export const CREATE_DATA = "CREATE_DATA";

const AdminProblem = () => {
  const [allData, setAllData] = useState([]);
  const [type, setType] = useState("");
  const [idData, setIdData] = useState(null);
  const [open, setOpen] = useState(false);
  const [dataMulti, setDataMulti] = useState({
    listContestId: [],
    lstTestCase: [],
  });
  const [valueRequest, setValueRequest] = useState({
    content: "",
    contestId: "",
    lstTestCase: [],
    memoryLimit: "",
    timeLimit: "",
    title: "",
    totalPoint: "",
  });

  useEffect(() => {
    contestService.getAllContest().then((res) => {
      if (res) {
        setDataMulti((prev) => ({
          ...prev,
          listContestId: res.data,
        }));
      }
    });
    testcaseService.getAllTestCase().then((res) => {
      if (res) {
        setDataMulti((prev) => ({
          ...prev,
          lstTestCase: res.data,
        }));
      }
    });
  }, []);

  const getCallBack = useCallback(() => {
    problemService.getAllProblem().then((res) => {
      if (res) {
        setAllData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    getCallBack();
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "totalPoint",
      dataIndex: "totalPoint",
      key: "totalPoint",
    },
    {
      title: "timeLimit",
      dataIndex: "timeLimit",
      key: "timeLimit",
    },
    {
      title: "memoryLimit",
      dataIndex: "memoryLimit",
      key: "memoryLimit",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
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
    problemService.getProblemById(record.id).then((res) => {
      setValueRequest({
        ...res.data,
        lstTestCase: res.data?.testCases.map((item) => item.id),
        contestId: res.data?.contest.id,
      });
    });
  };

  const handleCreate = (record) => {
    setType(CREATE_DATA);
    setOpen(true);
    setValueRequest({
      content: "",
      contestId: "",
      lstTestCase: [],
      memoryLimit: "",
      timeLimit: "",
      title: "",
      totalPoint: "",
    });
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleDelete = (record) => {
    problemService.deleteProblem(record.id).then((res) => {
      if (res) {
        toast.success("Successfully delete!");
        getCallBack();
      }
    });
  };

  const onSubmit = () => {
    const parseDataLstTestcase = dataMulti.lstTestCase
      .filter((item) => valueRequest.lstTestCase.includes(item.id))
      .map((itemObj) => ({
        input: itemObj.input,
        output: itemObj.output,
      }));
    const dataRequest = {
      ...valueRequest,
      lstTestCase: parseDataLstTestcase,
    };
    delete dataRequest?.contest;
    delete dataRequest?.testCases;
    delete dataRequest?.compilerId;
    if (type === CREATE_DATA) {
      problemService.createProblem(dataRequest).then((res) => {
        if (res) {
          toast.success("Successfully create!");
          getCallBack();
          setOpen(false);
        }
      });
    } else {
      problemService.changeProblem(idData, dataRequest).then((res) => {
        if (res) {
          getCallBack();
          setOpen(false);
        }
      });
    }
  };

  return (
    <div>
      <div style={{ margin: "15px 0" }}>
        <Button type="primary" onClick={handleCreate}>
          Create
        </Button>
      </div>
      <div className="table">
        <Table loading={allData.length === 0} columns={columns} dataSource={allData} />
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
        <Row gutter={16} style={style}>
          <Col span={12}>
            <Text level={5}>Title</Text>
            <Input
              value={valueRequest.title}
              onChange={(e) =>
                setValueRequest({
                  ...valueRequest,
                  title: e.target.value,
                })
              }
            />
          </Col>
          <Col span={12}>
            <Text level={5}>totalPoint</Text>
            <Input
              value={valueRequest.totalPoint}
              onChange={(e) =>
                setValueRequest({
                  ...valueRequest,
                  totalPoint: Number(e.target.value),
                })
              }
            />
          </Col>
        </Row>
        <Row gutter={16} style={style}>
          <Col span={12}>
            <Text level={5}>memoryLimit</Text>
            <Input
              value={valueRequest.memoryLimit}
              onChange={(e) =>
                setValueRequest({
                  ...valueRequest,
                  memoryLimit: Number(e.target.value),
                })
              }
            />
          </Col>
          <Col span={12}>
            <Text level={5}>timeLimit</Text>
            <Input
              value={valueRequest.timeLimit}
              onChange={(e) =>
                setValueRequest({
                  ...valueRequest,
                  timeLimit: Number(e.target.value),
                })
              }
            />
          </Col>
        </Row>
        <Row gutter={16} style={style}>
          <Text level={5}>Content</Text>
          <TextArea
            showCount
            maxLength={100}
            style={{
              height: 200,
              width: "100%",
            }}
            value={valueRequest.content}
            onChange={(e) =>
              setValueRequest({
                ...valueRequest,
                content: e.target.value,
              })
            }
            placeholder="Content"
          />
        </Row>
        <Row gutter={16} style={style}>
          <Col span={12}>
            <Text level={5}>Contest</Text>
            <Select
              showArrow
              placeholder="Select tags"
              style={{ width: "100%" }}
              value={valueRequest.contestId}
              onChange={(value) =>
                setValueRequest({
                  ...valueRequest,
                  contestId: value,
                })
              }
            >
              {dataMulti?.listContestId?.map((item, idx) => (
                <Option value={item.id} key={idx}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={12}>
            <Text level={5}>Test case</Text>
            <Select
              showArrow
              mode="multiple"
              placeholder="Select tags"
              style={{ width: "100%" }}
              value={valueRequest.lstTestCase}
              onChange={(value) =>
                setValueRequest({
                  ...valueRequest,
                  lstTestCase: value,
                })
              }
            >
              {dataMulti?.lstTestCase?.map((item, idx) => (
                <Option value={item.id} key={idx}>
                  Input: <strong>{item.input}</strong>, Output:{" "}
                  <strong>{item.output}</strong>
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Drawer>
    </div>
  );
};

export default AdminProblem;
