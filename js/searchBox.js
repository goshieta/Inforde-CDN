export default function searchBox(van, searchBoxSetting) {
  const { div, img, input } = van.tags;
  return div(
    { id: "searchBox" },
    img({ src: "./image/searchEngine/google.ico" }),
    input({ type: "search" }),
    img({ src: "./image/icon/search.svg" })
  );
}
