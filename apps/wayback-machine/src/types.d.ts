declare module '@ensdomains/content-hash' {
  export const decode: (hash: string) => string;
  export const cidForWeb: (hash: string) => string;
  export const getCodec: (hash: string) => string;
}
