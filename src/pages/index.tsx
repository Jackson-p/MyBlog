import React from "react";
import Layout from "@/layout";
import "./index.less";

const weibo = require("@/static/img/weibo.png");
const gitt = require("@/static/img/gitt.png");
const zhihu = require("@/static/img/zhihu.png");

export default () => {
  return (
    <Layout>
      <div className="big-banner">
        <div className="intro-box">
          <h1>What && how to do</h1>
          <div className="img-list">
            <img src={weibo} />
            <img src={gitt} />
            <img src={zhihu} />
          </div>
        </div>
      </div>
    </Layout>
  );
};
