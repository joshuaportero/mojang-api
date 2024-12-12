import {USER_PROFILE_URL, USER_UUID_URL} from "../types/urls"
import {MojangProfile, MojangUserProfile} from "../types/mojang";
import {CustomUser} from "../types/reponse";
import UUIDUtil from "../util/uuid";

export const getUUID = async (uuid: string): Promise<MojangUserProfile | null> => {
    const url = `${USER_UUID_URL}/${uuid}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
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
        const response = await fetch(url)
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