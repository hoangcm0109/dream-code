import React, { useEffect } from "react";
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
import problemService from "../../apis/problem/problem.service";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import contestService from "../../apis/contest/contest.service";
const { Search } = Input;
const Problems = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const [allData, setAllData] = useState([]);
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, dataDetail) => (
        <a href={`/problem/${dataDetail.id}`}>{text}</a>
      ),
    },
    {
      title: "TotalPoint",
      dataIndex: "totalPoint",
      key: "totalPoint",
    },
    {
      title: "TimeLimit",
      dataIndex: "timeLimit",
      key: "timeLimit",
    },
    {
      title: "MemoryLimit",
      dataIndex: "memoryLimit",
      key: "memoryLimit",
    },
    {
      title: "Contest",
      key: "contest",
      dataIndex: "contest",
      render: (_, { contest }) => (
        <>
          <Tag color={"green"} key={1}>
            {/* {contest.compilerId} */}
            '1'
          </Tag>
        </>
      ),
    },
    {
      title: "Difficulty",
      key: "difficulty",
      render: (record, { id }) => (
        <Space size="middle">
          <div className="">Hard</div>
        </Space>
      ),
    },
  ];

  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  const onSearch = (value) => console.log(value);

  useEffect(() => {
    if (pathname.includes("contest")) {
      contestService.getContestById(id).then((res) => {
        if (res) {
          setAllData(res.data.problems);
        }
      });
    } else {
      problemService.getAllProblem().then((res) => {
        if (res) {
          setAllData(res.data);
        }
      });
    }
  }, [id, pathname]);

  return (
    <div className="problems">
      <div className="list-problems">
        {allData && <Table loading={allData.length === 0} columns={columns} dataSource={allData} />}
      </div>
      <div className="list-date">
        <div className="date">
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        </div>
        <div className="tag">
          <div className="tag__search">
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton="Search"
            />
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
