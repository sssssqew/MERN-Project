const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const app = require("../index"); // 절대경로가 제대로 동작되지 않고 있음
const PORT = 5000;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); // 코어수만큼 워커 생성
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died.`);
    cluster.fork(); //워커가 죽으면 새 워커 생성
  });
  cluster.on("listening", (worker, address) => {
    console.log(`Worker started with PID ${worker.process.pid}`);
  });
} else {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
}
