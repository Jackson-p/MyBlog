import React, { FC, useState, useEffect } from "react";
import { Row, Col } from "antd";
import Layout from "@/layout";
import Footer from "@/components/footer";

import style from "./index.less";

import { getLabels, getIssues } from "@/utils";

const Articles: FC = () => {
  const [labels, setLabels] = useState<Array<string>>([]);
  useEffect(() => {
    const fetchLabels = async () => {
      const res = await getLabels();
      setLabels(res.map((val: any) => val.name));
    };
    fetchLabels();
  }, []);

  const [chosenTag, setTag] = useState("ALL");
  const [articles, setArticles] = useState<Array<any>>([]);
  const getArticles = async (tag: string) => {
    setTag(tag);
    const issues = await getIssues(tag, 1, 10, "");
    setArticles(issues.items);
  };

  return (
    <Layout>
      <div className={style.container}>
        <Row justify="center" align="middle" className={style.header}>
          <Col span={12}>
            {labels.length > 0 && (
              <div
                key="ALL"
                className={
                  style.tagAll +
                  ((chosenTag === "ALL" && ` ${style.chosen}`) || "")
                }
                onClick={() => setTag("ALL")}
              >
                show all
              </div>
            )}
            {labels.map(val => (
              <div
                key={val}
                className={
                  style.headerTag +
                  ((chosenTag === val && ` ${style.chosen}`) || "")
                }
                onClick={() => getArticles(val)}
              >
                {val}
              </div>
            ))}
          </Col>
        </Row>
        <Row justify="center">
          <Col span={13}>
            <h1 className={style.nowTag}>{chosenTag}</h1>
          </Col>
        </Row>
        <Row justify="center" className={style.articlesBody}>
          {articles.map(val => (
            <Col className={style.articleItem} span={13} key={val.title}>
              <h2>{val.title}</h2>
              <p>{val.body.substring(0, 500) + "..."}</p>
              <hr />
            </Col>
          ))}
        </Row>
        <Footer />
      </div>
    </Layout>
  );
};

export default Articles;
