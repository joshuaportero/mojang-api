import {USER_PROFILE_URL, USER_UUID_URL} from "../types/urls"
import {MojangProfile, MojangUserProfile} from "../types/mojang";
import {CustomUser} from "../types/custom";

export const getUUID = async (uuid: string): Promise<MojangUserProfile | null> => {
    const url = `${USER_UUID_URL}/${uuid}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        }
        console.error(`Error fetching UUID: ${response.status}`);
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
        console.error(`Error fetching UUID: ${response.status}`);
        return null;
    } catch (error) {
        console.error("Error fetching UUID:", error);
        return null;
    }
}

export const getCustomUserFormat = async (username: string): Promise<CustomUser | null> => {
    const uuidData = await getUUID(username);

    if (!uuidData) {
        return null; // Return null if UUID fetch fails
    }

    const profileData = await getProfile(uuidData.id);

    if (!profileData) {
        return null; // Return null if profile fetch fails
    }

    const texturesProperty = profileData.properties.find(prop => prop.name === "textures");
    let skinUrl: string | null = null;

    if (texturesProperty) {
        try {
            const decoded = JSON.parse(atob(texturesProperty.value));
            skinUrl = decoded.textures?.SKIN?.url || null;
        } catch (error) {
            console.error("Error decoding textures property:", error);
        }
    }

    return {
        username: profileData.name,
        uuid: profileData.id,
    };
};