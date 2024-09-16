import crypto from "crypto";

let clientSeed =
  "000000000000000007a9a31ef7f07463d91af6a5454241d5fbf282e5f0fe1b3a";

export function genServerSeed() {
  return crypto.randomBytes(256).toString("hex");
}

/**
 *
 * @param {string} serverSeed
 * @returns {string} 
 */
export function genGameHash(serverSeed) {
  return crypto.createHash("sha256").update(serverSeed).digest("hex");
}


export function divisible(hash, mod) {
  // We will read in 4 hex at a time, but the first chunk might be a bit smaller
  // So ABCDEFGHIJ should be chunked like  AB CDEF GHIJ
  let val = 0;

  let o = hash.length % 4;
  for (let i = o > 0 ? o - 4 : 0; i < hash.length; i += 4) {
    val = ((val << 16) + parseInt(hash.substring(i, i + 4), 16)) % mod;
  }

  return val === 0;
}

/**
 * Generates a crash point based on a random hash.
 * @param {string} serverSeed
 * @returns {number}
 */
export function genCrashPointFromHash(serverSeed) {
  const min = 100
  const max = 10000
  const hash = crypto
    .createHmac("sha256", serverSeed)
    .update(clientSeed)
    .digest("hex");

  // In 1 of 101 games the game crashes instantly.
  if (divisible(hash, 33)) return min;
  // Use the most significant 52 bits from the hash to calculate the crash point
  const h = parseInt(hash.slice(0, 52 / 4), 16);
  const e = Math.pow(2, 52);
  const r = h/e // random number
  const k = 7 // decay constant
  // console.log(Math.exp(-k*r))
  return min + Math.ceil((max-min)*(Math.exp(-k*r)))
}


export function jogoDoDadoRNG () {
  return genCrashPointFromHash(genGameHash(genServerSeed()))
}
