export function createCheckbox(option) {
  var el = document.createElement("input");
  el.type = "checkbox";
  el.checked = option.done;
  el.onchange = option.onChange;

  return {
    el: el,
  };
}
