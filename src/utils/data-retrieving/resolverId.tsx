import { getFromENSGraph } from './ENSGraph';

export const getResolverId = async(ens: string) => {
    return getFromENSGraph(
        `query GetENSResolver($ens: String!) {
          domains(where: {name: $ens}) {
            name
            resolver {
              id
            }
          }
        }`,
        { ens: ens },
        (result: any) => {
          if (result.data.domains.length === 0) return null
          return result.data.domains[0].resolver.id;
        }
    )
}
