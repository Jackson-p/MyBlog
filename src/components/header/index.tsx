import React, { FC } from "react";
import { Link, withRouter } from "umi";
import { Row, Col } from "antd";

import "./index.less";
const avatur = require("@/static/img/head.jpg");

const Header: FC = (props: any) => {
  const {
    location: { pathname }
  } = props;

  const backColorStyle = {
    backgroundColor: (pathname === "/" && "currentColor") || "#FFFFFF"
  };
  return (
    <Row
      className="container"
      align="middle"
      justify="space-between"
      style={backColorStyle}
    >
      <Col className="user" span={4} offset={2}>
        <img src={avatur} />
        <h1>Jackson</h1>
      </Col>
      <Col className="nav" span={8}>
        {["/", "/Articles", "/Stack", "/About"].map(val => (
          <Link
            to={val}
            className={(val === pathname && "chosen") || ""}
            key={val}
          >
            {(val === "/" && "Home") || val.slice(1)}
          </Link>
        ))}
      </Col>
    </Row>
  );
};

export default withRouter(Header);
