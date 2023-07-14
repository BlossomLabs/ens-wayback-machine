import { getFromENSGraph } from './ENSGraph';

export const getDomainId = async (ens: string) => {
  return getFromENSGraph(
    `query GetDomainId($ens: String!){
      domains(where: {name: $ens}) {
        id
      }
    }`,
    {ens : ens },
    (result: any) => { 
        return result.data.domains[0].id
    }
  )
};
