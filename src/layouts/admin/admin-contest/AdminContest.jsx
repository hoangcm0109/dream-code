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
} from "antd";
import { useEffect } from "react";
import { useState } from "react";
import contestService from "../../../apis/contest/contest.service";
import { CHANGE_DATA, CREATE_DATA } from "../constant";
const style = { padding: "20px 0" };
const { Text } = Typography;

const AdminContest = () => {
  const [allData, setAllData] = useState([]);
  const [type, setType] = useState("");
  const [idData, setIdData] = useState(null);
  const [open, setOpen] = useState(false);
  const [valueRequest, setValueRequest] = useState({
    name: "",
    password: "",
    startTime: "",
    endTime: "",
    description: "",
    status: "",
  });
  const getCallBack = useCallback(() => {
    contestService.getAllContest().then((res) => {
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
      title: "name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <Space Bill="middle">
          <Tag color="green">{record.name}</Tag>
        </Space>
      ),
    },

    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "startTime",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space Bill="middle">
          <Space size="middle">
            <Button onClick={() => hanleShowDrawer(record)}>Change</Button>
            <Button type="primary" danger onClick={() => handleDelete(record)}>
              Delete
            </Button>
          </Space>
        </Space>
      ),
    },
  ];

  const hanleShowDrawer = (record) => {
    setType(CHANGE_DATA);
    setIdData(record.id);
    setOpen(true);
    contestService.getContestById(record.id).then((res) => {
      if (res) {
        setValueRequest(res.data);
      }
    });
  };

  const handleCreate = (record) => {
    setType(CREATE_DATA);
    setOpen(true);
    setValueRequest({
      name: "",
      password: "",
      startTime: "",
      endTime: "",
      description: "",
      status: "",
    });
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleDelete = (record) => {
    contestService.deleteContest(record.id).then((res) => {
      if (res) {
        getCallBack();
      }
    });
  };

  const onSubmit = () => {
    delete valueRequest?.problems;
    delete valueRequest?.id;
    if (type === CREATE_DATA) {
      contestService.createContest(valueRequest).then((res) => {
        if (res) {
          getCallBack();
          setOpen(false);
        }
      });
    } else {
      contestService.changeContest(idData, valueRequest).then((res) => {
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
        <Row gutter={16} style={style}>
          <Col span={12}>
            <Text level={5}>Name</Text>
            <Input
              value={valueRequest.name}
              onChange={(e) =>
                setValueRequest({
                  ...valueRequest,
                  name: e.target.value,
                })
              }
            />
          </Col>
          <Col span={12}>
            <Text level={5}>Password</Text>
            <Input
              value={valueRequest.password}
              onChange={(e) =>
                setValueRequest({
                  ...valueRequest,
                  password: Number(e.target.value),
                })
              }
            />
          </Col>
        </Row>
        <Row gutter={16} style={style}>
          <Col span={12}>
            <Text level={5}>startTime</Text>
            <Input
              value={valueRequest.startTime}
              onChange={(e) =>
                setValueRequest({
                  ...valueRequest,
                  startTime: e.target.value,
                })
              }
            />
          </Col>
          <Col span={12}>
            <Text level={5}>endTime</Text>
            <Input
              value={valueRequest.endTime}
              onChange={(e) =>
                setValueRequest({
                  ...valueRequest,
                  endTime: Number(e.target.value),
                })
              }
            />
          </Col>
        </Row>
        <Row gutter={16} style={style}>
          <Col span={12}>
            <Text level={5}>description</Text>
            <Input
              value={valueRequest.description}
              onChange={(e) =>
                setValueRequest({
                  ...valueRequest,
                  description: e.target.value,
                })
              }
            />
          </Col>
          <Col span={12}>
            <Text level={5}>status</Text>
            <Input
              value={valueRequest.status}
              onChange={(e) =>
                setValueRequest({
                  ...valueRequest,
                  status: Number(e.target.value),
                })
              }
            />
          </Col>
        </Row>
      </Drawer>
    </div>
  );
};

export default AdminContest;
