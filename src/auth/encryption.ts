import { PrivateKey, PublicKey, } from "@hashgraph/sdk";
import * as crypto from "crypto";
import nacl from "tweetnacl";
export enum CipherAlgorithm  {
    Aes128Ctr = "AES-128-CTR",
    Aes128Cbc = "AES-128-CBC"
};



/**
 * @param {string} algorithm
 * @param {Uint8Array} key
 * @param {Uint8Array} iv
 * @param {Uint8Array} data
 * @returns {Promise<Uint8Array>}
 */
export function createCipheriv(algorithm:CipherAlgorithm, key:Uint8Array, iv:Uint8Array|null, data:Uint8Array):Promise<Uint8Array> {
    const cipher = crypto.createCipheriv(algorithm, key.slice(0, 16), iv);

    return Promise.resolve(
        Buffer.concat([cipher.update(data), cipher["final"]()])
    );
}

/**
 * @param {string} algorithm
 * @param {Uint8Array} key
 * @param {Uint8Array} iv
 * @param {Uint8Array} data
 * @returns {Promise<Uint8Array>}
 */
export function createDecipheriv(algorithm:CipherAlgorithm, key:Uint8Array ,iv:Uint8Array|null, data:Uint8Array):Promise<Uint8Array> {
    const decipher = crypto.createDecipheriv(algorithm, key.slice(0, 16), iv);

    return Promise.resolve(
        Buffer.concat([decipher.update(data), decipher["final"]()])
    );
}


const key = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAryQICCl6NZ5gDKrnSztO
3Hy8PEUcuyvg/ikC+VcIo2SFFSf18a3IMYldIugqqqZCs4/4uVW3sbdLs/6PfgdX
7O9D22ZiFWHPYA2k2N744MNiCD1UE+tJyllUhSblK48bn+v1oZHCM0nYQ2NqUkvS
j+hwUU3RiWl7x3D2s9wSdNt7XUtW05a/FXehsPSiJfKvHJJnGOX0BgTvkLnkAOTd
OrUZ/wK69Dzu4IvrN4vs9Nes8vbwPa/ddZEzGR0cQMt0JBkhk9kU/qwqUseP1QRJ
5I1jR4g8aYPL/ke9K35PxZWuDp3U0UPAZ3PjFAh+5T+fc7gzCs9dPzSHloruU+gl
FQIDAQAB
-----END PUBLIC KEY-----`

const main2 = async () =>{
  const privateKey = PrivateKey.fromString('')
  privateKey.toBytes()
  const publicKey = PublicKey.fromString('' )
  const data = JSON.stringify({
    name:"Aditya"
  })
  let ivBuffer = Buffer.alloc(16,0);
  let dataBuffer = Buffer.from(data,'utf-8')
  const pbk = crypto.createPublicKey({
    key:'',
    format:'der',
    type:'pkcs1'
  })
  const encrypted = crypto.publicEncrypt(pbk,dataBuffer)
  const decrypted = crypto.privateDecrypt(Buffer.from(publicKey.toBytes()),encrypted)
  console.log(decrypted,decrypted.toString('utf-8'));
} 
main2()