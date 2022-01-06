"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDecipheriv = exports.createCipheriv = exports.CipherAlgorithm = void 0;
const sdk_1 = require("@hashgraph/sdk");
const crypto = __importStar(require("crypto"));
var CipherAlgorithm;
(function (CipherAlgorithm) {
    CipherAlgorithm["Aes128Ctr"] = "AES-128-CTR";
    CipherAlgorithm["Aes128Cbc"] = "AES-128-CBC";
})(CipherAlgorithm = exports.CipherAlgorithm || (exports.CipherAlgorithm = {}));
;
function createCipheriv(algorithm, key, iv, data) {
    const cipher = crypto.createCipheriv(algorithm, key.slice(0, 16), iv);
    return Promise.resolve(Buffer.concat([cipher.update(data), cipher["final"]()]));
}
exports.createCipheriv = createCipheriv;
function createDecipheriv(algorithm, key, iv, data) {
    const decipher = crypto.createDecipheriv(algorithm, key.slice(0, 16), iv);
    return Promise.resolve(Buffer.concat([decipher.update(data), decipher["final"]()]));
}
exports.createDecipheriv = createDecipheriv;
const key = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAryQICCl6NZ5gDKrnSztO
3Hy8PEUcuyvg/ikC+VcIo2SFFSf18a3IMYldIugqqqZCs4/4uVW3sbdLs/6PfgdX
7O9D22ZiFWHPYA2k2N744MNiCD1UE+tJyllUhSblK48bn+v1oZHCM0nYQ2NqUkvS
j+hwUU3RiWl7x3D2s9wSdNt7XUtW05a/FXehsPSiJfKvHJJnGOX0BgTvkLnkAOTd
OrUZ/wK69Dzu4IvrN4vs9Nes8vbwPa/ddZEzGR0cQMt0JBkhk9kU/qwqUseP1QRJ
5I1jR4g8aYPL/ke9K35PxZWuDp3U0UPAZ3PjFAh+5T+fc7gzCs9dPzSHloruU+gl
FQIDAQAB
-----END PUBLIC KEY-----`;
const main2 = async () => {
    const privateKey = sdk_1.PrivateKey.fromString('');
    privateKey.toBytes();
    const publicKey = sdk_1.PublicKey.fromString('');
    const data = JSON.stringify({
        name: "Aditya"
    });
    let ivBuffer = Buffer.alloc(16, 0);
    let dataBuffer = Buffer.from(data, 'utf-8');
    const pbk = crypto.createPublicKey({
        key: '',
        format: 'der',
        type: 'pkcs1'
    });
    const encrypted = crypto.publicEncrypt(pbk, dataBuffer);
    const decrypted = crypto.privateDecrypt(Buffer.from(publicKey.toBytes()), encrypted);
    console.log(decrypted, decrypted.toString('utf-8'));
};
main2();
//# sourceMappingURL=encryption.js.map