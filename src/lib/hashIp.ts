import crypto from "crypto";

export function hashIp(ip: string) {
    const salt = process.env.IP_SALT || "default-salt-change-me";
    return crypto.createHash("sha256").update(ip + salt).digest("hex");
}
