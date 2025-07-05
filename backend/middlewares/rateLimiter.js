const rateLimitWindowMS = 15 * 60 * 1000; // 15 minutes
const maxRequests = 100;

const ipRequestCounts = new Map();

const rateLimiter = (req, res, next) => {
  const currentTime = Date.now();
  const ip = req.ip;

  if (!ipRequestCounts.has(ip)) {
    ipRequestCounts.set(ip, []);
  }

  const timestamps = ipRequestCounts.get(ip);

  // Remove timestamps older than window
  while (timestamps.length > 0 && timestamps[0] <= currentTime - rateLimitWindowMS) {
    timestamps.shift();
  }

  if (timestamps.length >= maxRequests) {
    return res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later.",
    });
  }

  timestamps.push(currentTime);
  ipRequestCounts.set(ip, timestamps);

  next();
};

export default rateLimiter;
