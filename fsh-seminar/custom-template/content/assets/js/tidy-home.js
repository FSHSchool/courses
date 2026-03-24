// Remove the "Computable Name" of the IG from the DOM
[...document.querySelectorAll("*")]
  .filter(
    (e) =>
      e.childNodes &&
      [...e.childNodes].find((n) => n.nodeValue?.match("Computable Name"))
  )[0]
  .parentNode.parentNode.parentNode.parentNode.remove();
