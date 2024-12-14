import {USER_PROFILE_URL, USER_UUID_URL} from "../types/urls";
import {MojangProfile, MojangUserProfile} from "../types/mojang";
import {CustomUser} from "../types/reponse";
import UUIDUtil from "../util/uuid";

const logError = async (response: Response): Promise<void> => {
    console.error(`Error: HTTP ${response.status} - ${response.statusText}`);
    console.error("Headers:", [...response.headers.entries()]);
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        console.error("Body:", await response.json());
    } else {
        console.error("Body:", await response.text());
    }
};

const fetchWithMojangConfig = async (url: string): Promise<Response> => {
    try {
        return await fetch(url, {
            method: "GET",
            cf: {
                mirage: true,
                polish: "lossy",
                cacheEverything: true,
                ttl: 3600,
                cacheTtl: 3600,
                cacheTtlByStatus: {
                    "200-399": 3600,
                    "400-499": 60,
                },
            },
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "portero-api/1.0 (+https://api.portero.dev/)",
            },
        });
    } catch (error) {
        console.error("Network error occurred while fetching:", error);
        throw new Error("Failed to fetch from Mojang API.");
    }
};

export const getUUID = async (uuid: string): Promise<MojangUserProfile | null> => {
    const url = `${USER_UUID_URL}/${uuid}`;
    try {
        const response = await fetchWithMojangConfig(url);

        if (response.ok) {
            return await response.json();
        }

        await logError(response);
        return null;
    } catch (error) {
        console.error("Error fetching UUID:", error);
        return null;
    }
};

export const getProfile = async (username: string): Promise<MojangProfile | null> => {
    const url = `${USER_PROFILE_URL}/${username}`;
    try {
        const response = await fetchWithMojangConfig(url);

        if (response.ok) {
            return await response.json();
        }

        await logError(response);
        return null;
    } catch (error) {
        console.error("Error fetching Profile:", error);
        return null;
    }
};

export const getCustomUserFormat = async (username: string): Promise<CustomUser | null> => {
    const uuidData = await getUUID(username);

    if (!uuidData) {
        console.error("UUID data not found for username:", username);
        return null;
    }

    return {
        username: uuidData.name,
        uuid: UUIDUtil.formatUUID(uuidData.id),
    };
};
