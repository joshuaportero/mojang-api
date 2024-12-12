import {USER_PROFILE_URL, USER_UUID_URL} from "../types/urls"
import {MojangProfile, MojangUserProfile} from "../types/mojang";
import {CustomUser} from "../types/reponse";
import UUIDUtil from "../util/uuid";

export const getUUID = async (uuid: string): Promise<MojangUserProfile | null> => {
    const url = `${USER_UUID_URL}/${uuid}`;
    try {
        const response = await fetchWithMojangConfig(url);

        if (response.ok) {
            return await response.json();
        }

        switch (response.status) {
            case 404:
                console.error("User not found");
                break;
            case 429:
                console.error("Too many requests");
                break;
            case 500:
                console.error("Internal server error");
                break;
            default:
                console.error("Unknown error; status code:", response.status);
                console.error(await response.text());
                break;
        }

        return null;
    } catch (error) {
        console.error("Error fetching UUID:", error);
        return null;
    }
}

export const getProfile = async (username: string): Promise<MojangProfile | null> => {
    const url = `${USER_PROFILE_URL}/${username}`;
    try {
        const response = await fetchWithMojangConfig(url);
        if (response.ok) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.error("Error fetching UUID:", error);
        return null;
    }
}

export const getCustomUserFormat = async (username: string): Promise<CustomUser | null> => {
    const uuidData = await getUUID(username);

    if (!uuidData) {
        return null;
    }

    return {
        username: uuidData?.name,
        uuid: UUIDUtil.formatUUID(uuidData?.id)
    };
};

const fetchWithMojangConfig = async (url: string): Promise<Response> => {
    return fetch(url, {
        method: 'GET',
        cf: {
            mirage: true,
            polish: 'lossy',
            cacheEverything: true,
            cacheTtl: 3600,
            cacheTtlByStatus: {
                '200-299': 3600,
                '404': 0,
                '429': 0,
            },
        },
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'mojang-portero-api/1.0 (+https://mojang.portero.dev/api/v1)',
        },
    });
};