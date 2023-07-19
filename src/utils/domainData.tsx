import { getFromENSGraph } from './ENSGraph';

export const getDomainData = async (ens: string) => {
  return getFromENSGraph(
    `query GetDomainId($ens: String!){
      domains(where: {name: $ens}) {
        id,
        expiryDate,
        createdAt
      }
    }`,
    {ens : ens },
    (result: any) => { 
        console.log(result)
        // return result.data.domains[0].id
        return {
          domainId: result.data.domains[0].id,
          expiryDate: new Date(result.data.domains[0].expiryDate * 1000),
          createdAt: new Date(result.data.domains[0].createdAt * 1000)
        }
    }
  )
};
