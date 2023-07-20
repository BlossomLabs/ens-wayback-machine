import { getFromENSGraph } from './ENSGraph';

export const getDomainData = async (ens: string) => {
  return getFromENSGraph(
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
    {ens : ens },
    (result: any) => { 
        return {
          domainId: result.data.domains[0].id,
          ownerId: result.data.domains[0].owner.id,
          registrantId: result.data.domains[0].registrant.id,
          expiryDate: new Date(result.data.domains[0].expiryDate * 1000),
          createdAt: new Date(result.data.domains[0].createdAt * 1000)
        }
    }
  )
};
