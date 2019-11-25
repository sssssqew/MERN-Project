const cluster = require("cluster");
const numContainers = process.env.SERVER_NUM;
const numCPUs = require("os").cpus().length;
const numWorkers = numCPUs / numContainers; // 코어수(4)를 컨테이너수(2)로 나누면 워커수(2)가 나옴

const app = require("../index"); // 절대경로가 제대로 동작되지 않고 있음
console.log(`SERVER PORT: ${process.env.NODE_PORT}`);
console.log(`SERVER NUM: ${process.env.SERVER_NUM}`);

if (cluster.isMaster) {
  console.log(`WORKER NUM: ${numWorkers}`);
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died.`);
    cluster.fork(); //워커가 죽으면 새 워커 생성
  });
  cluster.on("listening", (worker, address) => {
    console.log(`Worker started with PID ${worker.process.pid}`);
  });
} else {
  app.listen(process.env.NODE_PORT, () => {
    console.log(`server is running on port ${process.env.NODE_PORT}`);
  });
}
