import React from "react";
import { Space, Table, Calendar, Input } from "antd";
import { Tag } from "antd";
import { Divider } from "antd";
import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import "./style.scss";
const { Search } = Input;
const Problems = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  const onSearch = (value) => console.log(value);
  return (
    <div className="problems">
      <div className="list-problems">
        <Table columns={columns} dataSource={data} />
      </div>
      <div className="list-date">
        <div className="date">
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        </div>
        <div className="tag">
          <div className="tag__search">
            <Search placeholder="input search text" onSearch={onSearch} enterButton="Search" />
          </div>
          <div className="tag__list">
            <Divider orientation="left">Tredding</Divider>
            <Space size={[8, 16]} wrap className="tag__list-block">
              <Tag color="magenta">magenta</Tag>
              <Tag color="red">red</Tag>
              <Tag color="volcano">volcano</Tag>
              <Tag color="orange">orange</Tag>
              <Tag color="gold">gold</Tag>
              <Tag color="lime">lime</Tag>
              <Tag color="green">green</Tag>
              <Tag color="cyan">cyan</Tag>
              <Tag color="blue">blue</Tag>
              <Tag color="geekblue">geekblue</Tag>
              <Tag color="purple">purple</Tag>
              <Tag color="purple">purple</Tag>
              <Tag color="purple">purple</Tag>
              <Tag color="purple">purple</Tag>
              <Tag color="purple">purple</Tag>
              <Tag color="purple">purple</Tag>
              <Tag color="purple">purple</Tag>
              <Tag color="purple">purple</Tag>
              <Tag color="purple">purple</Tag>
            </Space>
            <div className="tag__list-footer">
              <Tag icon={<TwitterOutlined />} color="#55acee">
                Twitter
              </Tag>
              <Tag icon={<YoutubeOutlined />} color="#cd201f">
                Youtube
              </Tag>
              <Tag icon={<FacebookOutlined />} color="#3b5999">
                Facebook
              </Tag>
              <Tag icon={<LinkedinOutlined />} color="#55acee">
                LinkedIn
              </Tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problems;
