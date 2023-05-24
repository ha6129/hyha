export function Server(time, name) {
  this.status = "ready"; //, serving
  this.time = time;
  this.name = name;
}

Server.prototype.isAvailable = function () {
  return this.status === "ready";
};

Server.prototype.serveAsync = function () {
  var server = this;
  server.status = "serving";
  return new Promise(function (resolve) {
    setTimeout(function () {
      server.status = "ready";
      resolve();
    }, server.time);
  });
};
