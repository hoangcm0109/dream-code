import React from "react";
import { Button } from 'antd';
import "./style.scss";
import { Divider } from "antd";
const Contest = () => {
  return (
    <div className="contest">
      <div className="main-contest">
        <div className="banner">
          <img
            src="https://www.codingninjas.com/blog/wp-content/uploads/2021/06/Blog-2021-06-16T122625.322.png"
            alt=""
          />
        </div>
        <div className="list-contest">
          <Divider orientation="left">Contest series</Divider>
          <div className="list-contest-item">
            <div className="contest-content">
              <div className="img-contest">
                <img
                  src="https://leetcode.com/_next/static/images/biweekly-default-f5a8fc3be85b6c9175207fd8fd855d47.png"
                  alt=""
                />
              </div>
              <div className="text-contest">
                <p>Weekly Contest 317</p>
                <p>Oct 30, 2022 9:30 AM GMT+7</p>
              </div>
            </div>
            <div className="contest-button">
              <Button type="primary" danger>
                Tham gia
              </Button>
            </div>
          </div>
          <div className="list-contest-item">
            <div className="contest-content">
              <div className="img-contest">
                <img
                  src="https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png"
                  alt=""
                />
              </div>
              <div className="text-contest">
                <p>Weekly Contest 317</p>
                <p>Oct 30, 2022 9:30 AM GMT+7</p>
              </div>
            </div>
            <div className="contest-button">
              <Button type="primary" danger>
                Tham gia
              </Button>
            </div>
          </div>
          <div className="list-contest-item">
            <div className="contest-content">
              <div className="img-contest">
                <img
                  src="https://assets.leetcode.com/contest/weekly-contest-311/card_img_1662869934.png"
                  alt=""
                />
              </div>
              <div className="text-contest">
                <p>Weekly Contest 317</p>
                <p>Oct 30, 2022 9:30 AM GMT+7</p>
              </div>
            </div>
            <div className="contest-button">
              <Button type="primary" danger>
                Tham gia
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contest;
