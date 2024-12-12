import { Hono } from "hono";

const userRoutes = new Hono();

userRoutes.get("/", (c) => {
  return c.json({ message: "User route accessed" });
});

export default userRoutes;
