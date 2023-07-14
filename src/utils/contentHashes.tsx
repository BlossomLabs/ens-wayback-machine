import { getFromENSGraph } from "./ENSGraph";

export const getContentHashes = async(resolverId: string) => {
    return getFromENSGraph(
    `query GetENSContentHashes($resolverId: String!) {
      contenthashChangeds(where: {resolver: $resolverId}) {
        blockNumber
        hash
      }
    }`,
    { resolverId },
    (result: any) => result.data.contenthashChangeds
  );}