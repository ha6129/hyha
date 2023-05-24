import { Chef } from "./Chef.js";
import { Server } from "./Server.js";
import { Menu } from "./Menu.js";

function findChefAsync() {
  return new Promise(function (resolve) {
    var timer = setInterval(function () {
      var target = chefs.find(function (chef) {
        return chef.isAvailable();
      });

      if (target) {
        clearInterval(timer);
        resolve(target);
      }
    }, 100);
  });
}

function findServerAsync() {
  return new Promise(function (resolve) {
    var timer = setInterval(function () {
      var target = servers.find(function (server) {
        return server.isAvailable();
      });
      if (target) {
        clearInterval(timer);
        resolve(target);
      }
    }, 100);
  });
}

var orders = [];
var cookings = [];
var servings = [];

var chefs = [new Chef(), new Chef()];
var servers = [new Server(1000), new Server(2000)];

function renderOrders() {
  var ordersEl = document.getElementById("orders");
  ordersEl.innerHTML = "";
  orders.forEach(function (order) {
    var liEl = document.createElement("li");
    liEl.textContent = order.name;
    ordersEl.append(liEl);
  });
}
function renderCookings() {
  var cookingsEl = document.getElementById("cookings");
  cookingsEl.innerHTML = "";
  cookings.forEach(function (cooking) {
    var liEl = document.createElement("li");
    liEl.textContent = cooking.name;
    cookingsEl.append(liEl);
  });
}
function renderServings() {
  var servingsEl = document.getElementById("servings");
  servingsEl.innerHTML = "";
  servings.forEach(function (serving) {
    var liEl = document.createElement("li");
    liEl.textContent = serving.name;
    servingsEl.append(liEl);
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
      cookings.push(menu);
      renderOrders();
      renderCookings();
      return chef.cookAsync(menu);
    })
    .then(function () {
      //서빙 시키기
      // -- 서빙 목록으로 넘어가야함
      cookings.splice(cookings.indexOf(menu), 1);
      servings.push(menu);
      renderCookings();
      renderServings();
      return findServerAsync();
    })
    .then(function (server) {
      return server.serveAsync();
    })
    .then(function () {
      servings.splice(servings.indexOf(menu), 1);
      renderServings();
    });
}
