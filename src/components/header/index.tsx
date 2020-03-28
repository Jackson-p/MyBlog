import React, { FC } from "react";
import { Link, withRouter } from "umi";
import { Row, Col } from "antd";

import style from "./index.less";
const avatur = require("@/static/img/head.jpg");

const Header: FC = (props: any) => {
  let {
    location: { pathname }
  } = props;
  // 考虑到情况比较简单，这里没必要写正则了
  pathname = (pathname.indexOf("Articles") > 0 && "/Articles") || pathname;
  const backColorStyle = {
    backgroundColor: (pathname === "/" && "currentColor") || "#FFFFFF"
  };
  return (
    <Row
      className={style.container}
      align="middle"
      justify="space-between"
      style={backColorStyle}
    >
      <Col
        className={style.user}
        md={{ span: 4, offset: 2 }}
        span={4}
        offset={0}
      >
        <img src={avatur} />
        <h1>Jackson</h1>
      </Col>
      <Col className={style.nav} span={8}>
        {["/", "/Articles", "/Stack", "/About"].map(val => (
          <Link
            to={val}
            className={(val === pathname && style.chosen) || ""}
            key={val}
          >
            {(val === "/" && "Home") || val.slice(1)}
          </Link>
        ))}
      </Col>
      <div className={style.resNav}>
        <input
          type="checkbox"
          id={style.checkbox}
          style={{ display: "none" }}
        />
        <ul className={style.resList}>
          {["/", "/Articles", "/Stack", "/About"].map(val => (
            <Link
              to={val}
              className={(val === pathname && style.chosen) || ""}
              key={val}
            >
              {(val === "/" && "Home") || val.slice(1)}
            </Link>
          ))}
        </ul>
        <label className={style.respmenu} htmlFor={style.checkbox}>
          <span className={style.respIcon}></span>
          <span className={style.respIcon}></span>
          <span className={style.respIcon}></span>
        </label>
      </div>
    </Row>
  );
};

export default withRouter(Header);
