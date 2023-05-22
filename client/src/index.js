import { CircleData } from "./CircleData.js";
import { Item } from "./item.js";

function game(item) {
  var next = items.getNext(item);
  if (item === comCurrentItem) {
    alert("비겼습니다");
  } else if (next === comCurrentItem) {
    alert("졌습니다");
  } else {
    alert("이겼습니다");
  }
  clearInterval(timerId);
  startEl.removeAttribute("disabled");
  items.getAll().forEach(function (item) {
    item.disable(true);
  });
}
var items = new CircleData([
  new Item("가위", game),
  new Item("바위", game),
  new Item("보", game),
]);

var startEl = document.getElementById("start");
var msgEl = document.getElementById("msg");
var comCurrentItem = items.getAll()[0];
var timerId;

var buttonsEl = document.getElementById("buttons");

items.getAll().forEach(function (item) {
  item.render(buttonsEl);
  item.disable(true);
});

startEl.onclick = function () {
  startEl.disabled = true;
  items.getAll().forEach(function (item) {
    item.disable(false);
  });

  timerId = setInterval(function () {
    comCurrentItem = items.getNext(comCurrentItem);
    msgEl.textContent = comCurrentItem.name;
  }, 100);
};
