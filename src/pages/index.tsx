import React from "react";
import Layout from "@/layout";
import style from "./index.less";

const weibo = require("@/static/img/weibo.png");
const gitt = require("@/static/img/gitt.png");
const zhihu = require("@/static/img/zhihu.png");

export default () => {
  return (
    <Layout>
      <div className={style.bigBanner}>
        <div className={style.introBox}>
          <h1>What && how to do</h1>
          <div className={style.imgList}>
            <img src={weibo} />
            <img src={gitt} />
            <img src={zhihu} />
          </div>
        </div>
      </div>
    </Layout>
  );
};
