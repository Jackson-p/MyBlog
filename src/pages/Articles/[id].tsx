import React, { FC, useState, useEffect } from "react";
import { history, Link } from "umi";
import { Row, Col } from "antd";
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
import { getSingleIssue } from "../../utils";
import style from "./[id].less";

const Article: FC = () => {
  const [content, setContent] = useState<string>("");
  const [comment, setComment] = useState<string[]>([]);

  const getContent = async () => {
    const artiNumber = Number(history.location.pathname.split("/").pop());
    const data = await getSingleIssue(artiNumber);
    marked.setOptions({
      highlight: code => hljs.highlightAuto(code).value
    });
    setContent(marked(data[0]));
    setComment(data[1]);
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <Layout>
      <div className={style.container}>
        <Row justify="start">
          <Col span={16} offset={4} className={style.header}>
            <Link to="https://www.baidu.com">hahah</Link>
            <h1>哈哈哈哈哈哈哈哈</h1>
            <h2>alalalalalla</h2>
            <hr />
          </Col>
          <Col
            span={16}
            offset={4}
            className={style.main}
            dangerouslySetInnerHTML={{ __html: content }}
          ></Col>
        </Row>
        {/* <p dangerouslySetInnerHTML={{ __html: content }}></p>
      <p>{comment}</p> */}
      </div>
    </Layout>
  );
};

export default Article;
