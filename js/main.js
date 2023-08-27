import * as Vue from "https://cdn.jsdelivr.net/npm/vue@3.2/dist/vue.esm-browser.js";
import searchBox from "./searchBox.js";
import MySite from "./mySite.js";
import widget from "./widget.js";

function main() {
  //テーマなどの設定の取り出し、反映
  //コンテンツの追加
  Vue.createApp(searchBox(Vue)).mount("#form");
  Vue.createApp(
    MySite(Vue, [
      {
        img: "https://www.youtube.com/s/desktop/f6119d90/img/favicon_32x32.png",
        href: "https://www.youtube.com/",
      },
      {
        img: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico",
        href: "https://mail.google.com/mail/u/0/#inbox",
      },
      {
        img: "https://chat.openai.com/apple-touch-icon.png",
        href: "https://chat.openai.com/",
      },
      {
        img: "https://www.gstatic.com/lamda/images/favicon_v1_150160cddff7f294ce30.svg",
        href: "https://bard.google.com/",
      },
      {
        img: "https://static.figma.com/uploads/1a667ef53b7c4837049399d0593ffca39e0bec9e",
        href: "https://www.figma.com/files/",
      },
      {
        img: "https://github.com/fluidicon.png",
        href: "https://github.com/",
      },
      {
        img: "https://www.notion.so/front-static/favicon.ico",
        href: "https://www.notion.so/",
      },
      {
        img: "https://static.deepl.com/img/favicon/favicon_16.png",
        href: "https://www.deepl.com/ja/translator",
      },
      {
        img: "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png",
        href: "https://drive.google.com/drive/my-drive",
      },
      {
        img: "https://www.google.com/images/branding/product/ico/maps15_bnuw3a_32dp.ico",
        href: "https://www.google.com/maps",
      },
    ])
  ).mount("#mysite");
  Vue.createApp(widget(Vue)).mount("#widgets");
}

window.addEventListener("DOMContentLoaded", main);
