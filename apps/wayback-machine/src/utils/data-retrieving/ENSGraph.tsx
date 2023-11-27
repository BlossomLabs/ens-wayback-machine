export const getFromENSGraph = (query: any, variables: any, path: any) => {
  return fetch('https://api.thegraph.com/subgraphs/name/ensdomains/ens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then((res) => res.json())
    .then(path);
};