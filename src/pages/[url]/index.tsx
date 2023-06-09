'use client';

import { useEffect, useState } from "react";
import { StaticJsonRpcProvider } from '@ethersproject/providers'
import contentHash from 'content-hash'
import { Box, Flex } from "@chakra-ui/react"
import { Link, useParams } from "react-router-dom";
import Image from 'next/image';
import { Base58 } from '@ethersproject/basex';
import { toUtf8String } from '@ethersproject/strings';

import Timeline from "../../components/Timeline";

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
  if (!encoded.startsWith('0xe3') && !encoded.startsWith('0xe5')) {
    // Not an IPFS or IPNS link
    return ''
  }
  const ipfsv0 = contentHash.decode(encoded)

  if (encoded.startsWith('0xe5')) {
    try {
      return `https://` + toUtf8String(Base58.decode(ipfsv0).slice(2))
    } catch (e) {
      console.log(ipfsv0)
      return ''
    }
  }
  const ipfsv1 = contentHash.helpers.cidV0ToV1Base32(ipfsv0)
  return `https://${ipfsv1}.ipfs.dweb.link/`
}

export default function PageViewer() {

  const [snapshots, setSnapshots] = useState<{hash: string, date: number}[]>([])
  const [url, setUrl] = useState('')

  const { url: _url } = useParams()

  const data = snapshots.map(({ date, hash }) => ({
    date: new Date(date * 1000),
    value: hash
  }))

  const handleSnapshotChange = (value: string) => {
    setUrl(value)
  }
  useEffect(() => {
    if (_url) (async () => {
      const resolverId = await getFromENSGraph(`
        query GetENSResolver($ens: String!) {
          domains(where: {name: $ens}) {
            name
            resolver {
              id
            }
          }
        }`,
      { ens: _url },
      (result: any) => {
        if (result.data.domains.length === 0) throw new Error('No resolver found')
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
      setUrl(decodedWithDate[decoded.length - 1].hash)
    })()
  }, [_url])

  return (
    <Box
      position={'relative'}
    >
      <Box
        bg='primary.100'>
        <Flex
          px='30px'
          pt='15px'
          alignItems="center"
          direction={['column', 'column', 'row']}
        >
          <Box minWidth="120px">
            <Link to='/'>
              <Box mb={5}>
                <Image alt="Logo" src="/header-logo.svg" width="120" height="100" />
              </Box>
            </Link>
          </Box>
          <Box width="100%">
            <Timeline data={data} onItemSelected={handleSnapshotChange} activeItem={url} />
          </Box>
        </Flex>
        <iframe width="100%" style={{minHeight: "100vh", border: 0}} src={url? url: ''} />
      </Box>
    </Box>
  );
}
