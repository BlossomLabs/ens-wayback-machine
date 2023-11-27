import { getFromENSGraph } from "./ENSGraph"
import { StaticJsonRpcProvider } from '@ethersproject/providers'

const ethereumProvider = new StaticJsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/BZwin08uUdw6bSIy5pvWnglh7EXeQo64')

export const getTransfers = async (domainId: string) => {

  return getFromENSGraph(
    `query GetDomainTransfers($domainId: String!) {
        domainEvents(
          where: {domain: $domainId}
        ) {
          ... on Transfer {
            id
            transactionID
            blockNumber
            owner {
              id
            }
          }
        }
      }`,
    { domainId: domainId },
    async (result: any) => {

      // If there are transfers
      if (result.data.domainEvents.length > 0) {
        // Remove empty objects (TheGraph returns empty object if event type does not match)
        const filteredTransfers = result.data.domainEvents.filter((obj: object) => Object.keys(obj).length > 0);
        // Obtain block timestamp and add event type
        const processedTransfers = await Promise.all(filteredTransfers.map(async (obj: any) => {
          const block = await ethereumProvider.getBlock(obj.blockNumber);
          const lookupOwner = await ethereumProvider.lookupAddress(obj.owner.id)
          return { ...obj, date: new Date(block.timestamp * 1000), eventType: "transfer", ownerLookedUp: lookupOwner};
        }));

        // Return the array with the wrapped transfers
        return processedTransfers
      }
    })
}