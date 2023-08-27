import { Clock } from "./clock.js";
import { Weather } from "./weather.js";

export default function widget(Vue) {
  return {
    components: {
      Clock,
      Weather,
    },
    setup() {
      return {};
    },
  };
}
