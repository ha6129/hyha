export function createList(option) {
  var el = document.createElement("ul");
  el.style.listStyle = "none";
  el.style.padding = "0";
  render(option.datas, option.columns);

  return {
    el: el,
    reload: function (datas) {
      el.innerHTML = "";
      render(datas, option.columns);
    },
    getValue: function () {
      return el.value;
    },
  };

  function render(datas, columns) {
    datas.forEach(function (data) {
      var liEl = document.createElement("li");

      columns.forEach(function (column) {
        var control = column.render(data);
        liEl.append(control);
      });

      el.append(liEl);
    });
  }
}
