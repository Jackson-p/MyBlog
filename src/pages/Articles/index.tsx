import React, { FC, useState, useEffect } from "react";
import { Row, Col, Pagination, Spin, message } from "antd";
import { history } from "umi";
import Layout from "@/layout";
import Footer from "@/components/footer";

import style from "./index.less";

import { getLabels, getIssues } from "@/utils";

const goToIssue = () => {
  message.warning("git api 被限制, 将打开issue地址");
  window.open("https://github.com/Jackson-p/Jackson-p.github.io/issues");
};

const Articles: FC = () => {
  // 这里是一个有关hook的标志思考，set几次就会重新渲染几次
  // console.log(1);
  const {
    location: { state }
  } = history;
  const defaultTag = (state && (state as any).chosenTag) || "ALL";
  const [loading, setLoading] = useState<boolean>(false);
  const [labels, setLabels] = useState<Array<string>>([]);
  const [chosenTag, setTag] = useState<string>(defaultTag);
  const [articles, setArticles] = useState<Array<any>>([]);
  const [itemTotal, setItemTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const getArticles = async () => {
    const tag = (chosenTag !== "ALL" && chosenTag) || "";
    setLoading(true);
    const issues =
      (await getIssues(tag, page).catch(e => e && goToIssue())) || [];
    setLoading(false);
    const { total_count } = issues;
    issues.length === 0 && setTag("issue api 被封禁， 请稍后再试");
    setArticles(issues.items);
    setItemTotal(total_count);
  };
  const fetchLabels = async () => {
    setLoading(true);
    const res = (await getLabels().catch(e => e && goToIssue())) || [];
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
            <Col md={{ span: 12, offset: 0 }} span={22} offset={1}>
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
            <Col md={{ span: 13 }} span={22} offset={1}>
              <h1 className={style.nowTag}>{chosenTag}</h1>
            </Col>
          </Row>
          <Row justify="center" className={style.articlesBody}>
            {articles.map(val => (
              <Col
                className={style.articleItem}
                md={{ span: 13 }}
                span={21}
                offset={1}
                key={val.title}
                onClick={() => gotoArticle(val.number)}
              >
                <h2>{val.title}</h2>
                <p>{val.body.substring(0, 500) + "..."}</p>
                <hr />
              </Col>
            ))}
            <Col className={style.articlePagination} span={13}>
              {(itemTotal && itemTotal > 0 && (
                <Pagination
                  total={itemTotal}
                  onChange={pageNum => setPage(pageNum)}
                />
              )) || <div></div>}
            </Col>
          </Row>
        </div>
        <Footer />
      </Spin>
    </Layout>
  );
};

export default Articles;
