import { createButton } from "./button";
import { createCheckbox } from "./checkbox";
import { createList } from "./list";
import { createSpan } from "./span";

window.Widget = {
  button: createButton,
  span: createSpan,
  list: createList,
  checkbox: createCheckbox,
  getControl: function () {},
};
