export function Item(name, onClick) {
  this.name = name;

  this.buttonEl = document.createElement("button");
  this.buttonEl.textContent = name;

  var _self = this;
  this.buttonEl.onclick = function () {
    onClick(_self);
  };
}

Item.prototype.render = function (parentEl) {
  parentEl.append(this.buttonEl);
};

Item.prototype.disable = function (value) {
  if (value) {
    this.buttonEl.setAttribute("disabled", true);
  } else {
    this.buttonEl.removeAttribute("disabled");
  }
};
