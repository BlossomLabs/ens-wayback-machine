import { getFromENSGraph } from './ENSGraph';
import { ethereumProvider } from './provider';

export const getDomainRenewals = async (ens: any) => {
  // Get labelName
  const labelName = ens.slice(0, -4)

  return getFromENSGraph(
    `query GetDomainRenewals($labelName: String!){
            registrationEvents(where: {registration_: {labelName: $labelName}}) {
              ... on NameRenewed {
                blockNumber
                transactionID
                expiryDate
              }
            }
          }`,
    { labelName: labelName },
    async (result: any) => {
      if (result.data.registrationEvents.length > 0) {
        // Remove empty objects (TheGraph returns empty object if event type does not match)
        const filtereDomainRenewals = result.data.registrationEvents.filter((obj: object) => Object.keys(obj).length > 0);

        // Obtain block timestamp and add event type
        const processedExpiryExtendeds = await Promise.all(filtereDomainRenewals.map(async (obj: any) => {
          const block = await ethereumProvider.getBlock(obj.blockNumber);
          const from = (await ethereumProvider.getTransaction(obj.transactionID))!.from;
          const fromLookedUp = await ethereumProvider.lookupAddress(from);

          return { ...obj, date: new Date(block!.timestamp * 1000), eventType: "domainRenewal", from: from, fromLookedUp: fromLookedUp}
        }));

        // Return the array with the domain renewal events
        return processedExpiryExtendeds
      }
    }
  )
}
