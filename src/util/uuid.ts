export class UUIDUtil {
    static formatUUID(uuid: string): string {
        const normalizedUUID = uuid.replace(/-/g, "");
        if (normalizedUUID.length !== 32) {
            throw new Error("Invalid UUID format");
        }
        return `${normalizedUUID.slice(0, 8)}-${normalizedUUID.slice(8, 12)}-${normalizedUUID.slice(12, 16)}-${normalizedUUID.slice(16, 20)}-${normalizedUUID.slice(20)}`;
    }
}

export default UUIDUtil;