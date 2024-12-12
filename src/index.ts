import {Hono} from "hono";
import userRoutes from "./routes/user";
import healthRoutes from "./routes/health";
import {notFoundHandler} from "./routes/notFound";

const app = new Hono();

const ROUTE_PREFIX = "/api/v1";

app.route(ROUTE_PREFIX + "/user", userRoutes);
app.route(ROUTE_PREFIX + "/health", healthRoutes);

app.notFound(notFoundHandler);

export default app;
