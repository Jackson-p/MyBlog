import React, { FC, useState, useEffect } from "react";
import { history, Link } from "umi";
import { Row, Col, Button } from "antd";
import marked from "marked";
//@ts-ignore
import hljs from "highlight.js/lib/highlight";
//@ts-ignore
import javascript from "highlight.js/lib/languages/javascript";
//@ts-ignore
import css from "highlight.js/lib/languages/css";
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);
import "highlight.js/styles/vs2015.css";

import Layout from "@/layout/index";
import Footer from "@/components/footer";
import { getSingleIssue, transTime, transTime2 } from "../../utils";
import style from "./[id].less";

const Article: FC = () => {
  const artiNumber = Number(history.location.pathname.split("/").pop());
  const [tag, setTag] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [updateTime, setUpdateTime] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [comment, setComment] = useState<any[]>([]);

  const getContent = async () => {
    const data = await getSingleIssue(artiNumber);
    marked.setOptions({
      highlight: code => hljs.highlightAuto(code).value
    });
    const { labels, title, body, updated_at } = data[0];
    setTag((labels && labels[0]["name"]) || "");
    setTitle(title);
    setUpdateTime(transTime(updated_at));
    setContent(marked(body));
    setComment(data[1]);
  };

  useEffect(() => {
    getContent();
  }, []);

  const renderComments = () => {
    if (comment.length > 0) {
      return comment.map(item => (
        <div
          className={style.reviewItem}
          key={item.body.substring(10) + Math.random() * Date.now()}
        >
          <h3>{`${item.user.login}:`}</h3>
          <p>{item.body}</p>
          <i>{transTime2(item.updated_at)}</i>
        </div>
      ));
    } else {
      return <div className={style.comeToReview}>暂无评论，欢迎评论</div>;
    }
  };

  return (
    <Layout>
      <div className={style.container}>
        <Row justify="start">
          <Col span={16} offset={4} className={style.header}>
            <Link to={{ pathname: "/Articles", state: { chosenTag: tag } }}>
              {tag}
            </Link>
            <h1>{title}</h1>
            <h2>{updateTime}</h2>
            <hr />
          </Col>
          <Col
            span={16}
            offset={4}
            className={style.main}
            dangerouslySetInnerHTML={{ __html: content }}
          ></Col>
        </Row>
        <Row justify="start">
          <Col span={16} offset={4} className={style.comment}>
            <div className={style.reviewTitle}>
              <h3>评论</h3>
            </div>
            <div className={style.reviewHr}></div>
            <div className={style.reviewSubtitle}>最新</div>
            {renderComments()}
            <div className={style.contentBlock}>
              <Button
                type="primary"
                onClick={() =>
                  (window.location.href = `https://github.com/Jackson-p/Jackson-p.github.io/issues/${artiNumber}`)
                }
              >
                去评论
              </Button>
            </div>
          </Col>
        </Row>
        <Footer />
      </div>
    </Layout>
  );
};

export default Article;
