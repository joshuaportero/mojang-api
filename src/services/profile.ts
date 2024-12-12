import { USER_PROFILE_URL, USER_UUID_URL } from "../types/urls";
import { MojangProfile, MojangUserProfile } from "../types/mojang";
import { CustomUser } from "../types/reponse";
import UUIDUtil from "../util/uuid";

// Centralized Error Logger
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

// Fetch Wrapper with Config
const fetchWithMojangConfig = async (url: string): Promise<Response> => {
    return fetch(url, {
        method: "GET",
        cf: {
            mirage: true,
            polish: "lossy",
            cacheEverything: true,
            cacheTtl: 3600,
            cacheTtlByStatus: {
                "200-299": 3600,
                "404": 0,
                "429": 0,
            },
        },
        headers: {
            Accept: "application/json",
            "User-Agent": "mojang-portero-api/1.0 (+https://mojang.portero.dev/api/v1)",
        },
    });
};

// Fetch UUID by Username
export const getUUID = async (uuid: string): Promise<MojangUserProfile | null> => {
    const url = `${USER_UUID_URL}/${uuid}`;
    try {
        const response = await fetchWithMojangConfig(url);

        if (response.ok) {
            return await response.json();
        }

        await logError(response); // Log detailed errors for non-2XX responses

        return null;
    } catch (error) {
        console.error("Error fetching UUID:", error);
        return null;
    }
};

// Fetch Profile by Username
export const getProfile = async (username: string): Promise<MojangProfile | null> => {
    const url = `${USER_PROFILE_URL}/${username}`;
    try {
        const response = await fetchWithMojangConfig(url);

        if (response.ok) {
            return await response.json();
        }

        await logError(response); // Log detailed errors for non-2XX responses

        return null;
    } catch (error) {
        console.error("Error fetching Profile:", error);
        return null;
    }
};

// Convert UUID Data to Custom User Format
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
