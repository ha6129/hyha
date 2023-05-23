export function createButton(option) {
  var el = document.createElement("button");
  el.textContent = option.label;
  el.onclick = option.onClick;

  return {
    el: el,
  };
}
