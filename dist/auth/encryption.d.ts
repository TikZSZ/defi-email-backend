export declare enum CipherAlgorithm {
    Aes128Ctr = "AES-128-CTR",
    Aes128Cbc = "AES-128-CBC"
}
export declare function createCipheriv(algorithm: CipherAlgorithm, key: Uint8Array, iv: Uint8Array | null, data: Uint8Array): Promise<Uint8Array>;
export declare function createDecipheriv(algorithm: CipherAlgorithm, key: Uint8Array, iv: Uint8Array | null, data: Uint8Array): Promise<Uint8Array>;
