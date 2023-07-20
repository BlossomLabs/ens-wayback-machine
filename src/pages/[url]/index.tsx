'use client';

import { Card, Text, Input, InputGroup, InputLeftElement, Heading, Container, HStack } from "@chakra-ui/react"

import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react"
import { Link, useParams } from "react-router-dom";
import Image from 'next/image';

import Timeline from "../../components/Timeline";
import { getDomainData } from "@/utils/data-retrieving/domainData";

// Custom functions
import { getWrappedTransfers } from "@/utils/data-retrieving/wrappedTransfers";
import { getTransfers } from "@/utils/data-retrieving/transfers";
import { getResolverId } from "@/utils/data-retrieving/resolverId";
import { getContentHashes } from "@/utils/data-retrieving/contentHashes";
import { getDomainRenewals } from "@/utils/data-retrieving/domainRenewal";

export default function PageViewer() {
  const [snapshots, setSnapshots] = useState<{ hash: string; date: number }[]>([]);
  const [url, setUrl] = useState('');
  const { url: _url } = useParams();
  const [resolverId, setResolverId] = useState('')
  const [domainId, setDomainId] = useState('');
  const [domainRegistrantId, setDomainRegistrantId] = useState('')
  const [initialDomainOwnerId, setInitialDomainOwnerId] = useState('')
  const [initialExpiryDate, setInitialExpiryDate] = useState(Date)
  const [createdAtDate, setCreatedAtDate] = useState(Date)
  const [ownerLookedUp, setOwnerLookedUp] = useState('')
  const [registrarLookedUp, setRegistrarLookedUp] = useState('')
  const [domainRenewals, setDomainRenewals] = useState<{
    date: Date,
    expiryDate: string,
    transactionID: string,
    eventType: string
  }[]>([]);
  const [wrappedTransfers, setWrappedTransfers] = useState<{
    id: string;
    transactionID: string;
    blockNumber: number;
    owner: object;
    date: Date;
    urlValue: string;
    eventType: string;
  }[]>([]);

  const [transfers, setTransfers] = useState<{
    id: string;
    transactionID: string;
    blockNumber: number;
    owner: object;
    date: Date;
    urlValue: string;
    eventType: string;
  }[]>([]);

  const [timelineData, setTimelineData] = useState<any[]>([])

  const handleSnapshotChange = (urlValue: string) => {
    setUrl(urlValue);
  };

  useEffect(() => {
    if (_url) {
      (async () => {
        // Get resolver id
        await getResolverId(_url).then((result) => {
          setResolverId(result)
        })
      })();
    } 
  }, [_url])

  useEffect(() => {
    if (_url && resolverId) {
      (async () => {
        // Get content
        await getContentHashes(resolverId).then((result) => {
          setSnapshots(result.decodedWithDate)
          setUrl(result.url)
        })

        // Get domainId
        await getDomainData(_url).then((result) => {
          setDomainId(result.domainId)
          setInitialDomainOwnerId(result.ownerId)
          setDomainRegistrantId(result.registrantId)
          setOwnerLookedUp(result.ownerLookedUp)
          setRegistrarLookedUp(result.registrarLookedUp)
          setInitialExpiryDate(result[0].initialExpiryDate)
          setCreatedAtDate(result[0].createdAt)
        })

      })();
    }

    if (domainId) {
      (async () => {
        // Get Wrapped Transfers
        await getWrappedTransfers(domainId).then((result) => {
          if (result) setWrappedTransfers(result)
        })

        // Get Transfers
        await getTransfers(domainId).then((result) => {
          if (result) setTransfers(result)
        })

        // Get Expiry Extensions (Domain renewal)
        await getDomainRenewals(_url).then((result) => {
          if (result) setDomainRenewals(result)
        })
      })();
    }
  }, [_url, domainId, resolverId]);

  useEffect(() => {
    // Process snapshots data
    const snapshotsData: any[] = snapshots.map(({ date, hash }) => ({
      date: new Date(date * 1000),
      urlValue: hash,
      eventType: hash ? "contentUpload" : null // remove those without hash (no new content)
    }));

    const createdAtData: { date: Date, eventType: string, initialDomainOwner: string, domainRegistrantId: string, initialExpiryDate: Date, ownerLookedUp: string, registrarLookedUp: string }[] = [{
      date: new Date(createdAtDate),
      eventType: 'domainRegistration',
      initialDomainOwner: initialDomainOwnerId,
      domainRegistrantId: domainRegistrantId,
      initialExpiryDate: new Date(initialExpiryDate),
      ownerLookedUp: ownerLookedUp,
      registrarLookedUp: registrarLookedUp
    }]

    let mergedData = [...createdAtData, ...snapshotsData, ...(wrappedTransfers || []), ...(transfers || []), ...(domainRenewals || [])]

    mergedData.sort((a, b) => a.date.getTime() - b.date.getTime());

    setTimelineData(mergedData)

  }, [snapshots, wrappedTransfers, transfers, domainRenewals])

  if (!resolverId) {
    return (
      <>
      <Flex
        minHeight="100vh"
        align="center"
        justify="center"
      >
        <Container>
          <Box
            backgroundColor="rgba(193, 143, 101, 0.9)"
            borderRadius="8px"
            border={"2px solid black"}
            p={4}
          >
            <Box bg="primary.500" borderRadius="5px" p={4} mt="-60px" border="3px solid black">
              <Heading textAlign="center" fontSize={"37px"}>
                ENS Wayback Machine
              </Heading>
            </Box>
            <Text textAlign="center" mt={4} fontSize={"26px"}>
              This domain is not available, please, go back and try again.
            </Text>
            <Link to={'/'}>
            <Text textAlign="center" fontWeight="bold" mt={8} fontSize={"32px"}>
              Click here to go back
            </Text>
            </Link>
            </Box>
        </Container>
      </Flex>
      </>
    )
  } else {
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
              <Timeline data={timelineData} onItemSelected={handleSnapshotChange} activeItem={url} />
            </Box>
          </Flex>
          <iframe width="100%" style={{ minHeight: "100vh", border: 0 }} src={url ? url : ''} />
        </Box>
      </Box>
    );
  }
}