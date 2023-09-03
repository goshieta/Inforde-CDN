import * as Vue from "https://cdn.jsdelivr.net/npm/vue@3.2/dist/vue.esm-browser.js";
import { zeroPadding } from "./clock.js";

export const Weather = {
  template: `<div>
    <div id="weatherHead">
      <img src="../image/icon/location.svg" alt="">
      <p>{{pointInfo.point}}</p>
    </div>
    <div v-for="oneDay in pointInfo.weatherArray" class="weatherInfo">
      <div class="weatherImgArea">
        <img :src="'../image/weather/'+oneDay.weather+'.png'">
      </div>
      <div class="weatherStringArea">
        <p>{{oneDay.day}}</p>
        <div class="weatherStringTD">
          <p>気温</p>
          <p>{{oneDay.temp}}</p>
        </div>
        <div class="weatherStringTD">
          <p>降水確率</p>
          <p>{{oneDay.chanceOfRain}}</p>
      </div>
      </div>
    </div>
  </div>`,
  props: ["point"],
  setup(props) {
    const pointInfo = Vue.reactive({
      point: "読み込み中",
      weatherArray: [],
    });

    fetch(`https://weather.tsukumijima.net/api/forecast/city/${props.point}`)
      .then((e) => e.json())
      .then((json) => {
        pointInfo.point = json.location.city;
        const forecastsArray = json.forecasts;
        forecastsArray.length = 2;
        console.log(forecastsArray);

        pointInfo.weatherArray = forecastsArray.map((oneForecast) => {
          //天気の要約の作成
          let weather_img_arr = ["晴", "曇", "雨", "雪"];
          let img_str = "";
          weather_img_arr.map((value) => {
            if (oneForecast.telop.indexOf(value) !== -1) {
              img_str += value;
            }
          });
          img_str = img_str.substring(0, 2);
          return {
            day: `${oneForecast.date.split("-")[1]} . ${
              oneForecast.date.split("-")[2]
            }`,
            weather: img_str,
            temp: oneForecast.temperature.max.celsius + "℃",
            chanceOfRain:
              oneForecast.chanceOfRain[
                `T${zeroPadding(
                  new Date().getHours() - (new Date().getHours() % 6),
                  2
                )}_${zeroPadding(
                  new Date().getHours() - (new Date().getHours() % 6) + 6,
                  2
                )}`
              ],
          };
        });
      });

    return {
      pointInfo,
    };
  },
};
