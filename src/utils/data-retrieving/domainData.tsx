import { getFromENSGraph } from './ENSGraph';
import { StaticJsonRpcProvider } from '@ethersproject/providers'

const ethereumProvider = new StaticJsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/BZwin08uUdw6bSIy5pvWnglh7EXeQo64')

export const getDomainData = async (ens: string) => {

  // Get labelName
  const labelName = ens.slice(0, -4)

  const domainData = await getFromENSGraph(
    `query GetDomainId($ens: String!){
      domains(where: {name: $ens}) {
        id,
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
        }
    }
  )

  const initialDomainExpiry = await getFromENSGraph(
    `query GetDomainInitialExpiry($labelName: String!){
        registrationEvents(where: {registration_: {labelName: $labelName}}) {
          ... on NameRegistered {
            expiryDate,
            blockNumber
          }
        }
      }`,
    {labelName : labelName },
    (async (result: any) => { 
      const block = await ethereumProvider.getBlock(result.data.registrationEvents[0].blockNumber);
      return {
        initialExpiryDate: new Date(result.data.registrationEvents[0].expiryDate * 1000),
        createdAt: new Date(block.timestamp * 1000)
      }
    })
  )

  return {...domainData, ...initialDomainExpiry}
  
};
