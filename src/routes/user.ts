import {Hono} from "hono";
import {getCustomUserFormat} from "../services/profile";

const userRoutes = new Hono();

userRoutes.get("/:username", async (c) => {
        const username = c.req.param("username");
        const userProfile = await getCustomUserFormat(username)

        if (userProfile == null) {
            return c.json(
                {
                    success: false,
                    status: 404,
                    error: {
                        code: "WRONG_USERNAME",
                        message: "The username is not valid",
                    },
                },
                404
            );
        }

        return c.json({
            username: userProfile.username,
            uuid: userProfile.uuid,
        }, 200);
    }
)
;

export default userRoutes;
