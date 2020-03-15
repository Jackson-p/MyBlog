import axios from "axios";
const mockData = require("@/mock/gitData.json");

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
  currentPage: number,
  pageSize: number,
  keyWord: string
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

const getLabels = async () => {
  const url = encodeURI(
    "https://api.github.com/repos/Jackson-p/Jackson-p.github.io/labels"
  );
  // const labels = await axios.get(url).then(res => res.data || {});

  // mock 数据
  const { labels } = mockData;
  return labels;
};

export { getIssues, getLabels };
