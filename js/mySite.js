export default function MySite(van, mySiteArray) {
  const { img, div, a } = van.tags;
  return mySiteArray.map((oneSite) => {
    return div(
      { class: "oneMySite" },
      a(
        { href: oneSite.href, target: "_blank", rel: "noopener noreferrer" },
        img({ src: oneSite.img })
      )
    );
  });
}
