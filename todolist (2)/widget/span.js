export function createSpan(option) {
  var el = document.createElement("span");
  el.textContent = option.contents;

  return {
    el: el,
  };
}
