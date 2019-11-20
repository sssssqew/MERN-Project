const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const app = require("../index"); // docker compose 환경변수에 NODE_PATH 설정했으므로 경로는 index로 하면 됨
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
