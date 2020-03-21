import axios from "axios";
const mockData = require("@/mock/gitData.json");

// 为了美观一页6个
const PAGE_SIZE = 6;

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
  // const issues = await axios.get(url).then(res => res.data || {});

  // mock数据
  const { issues } = mockData;
  return issues;
};

/**
 * @description: 获取单个issue的内容和评论
 * @param {number} number -指定issue的下标
 * @return: issue
 */

const getSingleIssue = async (number: number) => {
  const url = `https://api.github.com/repos/Jackson-p/Jackson-p.github.io/issues`;
  // const [content, comment] = await Promise.all([
  //   axios.get(`${url}/${number}`).then(res => res.data.body || ""),
  //   axios.get(`${url}/${number}/comments`).then(res => res.data || [])
  // ]);

  // mock数据
  const { singleIssue } = mockData;
  const { content, comment } = singleIssue;
  return [content, comment];
};

const getLabels = async () => {
  const url = encodeURI(
    "https://api.github.com/repos/Jackson-p/Jackson-p.github.io/labels"
  );
  // const labels = await axios.get(url).then(res => res.data || {});

  // mock 数据
  const { labels } = mockData;
  return labels;
};

export { getLabels, getIssues, getSingleIssue };
