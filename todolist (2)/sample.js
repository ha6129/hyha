var sampleControl = Widget.button({
  label: "샘플",
  onClick: function () {
    alert("샘플입니다");
  },
});

document.body.append(sampleControl.el);
