import React, { FC } from "react";
import Layout from "@/layout";

import { Row, Col, Card } from "antd";

import stackData from "./config";
import style from "./index.less";

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
            <p key={val}>{val}</p>
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
            <Col key={`${cardTitle}${index}`} span={6} flex="wrap">
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
    </Layout>
  );
};

export default Stack;
