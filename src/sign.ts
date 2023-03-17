import { createHmac } from "crypto";

export function sign(str: string, key: string) {
  const hash = createHmac("sha1", key).update(str).digest("base64url");
  return hash;
}
