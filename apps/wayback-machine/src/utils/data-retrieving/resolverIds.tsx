import { namehash } from 'ethers/hash';
import { getFromENSGraph } from './ENSGraph';

export const getResolverIds = async(ens: string) => {
  return getFromENSGraph(
    `query GetENSResolvers($id: String!) {
        resolvers(where:{domain: $id}){
          id
        }
        }`,
    { id: namehash(ens) },
    (result: {data: {resolvers: {id: string}[]}}) => {
      if (result.data.resolvers.length === 0) return null
      return result.data.resolvers.map((resolver) => resolver.id);
    }
  )
}
