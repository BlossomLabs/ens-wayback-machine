import { getFromENSGraph } from './ENSGraph';
import { StaticJsonRpcProvider } from '@ethersproject/providers'

const ethereumProvider = new StaticJsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/BZwin08uUdw6bSIy5pvWnglh7EXeQo64')


export const getDomainRenewals = async (domainId: string) => {
    return getFromENSGraph(
        `query domainRenewal($domainId: String!) {
          expiryExtendeds(where: {domain_: {id: $domainId}}) {
                transactionID
                expiryDate
                blockNumber
            }
        }`,
        { domainId: domainId },
        async (result: any) => {
            if (result.data.expiryExtendeds.length > 0) {
                // Remove empty objects (TheGraph returns empty object if event type does not match)
                const filtereDomainRenewals = result.data.expiryExtendeds.filter((obj: object) => Object.keys(obj).length > 0);

                // Obtain block timestamp and add event type
                const processedExpiryExtendeds = await Promise.all(filtereDomainRenewals.map(async (obj: any) => {
                    const block = await ethereumProvider.getBlock(obj.blockNumber);
                    return { ...obj, date: new Date(block.timestamp * 1000), eventType: "domainRenewal" }
                }));

                // Return the array with the domain renewal events
                return processedExpiryExtendeds
            }
        }
    )
}
