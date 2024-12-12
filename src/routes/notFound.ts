import { Context } from "hono";

export const notFoundHandler = (c: Context) => {
  return c.json(
    {
      success: false,
      status: 404,
      error: {
        code: "RESOURCE_NOT_FOUND",
        message: "The requested resource was not found on this server.",
      },
    },
    404
  );
};
