// logger.js
export default function logger(req, res, next) {
  const method = req.method;
  const path = req.originalUrl;
  const query = req.query;
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${method} ${path}`);
  console.log("Query Parameters:", query);

  next(); // move to next
}

