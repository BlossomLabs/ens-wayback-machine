import { getFromENSGraph } from './ENSGraph';
import { ethereumProvider } from './provider';

export const getDomainData = async (ens: string) => {
  // Get labelName
  const labelName = ens.slice(0, -4);

  const domainData = await getFromENSGraph(
    `query GetDomainId($ens: String!){
      domains(where: {name: $ens}) {
        id,
        expiryDate,
        createdAt,
        owner {
          id
        }, 
        registrant {
          id
        }
      }
    }`,
    { ens: ens },
    async (result: any) => {
      if (result.data.domains.length === 0) return;
      const ownerLookedUp = await ethereumProvider.lookupAddress(result.data.domains[0].owner.id);
      const registrarLookedUp = await ethereumProvider.lookupAddress(result.data.domains[0].owner.id);

      return {
        domainId: result.data.domains[0]?.id,
        ownerId: result.data.domains[0]?.owner.id,
        registrantId: result.data.domains[0]?.registrant.id,
        ownerLookedUp: ownerLookedUp,
        registrarLookedUp: registrarLookedUp,
        expiryDate: new Date (result.data.domains[0]?.expiryDate * 1000)
      };
    }
  );

  const initialDomainExpiry = await getFromENSGraph(
    `query GetDomainInitialExpiry($labelName: String!){
        registrationEvents(where: {registration_: {labelName: $labelName}}) {
          ... on NameRegistered {
            expiryDate,
            blockNumber
          }
        }
      }`,
    { labelName: labelName },
    async (result: any) => {

      if (result.data.registrationEvents.length > 0) {
        // Remove empty objects (TheGraph returns empty object if event type does not match)
        const filteredDate = result.data.registrationEvents.filter((obj: object) => Object.keys(obj).length > 0);
        // Obtain block timestamp and add event type
        const processedFilteredDate = await Promise.all(
          filteredDate.map(async (obj: any) => {
            const block = await ethereumProvider.getBlock(obj.blockNumber);
            return { initialExpiryDate: new Date(obj.expiryDate * 1000), createdAt: new Date(block!.timestamp * 1000) };
          })
        );
        return processedFilteredDate;
      }
    }
  );

  return { ...domainData, ...initialDomainExpiry };
};
