import crypto from "crypto";

let clientSeed =
  "000000000000000007a9a31ef7f07463d91af6a5454241d5fbf282e5f0fe1b3a";

function genServerSeed() {
  return crypto.randomBytes(256).toString("hex");
}

/**
 *
 * @param {string} serverSeed
 * @returns {string} 
 */
function genGameHash(serverSeed) {
  return crypto.createHash("sha256").update(serverSeed).digest("hex");
}


function divisible(hash, mod) {
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
function genCrashPointFromHash(serverSeed) {
  let hash = crypto
    .createHmac("sha256", serverSeed)
    .update(clientSeed)
    .digest("hex");

  // In 1 of 101 games the game crashes instantly.
  if (divisible(hash, 49)) return 100;
  // Use the most significant 52 bits from the hash to calculate the crash point
  let h = parseInt(hash.slice(0, 52 / 4), 16);
  let e = Math.pow(2, 52);

  return Math.min(Math.floor((100 * e - h) / (e - h)), 10000); // 100 max value
}


export function jogoDoDadoRNG () {
  return genCrashPointFromHash(genGameHash(genServerSeed()))/100
}
