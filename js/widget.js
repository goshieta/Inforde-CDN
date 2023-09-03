import { Clock } from "./clock.js";
import { Weather } from "./weather.js";
import { Trend } from "./trend.js";

export default function widget(Vue) {
  return {
    components: {
      Clock,
      Weather,
      Trend,
    },
    setup() {
      return {};
    },
  };
}
