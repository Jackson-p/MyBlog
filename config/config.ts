import { defineConfig } from "umi";
const WorkboxPlugin = require("workbox-webpack-plugin");

export default defineConfig({
  title: "Jackson",
  favicon:
    "https://graph.baidu.com/resource/121f5fdc086d8006746bc01585376233.jpg",
  base: "/",
  chainWebpack(memo) {
    memo.plugin("workbox").use(WorkboxPlugin.GenerateSW, [
      { swDest: "sw.js" },
      { clientsClaim: true },
      { skipWaiting: true },
      {
        runtimeCaching: [
          {
            urlPattern: new RegExp("https://api.github.com"),
            handler: "staleWhileRevalidate"
          }
        ]
      }
    ]);
  }
});
