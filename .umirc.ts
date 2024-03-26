import { defineConfig } from "umi";

export default {
  
  extraPostCSSPlugins: [require("tailwindcss"), require("autoprefixer")],
  npmClient: "pnpm",
  tailwindcss: {},
  request: {

    
  },
  plugins: ["@umijs/plugins/dist/tailwindcss","@umijs/plugins/dist/request"],
}
