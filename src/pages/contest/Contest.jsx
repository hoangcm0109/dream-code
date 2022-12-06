import React, { useEffect } from "react";
import { Button } from "antd";
import "./style.scss";
import { Divider } from "antd";
import contestService from "../../apis/contest/contest.service";
import { useState } from "react";
const Contest = () => {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    contestService.getAllContest().then((res) => {
      if (res) {
        setAllData(res.data);
      }
    });
  }, []);

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
          {allData &&
            allData.map((item, index) => (
              <div className="list-contest-item">
                <div className="contest-content">
                  <div className="img-contest">
                    <img
                      src="https://leetcode.com/_next/static/images/biweekly-default-f5a8fc3be85b6c9175207fd8fd855d47.png"
                      alt=""
                    />
                  </div>
                  <div className="text-contest">
                    <p>{item.name}</p>
                    <p>{item.description}</p>
                  </div>
                </div>
                <div className="contest-button">

                  <Button type="primary" danger href={`/contest/` + item.id}>
                    Tham gia
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Contest;
