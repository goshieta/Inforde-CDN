import * as Vue from "https://cdn.jsdelivr.net/npm/vue@3.2/dist/vue.esm-browser.js";

export const News = {
  template: `<div>
    <p class="widgetsTitle">ニュース</p>
    <div class="widgetsBody">
      <a v-for="oneNews in newsArray.array" :href="oneNews.href" target="_blank">{{oneNews.str}}</a>
    </div>
  </div>`,
  setup() {
    const newsArray = Vue.reactive({
      array: [],
    });
    fetch("https://www.nhk.or.jp/rss/news/cat0.xml")
      .then((e) => e.text())
      .then((xml) => {
        const parser = new DOMParser();
        const newsXML = parser.parseFromString(xml, "text/xml");
        console.log(newsXML);
        const items = Array.from(
          newsXML.documentElement.getElementsByTagName("item")
        );
        items.length = 5;
        console.log(items);
        newsArray.array = items.map((oneItem) => {
          return {
            str: oneItem.getElementsByTagName("title")[0].innerHTML,
            href: oneItem.getElementsByTagName("link")[0].innerHTML,
          };
        });
      });
    return {
      newsArray,
    };
  },
};
