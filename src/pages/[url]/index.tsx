'use client';

import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react"
import { Link, useParams } from "react-router-dom";
import Image from 'next/image';

// Functions
import { getDomainId } from "@/utils/domainId";

import Timeline from "../../components/Timeline";
import { getTransfersAndWrappedTransfers } from "@/utils/transfers";
import { getResolverId } from "@/utils/resolverId";
import { getContentHashes } from "@/utils/contentHashes";

export default function PageViewer() {
  const [snapshots, setSnapshots] = useState<{ hash: string; date: number }[]>([]);
  const [url, setUrl] = useState('');
  const { url: _url } = useParams();
  const [domainId, setDomainId] = useState('');
  const [wrappedTransfers, setWrappedTransfers] = useState<{
    id: string;
    transactionID: string;
    blockNumber: number;
    owner: object;
    date: Date;
  }[]>([]);

  const [timelineData, setTimelineData] = useState<any[]>([])


  const data = snapshots.map(({ date, hash }) => ({
    date: new Date(date * 1000),
    urlValue: hash,
    eventType: hash ? "contentUpload" : "newDomain"
  }));

  const handleSnapshotChange = (urlValue: string) => {
    setUrl(urlValue);
  };

  useEffect(() => {
    if (_url) {
      (async () => {

        // Get resolver id
        const resolverId = await getResolverId(_url).then((result) => {
          return result
        })

        // Get content
        await getContentHashes(resolverId).then((result) => {
          setSnapshots(result.decodedWithDate)
          setUrl(result.url)
        })

        // Get domainId
        await getDomainId(_url).then((result) => {
          setDomainId(result)
        })

        // Get Wrapped Transfers
        await getTransfersAndWrappedTransfers(domainId).then((result) => {
          // Without console log it does not work. Why?
          console.log(result)
          setWrappedTransfers(result)
        })
      })();


      console.log(domainId)
      console.log(wrappedTransfers)

    }
  }, [_url, domainId]);


  if(data) {
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
          <iframe width="100%" style={{ minHeight: "100vh", border: 0 }} src={url ? url : ''} />
        </Box>
      </Box>
    );
  } else {
    // Handle screen when there is no data (user inputs url param)
  }

}