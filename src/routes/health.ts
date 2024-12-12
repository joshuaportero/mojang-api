import { Hono } from "hono";

const healthRoutes = new Hono();

const startTime = Date.now();

healthRoutes.get("/", (c) => {
  const currentTime = Date.now();
  const healthInfo = {
    status: "UP",
    uptime: (currentTime - startTime) / 1000,
    timestamp: new Date().toISOString(),
  };

  return c.json(healthInfo, 200);
});

export default healthRoutes;
