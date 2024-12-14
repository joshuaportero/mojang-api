import {Hono} from "hono";
import userRoutes from "./routes/user";
import healthRoutes from "./routes/health";
import {notFoundHandler} from "./routes/notFound";

const app = new Hono();

const ROUTE_PREFIX = "/mojang/v1";

app.use('*', async (c, next) => {
    c.header('Access-Control-Allow-Origin', '*');
    c.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    c.header('Access-Control-Max-Age', '86400');
    if (c.req.method === 'OPTIONS') return c.text('OK', 204);
    await next();
});

app.route(ROUTE_PREFIX + "/user", userRoutes);
app.route(ROUTE_PREFIX + "/health", healthRoutes);

app.notFound(notFoundHandler);

export default app;
