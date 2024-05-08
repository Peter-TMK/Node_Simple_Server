const http = require("http");
const os = require("os");

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  // Handle GET requests
  if (req.method === "GET" && req.url === "/info") {
    // Simulate asynchronous operation with random delay
    const delay = Math.floor(Math.random() * 3000); // Random delay between 0 and 3 seconds
    setTimeout(() => {
      // Prepare response data
      const userInfo = {
        cpuModel: os.cpus()[0].model,
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        platform: os.platform(),
        release: os.release(),
      };

      // Send response with JSON data
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(userInfo));
    }, delay);
  } else {
    // Handle other routes or methods
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
