'use client';
import { useEffect, useState } from "react";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react"
import { Link, useParams } from "react-router-dom";
import Image from 'next/image';

import Timeline from "../../components/Timeline";

// Custom functions
import { getResolverId } from "@/utils/data-retrieving/resolverId";
import { getContentHashes } from "@/utils/data-retrieving/contentHashes";
import { retrieveData } from "@/utils/data-retrieving/retrieveData";

// Pages
import DomainUnavailableComponent from "../../components/DomainUnavailable";
import LoadingContentComponent from "@/components/LoadingContent";
import ContentUnavailableComponent from "@/components/ContentUnavailable";

export default function PageViewer() {
  const [snapshots, setSnapshots] = useState<{ hash: string; date: number }[]>([]);
  const [url, setUrl] = useState('');
  const { url: _url } = useParams();
  const [loading, setLoading] = useState(true)
  const [resolverId, setResolverId] = useState('')

  const [data, setData] = useState<any[]>([])

  const [timelineLoader, setTimelineLoader] = useState(true)
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
          if (!result) {
            setLoading(false)
          }
        })
        await retrieveData(_url).then((result) => {
          setData(result)
          setTimelineLoader(false)
        })
      })();
    } 
  }, [_url])

  useEffect(() => {
    if (_url && resolverId) {
      (async () => {
        // Get content
        await getContentHashes(resolverId).then((result) => {
          if(result) {
            setSnapshots(result.decodedWithDate)
            setUrl(result.url)
          }
          setLoading(false)
        })
      })();
    }
  }, [_url, resolverId]);

  useEffect(() => {
    // Process snapshots data
    const snapshotsData: any[] = snapshots.map(({ date, hash }) => ({
      date: new Date(date * 1000),
      urlValue: hash,
      eventType: hash ? "contentUpload" : null // remove those without hash (no new content)
    }));

    let mergedData = [...data, ...snapshotsData]

    console.log(mergedData)

    mergedData.sort((a, b) => a.date.getTime() - b.date.getTime());

    setTimelineData(mergedData)

  }, [data])

  if (!resolverId && loading) {
    return (
      <>
        <LoadingContentComponent />
      </>
    )
  } else if (!resolverId && !loading) {
    return (
      <>
        <DomainUnavailableComponent />
      </>
    )
  } else if (resolverId && snapshots.length === 0 && !loading) {
    return (
      <>
        <ContentUnavailableComponent />
      </>
    )
  } else if (snapshots.length > 0) {
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
              {
                timelineLoader ? (
                  <Flex justifyContent="center" alignItems="center">
                    <Text fontSize="xl" marginX="2">Loading timeline...</Text>
                    <Spinner size="lg" marginX="2"/>
                  </Flex>
                ) : (
                  <Timeline data={timelineData} onItemSelected={handleSnapshotChange} activeItem={url} />
                )
              }
            </Box>
          </Flex>
          <iframe width="100%" style={{ minHeight: "100vh", border: 0 }} src={url ? url : ''} />
        </Box>
      </Box>
    );
  } else {
    return <LoadingContentComponent />
  }
}