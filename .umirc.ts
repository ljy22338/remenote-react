import { defineConfig } from "umi";

export default defineConfig({
  extraPostCSSPlugins: [require("tailwindcss"), require("autoprefixer")],
  // routes: [
  //   { path: "/", component: "notebook"  },
  //   { path: "/notebook", component: "notebook" },
  //   { path: "/rememberCard", component: "rememberCard" },
  //   { path: "/mindMap", component: "mindMap" },
  //   { path: "/studyGroup", component: "studyGroup" },
  //   { path: "/my", component: "my" },
  //   { path: "/noteList", component: "noteList" },
  //   { path: "/note", component: "note", layout: false },
  // ],

  npmClient: "pnpm",
  tailwindcss: {},
  plugins: ["@umijs/plugins/dist/tailwindcss"],
});
