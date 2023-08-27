export function Clock(van) {
  const { div, p } = van.tags;
  const time = van.state(0);
  setInterval(() => {
    time.val++;
  }, 1000);
  return div(p(""), p(time));
}

export function Weather(van) {
  const { input, span } = van.tags;
  const text = van.state("VanJS");
  const length = van.derive(() => text.val.length);
  return span(
    "The length of ",
    input({
      type: "text",
      value: text,
      oninput: (e) => (text.val = e.target.value),
    }),
    " is ",
    length,
    "."
  );
}

export function Trend(van) {}

export function News(van) {}
