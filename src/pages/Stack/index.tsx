import React, { FC } from "react";
import Layout from "@/layout";
import Footer from "@/components/footer";

import { Row, Col, Card } from "antd";

import stackData from "./config";
import style from "./index.less";

const colors = [
  "#eb2f96",
  "#f5222d",
  "#fa541c",
  "#fa8c16",
  "#faad14",
  "#a0d911",
  "#52c41a",
  "#13c2c2",
  "#2f54eb",
  "#f50",
  "#2db7f5",
  "#87d068",
  "#108ee9"
];

const getRandomColor = () =>
  colors[Math.ceil(Math.random() * (colors.length - 1))];

const Stack: FC = () => {
  const allCards = [];
  for (let area in stackData) {
    // 没渲染主部分的时候这两个变量要初始化一下
    const cardTitle = <h1>{area}</h1>;
    const cardList = [];
    for (let point in stackData[area]) {
      const singeCard = (
        <Card title={point} className={style.singleCard}>
          {stackData[area][point].map((val: string) => (
            <p key={val}>
              <span style={{ backgroundColor: getRandomColor() }}>
                {val[0].toUpperCase()}
              </span>
              {val}
            </p>
          ))}
        </Card>
      );
      cardList.push(singeCard);
    }
    allCards.push(
      <>
        {cardTitle}
        <hr />
        <Row align="top" justify="start" gutter={12}>
          {cardList.map((val, index) => (
            <Col
              key={`${cardTitle}${index}`}
              md={{ span: 6 }}
              span={24}
              flex="wrap"
            >
              {val}
            </Col>
          ))}
        </Row>
      </>
    );
  }
  return (
    <Layout>
      <div className={style.container}>
        {allCards.map((val, index) => (
          <div className={style.area} key={`allCards${index}`}>
            {val}
          </div>
        ))}
      </div>
      <Row className={style.footer}>
        <Footer />
      </Row>
    </Layout>
  );
};

export default Stack;
