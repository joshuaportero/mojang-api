import {Hono} from "hono";
import {getUUID} from "../services/profile";
import UUIDUtil from "../util/uuid";

const userRoutes = new Hono();

userRoutes.get("/:username", async (c) => {
    const username = c.req.param("username");
    const userProfile = await getUUID(username);

    if (userProfile == null) {
        return c.json({error: "User not found"}, 404);
    }

    return c.json({
        username: userProfile.name,
        uuid: UUIDUtil.formatUUID(userProfile.id),
    }, 200);
});

export default userRoutes;
