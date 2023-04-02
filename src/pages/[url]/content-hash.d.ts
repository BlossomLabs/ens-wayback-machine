declare module 'content-hash' {
  export const decode: (hash: string) => any;
  export const helpers = {
    cidV0ToV1Base32: (ipfsv0: string) => string,
  }
}