var todolist = [];

function getSortedTodoList(option) {
  return todolist.filter((item) => item.done === option.done);
}

var contentsEl = document.getElementById("todo-contents");

var containerEl = document.getElementById("container");
var inputBtnControl = Widget.button({
  label: "입력",
  onClick: function () {
    if (!contentsEl.value) {
      alert("할일을 입력해 주세요");
      return;
    }

    todolist.push({
      id: crypto.randomUUID(),
      contents: contentsEl.value,
      done: false,
    });
    contentsEl.value = "";
    contentsEl.focus();
    todolistControl.reload(getSortedTodoList({ done: false }));
    donelistControl.reload(getSortedTodoList({ done: true }));
  },
});
containerEl.append(inputBtnControl.el);

var todolistControl = Widget.list({
  datas: getSortedTodoList({ done: false }),
  columns: [
    {
      render: function (data) {
        var checkBoxContrl = Widget.checkbox({
          done: true,
          onChange: function (e) {
            data.done = e.target.checked;
          },
        });
        return checkBoxContrl.el;
      },
    },

    {
      render: function (data) {
        var spanContrl = Widget.span({
          contents: data.contents,
        });
        return spanContrl.el;
      },
    },

    {
      render: function (data) {
        var delBtnContrl = Widget.button({
          label: "삭제",
          onClick: function () {
            // splice
            todolist.splice(todolist.indexOf(data), 1);
            todolistControl.reload(todolist);
          },
        });
        return delBtnContrl.el;
      },
    },
  ],
});
containerEl.append(todolistControl.el);

var donelistControl = Widget.list({
  datas: getSortedTodoList({ done: true }),
  columns: [
    {
      render: function (data) {
        var checkBoxContrl = Widget.checkbox({
          done: false,
          onChange: function (e) {
            data.done = e.target.checked;
          },
        });
        return checkBoxContrl.el;
      },
    },

    {
      render: function (data) {
        var spanContrl = Widget.span({
          contents: data.contents,
        });
        return spanContrl.el;
      },
    },

    {
      render: function (data) {
        var delBtnContrl = Widget.button({
          label: "삭제",
          onClick: function () {
            // splice
            todolist.splice(todolist.indexOf(data), 1);
            todolistControl.reload(todolist);
          },
        });
        return delBtnContrl.el;
      },
    },
  ],
});
containerEl.append(donelistControl.el);

// function createTodoItem(item) {
//   var liEl = document.createElement("li");
//

// //체크박스
// var checkbox = document.createElement("input");
// checkbox.type = "checkbox";
// checkbox.checked = item.done;
// checkbox.onchange = function (e) {
//   item.done = e.target.checked;
//   renderTodoList();
//   renderDoneList();
// };

// //컨텐츠
// var contents = document.createElement("span");
// contents.textContent = item.contents;

// //삭제버튼
// var delBtnControl = Widget.button({
//   label: "삭제",
//   onClick: function () {
//     // splice
//     todolist.splice(todolist.indexOf(item), 1);
//     item.done ? renderDoneList() : renderTodoList();
//   },
// });

// liEl.append(checkbox);
// liEl.append(contents);
// liEl.append(delBtnControl.el);

// return liEl;
//}
