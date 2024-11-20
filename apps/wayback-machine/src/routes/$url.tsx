import {
  Box,
  Flex,
  Image,
  Spinner,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { Link, useParams } from "@tanstack/react-router";
import type * as React from "react";
import { useEffect, useState } from "react";

import Timeline from "@/components/Timeline";

import { getContentHashes } from "@/utils/data-retrieving/contentHashes";
import { getResolverIds } from "@/utils/data-retrieving/resolverIds";
import { retrieveData } from "@/utils/data-retrieving/retrieveData";

import ContentUnavailableComponent from "@/components/ContentUnavailable";
import DomainUnavailableComponent from "@/components/DomainUnavailable";
import LoadingContentComponent from "@/components/LoadingContent";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/$url")({
  component: RouteComponent,
});

function Header({ timeline }: { timeline: React.ReactElement | false }) {
  return (
    <Flex
      px="30px"
      pt="15px"
      alignItems="center"
      direction={["column", "column", "row"]}
    >
      <Box minWidth="120px">
        <Link to="/">
          <Box mb={5}>
            <Image
              alt="Logo"
              src="/header-logo.svg"
              width="120px"
              height="100px"
              fit="contain"
            />
          </Box>
        </Link>
      </Box>
      <Box width="100%">
        {!timeline ? (
          <Flex justifyContent="center" alignItems="center">
            <Text fontSize="xl" marginX="2">
              Loading timeline...
            </Text>
            <Spinner size="lg" marginX="2" />
          </Flex>
        ) : (
          timeline
        )}
      </Box>
    </Flex>
  );
}

export default function RouteComponent() {
  const [snapshots, setSnapshots] = useState<{ hash: string; date: number }[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const { url: _url } = useParams({ from: Route.id });

  const { data: resolverIds } = useQuery({
    queryKey: ["resolverIds", _url],
    queryFn: () => getResolverIds(_url),
  });

  const { data: data, isLoading: timelineLoader } = useQuery({
    queryKey: ["data", _url],
    queryFn: () => retrieveData(_url),
  });

  const headerHeight = useBreakpointValue({ base: "230px", md: "130px" });
  const iframeMinHeight = useBreakpointValue({
    base: "calc(100vh - 230px)",
    md: "calc(100vh - 130px)",
  });

  // Process snapshots data
  const snapshotsData: any[] = snapshots.map(({ date, hash }) => ({
    date: new Date(date * 1000),
    urlValue: hash,
    eventType: hash ? "contentUpload" : null, // remove those without hash (no new content)
  }));

  const mergedData = [...data || [], ...snapshotsData];

  mergedData.sort((a, b) => a.date.getTime() - b.date.getTime());

  const timelineData = mergedData;

  const handleSnapshotChange = (urlValue: string) => {
    setUrl(urlValue);
  };

  useEffect(() => {
    if (_url && resolverIds) {
      (async () => {
        // Get content
        await getContentHashes(resolverIds).then((result) => {
          if (result) {
            setSnapshots(result.decodedWithDate);
            setUrl(result.url);
          }
          setLoading(false);
        });
      })();
    }
  }, [_url, resolverIds]);

  if (!resolverIds && loading) {
    return (
      <>
        <LoadingContentComponent />
      </>
    );
  }
  if (!resolverIds && !loading) {
    return (
      <>
        <DomainUnavailableComponent />
      </>
    );
  }
  if (resolverIds && snapshots.length === 0 && !loading) {
    return (
      <>
        <ContentUnavailableComponent />
      </>
    );
  }
  if (snapshots.length > 0) {
    return (
      <Box bg="primary.100">
        <Box
          minHeight={headerHeight}
          maxHeight={headerHeight}
          overflow="hidden"
          bg="primary.100"
        >
          <Header
            timeline={
              !timelineLoader && (
                <Timeline
                  data={timelineData}
                  onItemSelected={handleSnapshotChange}
                  activeItem={url}
                />
              )
            }
          />
        </Box>
        <Box flex="1" width="100%">
          <iframe
            title="Wayback Machine"
            width="100%"
            height="100vh"
            style={{ border: 0, minHeight: iframeMinHeight }}
            src={url ? url : ""}
          />
        </Box>
      </Box>
    );
  }
  return <LoadingContentComponent />;
}
