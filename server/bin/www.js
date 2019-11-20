const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const app = require("../index");
const PORT = 5000;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died.`);
    cluster.fork();
  });
  cluster.on("listening", (worker, address) => {
    console.log(`Worker started with PID ${worker.process.pid}`);
  });
} else {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
}
