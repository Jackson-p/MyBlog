import React, { FC, useState, useEffect } from "react";
import { Row, Col, Pagination, Spin } from "antd";
import { history } from "umi";
import Layout from "@/layout";
import Footer from "@/components/footer";

import style from "./index.less";

import { getLabels, getIssues } from "@/utils";

const Articles: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [labels, setLabels] = useState<Array<string>>([]);
  const [chosenTag, setTag] = useState<string>("ALL");
  const [articles, setArticles] = useState<Array<any>>([]);
  const [itemTotal, setItemTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const getArticles = async () => {
    const tag = (chosenTag !== "ALL" && chosenTag) || "";
    setLoading(true);
    const issues = await getIssues(tag, page);
    setLoading(false);
    const { total_count } = issues;
    issues.length === 0 && setTag("issue api 被封禁， 请稍后再试");
    setArticles(issues.items);
    setItemTotal(total_count);
  };
  const fetchLabels = async () => {
    setLoading(true);
    const res = await getLabels();
    setLoading(false);
    setLabels(res.map((val: any) => val.name));
  };

  useEffect(() => {
    fetchLabels();
  }, []);
  useEffect(() => {
    getArticles();
  }, [chosenTag, page]);

  const gotoArticle = (id: number) => history.push(`/Articles/${id}`);
  return (
    <Layout>
      <Spin spinning={loading} size="large">
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
                  onClick={() => setTag(val)}
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
              <Col
                className={style.articleItem}
                span={13}
                key={val.title}
                onClick={() => gotoArticle}
              >
                <h2>{val.title}</h2>
                <p>{val.body.substring(0, 500) + "..."}</p>
                <hr />
              </Col>
            ))}
            <Col className={style.articlePagination} span={13}>
              {itemTotal && itemTotal > 0 && (
                <Pagination
                  total={itemTotal}
                  onChange={pageNum => setPage(pageNum)}
                />
              )}
            </Col>
          </Row>
          <Footer />
        </div>
      </Spin>
    </Layout>
  );
};

export default Articles;
