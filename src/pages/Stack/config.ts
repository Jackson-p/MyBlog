const stackData: any = {
  前端: {
    框架: ["React全家桶", "Vue全家桶"],
    csr集成开发方案: ["Umi"],
    ssr集成开发方案: ["Next", "Beidou", "Egg-ssr"],
    UI方案: ["Ant Design", "ElementUI"],
    构建方案: ["Webpack", "Rollup", "Parcel", "Gulp"],
    语言规范: ["MDN", "TypeScript", "Eslint", "Prettier"]
  },
  后端: {
    语言: ["Node", "Java"],
    框架: ["Koa", "Egg && Midway", "Nest", "Express"]
  },
  多端: {
    移动端: ["Flutter"],
    桌面端: ["Electron"]
  },
  运维: {
    部署: ["物理机", "Docker云主机", "Serverless"],
    运行: ["Pm2"],
    监控: ["Grafana"],
    日志: ["Log4js等", "Kafka", "Kibana"],
    埋点: ["数据指标", "性能指标"]
  },
  测试: {
    单元测试: ["Jest", "Mocha"]
  }
};

export default stackData;
