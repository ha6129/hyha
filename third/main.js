import { Chef } from "./Chef.js";
import { Server } from "./Server.js";
import { Menu } from "./Menu.js";

function findAsync(array, time) {
  return new Promise(function (resolve) {
    var timer = setInterval(function () {
      var target = array.find(function (item) {
        return item.isAvailable();
      });

      if (target) {
        clearInterval(timer);
        resolve(target);
      }
    }, time);
  });
}

function findChefAsync() {
  return findAsync(chefs, 100);
}

function findServerAsync() {
  return findAsync(servers, 100);
}

var orders = [];
var cookings = [];
var servings = [];

var chefs = [new Chef("이진경"), new Chef("이우제")];
var servers = [new Server(1000, "이재희"), new Server(2000, "하헌영")];

function render(data, containerId, textCallback) {
  var containerEl = document.getElementById(containerId);
  containerEl.innerHTML = "";

  data.forEach(function (item) {
    var liEl = document.createElement("li");
    liEl.textContent = textCallback(item);
    containerEl.append(liEl);
  });
}

function renderOrders() {
  render(orders, "orders", function (menu) {
    return menu.name + " " + menu.time / 1000;
  });
}
function renderCookings() {
  render(cookings, "cookings", function (menu) {
    return (
      menu.menu.name + " " + menu.menu.time / 1000 + " Chef : " + menu.chef.name
    );
  });
}
function renderServings() {
  render(servings, "servings", function (menu) {
    return (
      menu.menu.name +
      " " +
      menu.menu.time / 1000 +
      " Server : " +
      menu.server.name
    );
  });
}

document.getElementById("sundae").onclick = function () {
  run(new Menu("순댓국", 1000));
};

document.getElementById("haejang").onclick = function () {
  run(new Menu("해장국", 2000));
};

//주문, 요리, 서빙 메인 프로세스는 run 함수에서 전부 처리되어야 함
function run(menu) {
  // 주문 목록에 추가, 출력
  orders.push(menu);
  renderOrders();

  //대기중인 요리사 찾기 (요리사가 있을 때 까지 대기해야함) => 비동기작업(promise), 여유시간을 줘야함
  findChefAsync()
    .then(function (chef) {
      //요리사에게 요리시키기
      // 주문 목록에서 제거, 요리 목록에 추가, 출력
      orders.splice(orders.indexOf(menu), 1);
      cookings.push({ menu: menu, chef: chef });
      renderOrders();
      renderCookings();
      return chef.cookAsync(menu);
    })
    .then(function (server) {
      return findServerAsync();
    })
    .then(function (server) {
      //서빙 시키기
      // -- 서빙 목록으로 넘어가야함
      cookings.splice(cookings.indexOf(menu), 1);
      servings.push({ menu: menu, server: server });
      renderCookings();
      renderServings();
      return server.serveAsync();
    })
    .then(function () {
      servings.splice(servings.indexOf(menu), 1);
      renderServings();
    });
}
