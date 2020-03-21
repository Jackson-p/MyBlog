import React, { FC } from "react";
import { Row, Col, Timeline } from "antd";
import Layout from "@/layout";
import Footer from "@/components/footer";

import style from "./index.less";

const About: FC = () => (
  <Layout>
    <Row justify="start" className={style.container}>
      <Col offset={2}>
        <span>Coder</span>
        <span>
          Frontend &nbsp; | &nbsp; Web &nbsp; | &nbsp; AI &nbsp; | &nbsp;
          Backend
        </span>
        <span>Life</span>
        <span>
          Love Movie &nbsp; | &nbsp; Love Books &nbsp; | &nbsp; Love Play &nbsp;
          | &nbsp; Love Myself
        </span>
        <span>TimeLine</span>
        <div className={style.timeLine}>
          <Timeline pending="Recording...">
            <Timeline.Item>Graduated From DLUT</Timeline.Item>
            <Timeline.Item>
              Work As Frondend Developer In Kuaishou
            </Timeline.Item>
          </Timeline>
        </div>
      </Col>
    </Row>
    <Footer />
  </Layout>
);

export default About;
