import * as Vue from "https://cdn.jsdelivr.net/npm/vue@3.2/dist/vue.esm-browser.js";

export const Weather = {
  template: `<div>
    <div id="weatherHead">
      <p>{{pointInfo.point}}</p>
    </div>
      <div v-for="oneDay in pointInfo.weatherArray">
        <div class="weatherImgArea">
          <img src="">
        </div>
        <div class="weatherStringArea">
          <p>{{oneDay.day}}</p>
          <div class="weatherStringTD">
            <p>気温</p>
            <p>{{oneDay.temp}}</p>
          </div>
          <div class="weatherStringTD">
            <p>降水確率</p>
            <p>{{oneDay.forecast}}</p>
        </div>
        </div>
      </div>
  </div>`,
  props: ["point"],
  setup(props) {
    const pointInfo = Vue.reactive({
      point: "読み込み中",
      weatherArray: [],
      today: {
        day: "",
        weather: "",
        temp: "",
        forecast: "",
      },
    });
    return {
      pointInfo,
    };
  },
};
