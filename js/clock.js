import * as Vue from "https://cdn.jsdelivr.net/npm/vue@3.2/dist/vue.esm-browser.js";

export const Clock = {
  template: `<div id="clock">
      <p>{{dayPrev}}</p>
      <p>{{timePrev}}</p>
    </div>`,
  setup() {
    const time = Vue.reactive({ date: new Date() });

    const zeroPadding = (num, degit) => ("0".repeat(degit) + num).slice(-degit);

    const dayPrev = Vue.computed(() => {
      const dayArray = ["日", "月", "火", "水", "木", "金", "土"];
      return `${time.date.getFullYear()} . ${zeroPadding(
        time.date.getMonth() + 1,
        2
      )} . ${zeroPadding(time.date.getDate(), 2)} (${
        dayArray[time.date.getDay()]
      })`;
    });

    const timePrev = Vue.computed(() => {
      return `${zeroPadding(time.date.getHours(), 2)}:${zeroPadding(
        time.date.getMinutes(),
        2
      )}`;
    });

    setInterval(() => {
      time.date = new Date();
    }, 1000);
    return {
      time,
      dayPrev,
      timePrev,
    };
  },
};
