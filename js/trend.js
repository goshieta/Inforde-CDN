import * as Vue from "https://cdn.jsdelivr.net/npm/vue@3.2/dist/vue.esm-browser.js";

export const Trend = {
  template: `<div>
    <p class="widgetsTitle">トレンド</p>
    <div class="widgetsBody">
      <a v-for="(oneTrend,index) in trendArray.array" :href="'https://google.com/search?q='+oneTrend" target="_blank">{{(index+1)+" . "+oneTrend}}</a>
    </div>
  </div>`,
  setup() {
    const trendArray = Vue.reactive({
      array: [],
    });
    fetch(
      "https://script.google.com/macros/s/AKfycbxFpsbkMM9ZaxkD4ex2_y_yROcRKdppCdDweDF4keKiJ2cl_Bs-K3wKXmuw26VEhmIp6Q/exec"
    )
      .then((e) => e.text())
      .then((array) => (trendArray.array = array.split(",")));
    return {
      trendArray,
    };
  },
};
