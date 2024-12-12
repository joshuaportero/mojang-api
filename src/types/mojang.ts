export interface MojangUserProfile {
    id: string;
    name: string;
}

export interface MojangProfile {
    id: string;
    name: string;
    properties: MojangProfileProperty[];
}

export interface MojangProfileProperty {
    name: string;
    signature?: string;
    value: string;
}

export interface DecodedMojangProfile {
    timestamp: number;
    profileId: string;
    profileName: string;
    signatureRequired?: boolean;
    textures: Textures[];
}

export interface Textures {
    [key: string]: TextureDetails;
}

export interface TextureDetails {
    url: string;
    metadata?: SkinMetadata;
}

export interface SkinMetadata {
    model: string;
}