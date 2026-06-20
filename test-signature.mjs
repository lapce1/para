// Reproduces the worked example from https://asxgw.com/documentation/gateway
// to prove our HMAC-SHA512 signing matches the gateway byte-for-byte.

async function sha512Hex(input) {
  const d = await crypto.subtle.digest("SHA-512", new TextEncoder().encode(input));
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function hmacSha512Base64(secret, message) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-512" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  let bin = "";
  for (const b of new Uint8Array(sig)) bin += String.fromCharCode(b);
  return btoa(bin);
}

const body = '{"merchantTransactionId":"2019-09-02-0004","amount":"9.99","currency":"EUR"}';
const secret = "my-shared-secret";
const contentType = "application/json; charset=utf-8";
const date = "Tue, 21 Jul 2020 13:15:03 UTC";
const uri = "/api/v3/transaction/my-api-key/debit";

const EXPECTED_BODY_HASH = "efe0b7cd39d6904dc90924b1a89629b14f11082ed2178cff562364ca0172318e1535bb8766fbe66e8cc44d311eba806349bfe185607eca12d9d0f377a03ee617";
const EXPECTED_SIGNATURE = "nL+8FBKWx4/pahYScKs/dRYPBEWjiBalRaWKHGtxLpELmLrgJ/+dSWjt6dZNuu6oF18NyWEU8tXLEVm2mtEapg==";

const bodyHash = await sha512Hex(body);
const message = ["POST", bodyHash, contentType, date, uri].join("\n");
const signature = await hmacSha512Base64(secret, message);

const hashOk = bodyHash === EXPECTED_BODY_HASH;
const sigOk = signature === EXPECTED_SIGNATURE;

console.log("body SHA-512 matches doc:", hashOk);
console.log("HMAC signature matches doc:", sigOk);
if (!hashOk || !sigOk) {
  console.error("MISMATCH\n got hash:", bodyHash, "\n got sig :", signature);
  process.exit(1);
}
console.log("\n✓ Signing reproduces AllSecure's published test vector exactly.");
