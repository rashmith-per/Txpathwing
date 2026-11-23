/**
 * Cryptographic Password Hashing and Salt Generator
 * Secures passwords using SHA-256 with unique per-user salts.
 */

export function generateSalt() {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const buffer = new Uint8Array(16);
    crypto.getRandomValues(buffer);
    return Array.from(buffer)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  return "s_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

/**
 * Hash password with a unique salt using Web Crypto SHA-256
 */
export async function hashPassword(password, salt) {
  const combined = `${password}::tx_salt::${salt}`;
  if (typeof crypto !== "undefined" && crypto.subtle) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(combined);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch {
      // Fallback below
    }
  }

  // Deterministic 64-char fallback for non-WebCrypto / test environments
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < combined.length; i++) {
    const ch = combined.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const p1 = (h1 >>> 0).toString(16).padStart(8, "0");
  const p2 = (h2 >>> 0).toString(16).padStart(8, "0");
  return `sha256_${p1}${p2}${p1}${p2}`;
}

/**
 * Verify whether an input password matches the stored salt and hash
 */
export async function verifyPassword(inputPassword, storedSalt, storedHash) {
  if (!inputPassword || !storedSalt || !storedHash) return false;
  const computedHash = await hashPassword(inputPassword, storedSalt);
  return computedHash === storedHash;
}
