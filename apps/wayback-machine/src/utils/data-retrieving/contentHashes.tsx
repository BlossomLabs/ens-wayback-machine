import { cidForWeb, decode, getCodec } from "@ensdomains/content-hash";
import { getFromENSGraph } from "./ENSGraph";
import { ethereumProvider } from "./provider";

function ipfsUrl(encoded: string) {
  const ipfsv0 = decode(encoded);
  const ipfsv1 = cidForWeb(ipfsv0);
  return `https://${ipfsv1}.ipfs.ens.site/`;
}

function ipnsUrl(encoded: string) {
  const ipfsv0 = decode(encoded);
  console.log(ipfsv0);
  try {
    const ipfsv1 = cidForWeb(ipfsv0);
    return `https://${ipfsv1}.ipns.ens.site/`;
  } catch (e) {
    return `https://${ipfsv0}`;
  }
}

function toUrl(encoded: string) {
  if (encoded === "0x") return "";
  switch (getCodec(encoded)) {
    case "ipfs":
      return ipfsUrl(encoded);
    case "ipns":
      return ipnsUrl(encoded);
    default:
      return "";
  }
}

export const getContentHashes = async (resolverIds: string[]) => {
  return getFromENSGraph(
    `query GetENSContentHashes($resolverIds: [String!]!) {
      contenthashChangeds(where: {resolver_in: $resolverIds}) {
        blockNumber
        hash
      }
    }
    `,
    { resolverIds },
    async (result: any) => {
      if (result.data.contenthashChangeds.length > 0) {
        // Decode content hashes
        const decodedHashes = result.data.contenthashChangeds.map(
          ({ hash, blockNumber }: { hash: string; blockNumber: number }) => ({
            hash: toUrl(hash),
            blockNumber,
          }),
        );

        // Include date
        const decodedWithDate = await Promise.all(
          decodedHashes.map(async (obj: any) => {
            const block = await ethereumProvider.getBlock(obj.blockNumber);
            return { ...obj, date: block?.timestamp };
          }),
        );

        return {
          decodedWithDate: decodedWithDate,
          url: decodedWithDate[decodedHashes.length - 1].hash,
        };
      }
      return null;
    },
  );
};
