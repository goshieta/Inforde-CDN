import { Clock } from "./clock.js";
import { Weather } from "./weather.js";
import { Trend } from "./trend.js";
import { News } from "./news.js";

export default function widget(Vue) {
  return {
    components: {
      Clock,
      Weather,
      Trend,
      News,
    },
    setup() {
      return {};
    },
  };
}
