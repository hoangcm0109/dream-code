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
import { CHANGE_DATA, CREATE_DATA } from "../constant";
import userService from "../../../apis/user/user.service";
const { Text } = Typography;
const style = { padding: "20px 0" };

const AdminUser = () => {
  const [allData, setAllData] = useState([]);
  const [type, setType] = useState("");
  const [idData, setIdData] = useState(null);
  const [open, setOpen] = useState(false);
  const [valueRequest, setValueRequest] = useState({
    birthday: "",
    fullName: "",
    gender: "",
    password: "",
    username: "",
  });
  const getCallBack = useCallback(() => {
    userService.getAllUser().then((res) => {
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
      title: "fullName",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "role",
      dataIndex: "role",
      key: "role",
      render: (_, record) => (
        <Space Bill="middle">
          <Tag color="green">{record?.role?.name}</Tag>
        </Space>
      ),
    },
    {
      title: "birthday",
      dataIndex: "birthday",
      key: "birthday",
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
    userService.getUserById(record.id).then((res) => {
      setValueRequest(res.data);
    });
  };

  const handleCreate = (record) => {
    setType(CREATE_DATA);
    setOpen(true);
    setValueRequest({
      birthday: "",
      fullName: "",
      gender: "",
      password: "",
      username: "",
    });
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleDelete = (record) => {
    userService.deleteUser(record.id).then((res) => {
      if (res) {
        getCallBack();
      }
    });
  };

  const onSubmit = () => {
    if (type === CREATE_DATA) {
      userService.createUser(valueRequest).then((res) => {
        if (res) {
          getCallBack();
          setOpen(false);
        }
      });
    } else {
      delete valueRequest?.role;
      delete valueRequest?.id;
      userService.changeUser(idData, valueRequest).then((res) => {
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
          <Col span={24}>
            <Text level={5}>fullName</Text>
            <Input
              value={valueRequest.fullName}
              placeholder="Please enter user name"
              onChange={(e) =>
                setValueRequest({
                  ...valueRequest,
                  fullName: e.target.value,
                })
              }
            />
          </Col>
        </Row>
        <Row gutter={16} style={style}>
          <Col span={12}>
            <Text level={5}>Username</Text>
            <Input
              value={valueRequest.username}
              placeholder="Please enter user name"
              onChange={(e) =>
                setValueRequest({
                  ...valueRequest,
                  username: e.target.value,
                })
              }
            />
          </Col>
          <Col span={12}>
            <Text level={5}>Password</Text>
            <Input
              value={valueRequest.password}
              placeholder="Please enter user name"
              onChange={(e) =>
                setValueRequest({
                  ...valueRequest,
                  password: e.target.value,
                })
              }
            />
          </Col>
        </Row>
        <Row gutter={16} style={style}>
          <Col span={12}>
            <Text level={5}>birthday</Text>
            <Input
              value={valueRequest.birthday}
              placeholder="Please enter user name"
              onChange={(e) =>
                setValueRequest({
                  ...valueRequest,
                  birthday: e.target.value,
                })
              }
            />
          </Col>
          <Col span={12}>
            <Text level={5}>gender</Text>
            <Input
              value={valueRequest.gender}
              placeholder="Please enter user name"
              onChange={(e) =>
                setValueRequest({
                  ...valueRequest,
                  gender: e.target.value,
                })
              }
            />
          </Col>
        </Row>
      </Drawer>
    </div>
  );
};

export default AdminUser;
