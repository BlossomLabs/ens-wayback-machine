'use client';

import { useEffect, useState } from "react";
import { StaticJsonRpcProvider } from '@ethersproject/providers'
import contentHash from 'content-hash'
import { Box, Flex, Text, Link, Card } from "@chakra-ui/react"
import Timeline from "../../components/Timeline";
import { useRouter } from "next/router";

const ethereumProvider = new StaticJsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/BZwin08uUdw6bSIy5pvWnglh7EXeQo64')

function getFromENSGraph(query: any, variables: any, path: any) {
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

}

function decode(encoded: string) {
  if (!encoded.startsWith('0xe3')) {
    // Not an IPFS link
    return ''
  }
  const ipfsv0 = contentHash.decode(encoded)
  const ipfsv1 = contentHash.helpers.cidV0ToV1Base32(ipfsv0)
  return ipfsv1
}

export default function PageViewer() {


  const router = useRouter()
  const { url } = router.query

  const [snapshots, setSnapshots] = useState<{hash: string, date: number}[]>([])
  const [ipfsUrl, setIpfsUrl] = useState('')

  const data = snapshots.map(({ date, hash }) => ({
    date: new Date(date * 1000),
    value: hash
  }))

  const handleSnapshotChange = (value: string) => {
    setIpfsUrl(value)
  }
  useEffect(() => {
    if (url) (async () => {
      const resolverId = await getFromENSGraph(`
        query GetENSResolver($ens: String!) {
          domains(where: {name: $ens}) {
            name
            resolver {
              id
            }
          }
        }`,
      { ens: url },
      (result: any) => {
        return result.data.domains[0].resolver.id
      }
      )
      const encoded = await getFromENSGraph(`
        query GetENSContentHashes($resolverId: String!) {
          contenthashChangeds(where: {resolver: $resolverId}) {
            blockNumber
            hash
          }
        }`,
      { resolverId },
      (result: any) => result.data.contenthashChangeds
      )
      const decoded = encoded.map(({hash, blockNumber}: {hash: string, blockNumber: number}) => ({
        hash: decode(hash),
        blockNumber
      }))

      const decodedWithDate = await Promise.all(
        decoded.map(async (obj: any) => {
          const block = await ethereumProvider.getBlock(obj.blockNumber)
          return {...obj, date: block.timestamp}
        })
      )
      setSnapshots(decodedWithDate)
      setIpfsUrl(decodedWithDate[decoded.length - 1].hash)
    })()
  }, [url])

  return (
    <Box
      position={'relative'}
      style={{
        backgroundColor: '#f5f5f5',
        backgroundImage: "url('./bg.png')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box
        bg='rgba(242, 193, 133, 0.5)'>
        <Flex
          px='30px'
          pt='15px'
          alignItems="center"
          direction={['column', 'column', 'row']}
        >
          <Box mr={[0, 0, '15px']} minWidth="150px">
            <Link href='/'
              _hover={{
                textDecoration: "unset",
              }}
            >
              <Card textAlign="center" border="2px solid rgba(0,0,0,0.5)">
                <Text
                  fontSize={20}
                  fontFamily="Amatic SC"
                >
                ENS Wayback Machine
                </Text>
              </Card>
            </Link>
          </Box>
          <Box width="100%" overflow={'scroll'}>
            <Timeline data={data} onItemSelected={handleSnapshotChange} activeItem={ipfsUrl} />
          </Box>
        </Flex>
        <iframe width="100%" style={{minHeight: "100vh", border: 0}} src={ipfsUrl? `https://${ipfsUrl}.ipfs.dweb.link/`: ''} />
      </Box>
    </Box>
  );
}
