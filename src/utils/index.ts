import axios from "axios";
import { message } from "antd";
const mockData = require("@/mock/gitData.json");

// 为了美观一页6个
const PAGE_SIZE = 6;
const mock = false; // 是否开启mock模式

let apiWrong = 0; // 判断当前git api报了几次错

axios.interceptors.response.use(
  (res) => {
    apiWrong = 0;
    return res;
  },
  (err) => {
    if (err && apiWrong >= 1) {
      return;
    }
    message.warning("git api 被限制, 将打开issue地址");
    apiWrong++;
    setTimeout(
      () =>
        window.open("https://github.com/Jackson-p/Jackson-p.github.io/issues"),
      4000
    );
  }
);

/**
 * @description: 去github issue中把所需要的issue集合拿下来
 * @param {string} label
 * @param {number} currentPage
 * @param {number} pageSize
 * @param {string} keyWord
 * @return {object} issues
 */
const getIssues = async (
  label: string,
  currentPage: number = 1,
  pageSize: number = PAGE_SIZE,
  keyWord: string = ""
) => {
  if (label && label.trim().length > 0) {
    label = `+label:${label}`;
  }
  const url = encodeURI(
    `https://api.github.com/search/issues?q=${keyWord}+state:open+repo:Jackson-p/Jackson-p.github.io${label}&sort=created&page=${currentPage}&per_page=${pageSize}`
  );
  if (mock) {
    const { issues } = mockData;
    return issues;
  } else {
    const issues = await axios.get(url).then((res) => (res && res.data) || {});
    return issues;
  }
};

/**
 * @description: 获取单个issue的内容和评论
 * @param {number} number -指定issue的下标
 * @return: issue
 */

const getSingleIssue = async (number: number) => {
  const url = `https://api.github.com/repos/Jackson-p/Jackson-p.github.io/issues`;

  if (mock) {
    const { singleIssue } = mockData;
    const { content, comment } = singleIssue;
    return [content, comment];
  } else {
    const [content, comment] = await Promise.all([
      axios.get(`${url}/${number}`).then((res) => res.data || {}),
      axios
        .get(`${url}/${number}/comments`)
        .then((res) => (res && res.data) || []),
    ]);
    return [content, comment];
  }
};

const getLabels = async () => {
  const url = encodeURI(
    "https://api.github.com/repos/Jackson-p/Jackson-p.github.io/labels"
  );
  if (mock) {
    const { labels } = mockData;
    return labels;
  } else {
    const labels = await axios.get(url).then((res) => (res && res.data) || []);
    return labels;
  }
};

/**
 * @description: 转换时间为好看的时间字符串格式
 * @param {string} - 样例: 2019-02-25T09:49:59Z
 * @return {string} updateTime
 */
const transTime = (timel: string) => {
  const allmonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let realtime = new Date(timel);
  let month = allmonths[realtime.getMonth()];
  let day = realtime.getDate();
  let year = realtime.getFullYear();
  return "From Jackson on " + month + " " + day + ", " + year;
};

/**
 * @description: 用来转换评论区的时间戳
 * @param {string} 原时间
 * @return {string} 转换后的时间字符串
 */
const transTime2 = (timel: string) => {
  const reg = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/i;
  const arrs = timel && reg.exec(timel);
  return arrs && arrs[0];
};

export { getLabels, getIssues, getSingleIssue, transTime, transTime2 };
