import { getFromENSGraph } from "./ENSGraph";
import { StaticJsonRpcProvider } from '@ethersproject/providers'
import contentHash from 'content-hash'
import { Base58 } from '@ethersproject/basex';
import { toUtf8String } from '@ethersproject/strings';

function decode(encoded: string) {
  if (!encoded.startsWith('0xe3') && !encoded.startsWith('0xe5')) {
    // Not an IPFS or IPNS link
    return ''
  }
  const ipfsv0 = contentHash.decode(encoded)

  if (encoded.startsWith('0xe5')) {
    try {
      return `https://` + toUtf8String(Base58.decode(ipfsv0).slice(2))
    } catch (e) {
      return ''
    }
  }
  const ipfsv1 = contentHash.helpers.cidV0ToV1Base32(ipfsv0)
  return `https://${ipfsv1}.ipfs.ens.site/`
}

const ethereumProvider = new StaticJsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/BZwin08uUdw6bSIy5pvWnglh7EXeQo64')


export const getContentHashes = async (resolverId: string) => {
  return getFromENSGraph(
    `query GetENSContentHashes($resolverId: String!) {
      contenthashChangeds(where: {resolver: $resolverId}) {
        blockNumber
        hash
      }
    }`,
    { resolverId },
    async (result: any) => {
      if (result.data.contenthashChangeds.length > 0) {
        // Decode content hashes
        const decodedHashes = result.data.contenthashChangeds.map(({ hash, blockNumber }: { hash: string; blockNumber: number }) => ({
          hash: decode(hash),
          blockNumber
        }));

        // Include date
        const decodedWithDate = await Promise.all(
          decodedHashes.map(async (obj: any) => {
            const block = await ethereumProvider.getBlock(obj.blockNumber);
            return { ...obj, date: block.timestamp };
          })
        );

        return {
          decodedWithDate: decodedWithDate,
          url: decodedWithDate[decodedHashes.length - 1].hash
        }
      } else {
        return null
      }
    }
  );
}