const API_KEY = process.env.NEXT_PUBLIC_THEGRAPH_API_KEY;
const ENS_GRAPH_URL = API_KEY
  ? `https://gateway-arbitrum.network.thegraph.com/api/${API_KEY}/subgraphs/id/5XqPmWe6gjyrJtFn9cLy237i4cWw2j9HcUJEXsP5qGtH`
  : "https://api.thegraph.com/subgraphs/name/ensdomains/ens";

export const getFromENSGraph = (query: any, variables: any, path: any) => {
  return fetch(ENS_GRAPH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then((res) => res.json())
    .then(path);
};
