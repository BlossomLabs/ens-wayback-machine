import {
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import Timeline from "@/components/Timeline";

import { getContentHashes } from "@/utils/data-retrieving/contentHashes";
import { getResolverIds } from "@/utils/data-retrieving/resolverIds";
import { retrieveData } from "@/utils/data-retrieving/retrieveData";

import ContentUnavailableComponent from "@/components/ContentUnavailable";
import DomainUnavailableComponent from "@/components/DomainUnavailable";
import LoadingContentComponent from "@/components/LoadingContent";
import { useQuery } from "@tanstack/react-query";
import SidebarLayout from "@/components/Sidebar";

export const Route = createFileRoute("/$url")({
  component: RouteComponent,
});

export default function RouteComponent() {

  const [url, setUrl] = useState("");
  const { url: _url } = useParams({ from: Route.id });

  const { data: resolverIds } = useQuery({
    queryKey: ["resolverIds", _url],
    queryFn: () => getResolverIds(_url),
  });

  const { data: data, isLoading: timelineIsLoading } = useQuery({
    queryKey: ["data", _url],
    queryFn: () => retrieveData(_url),
  });

  const { data: snapshots, isLoading: isLoadingSnapshots } = useQuery({
    queryKey: ["snapshots", _url],
    queryFn: () =>
      getContentHashes(resolverIds).then((result) =>
        result.map(({ date, hash }: { date: number; hash: string }) => ({
          date: new Date(date * 1000),
          urlValue: hash,
          eventType: hash ? "contentUpload" : null, // remove those without hash (no new content)
        })),
      ),
  });

  useEffect(() => {
    if (snapshots) {
      setUrl(snapshots[snapshots.length - 1].urlValue);
    }
  }, [snapshots]);

  const iframeMinHeight = useBreakpointValue({
    base: "calc(100vh - 85px)",
    md: "calc(100vh - 30px)",
  });

  const mergedData = [...data || [], ...snapshots || []];

  mergedData.sort((a, b) => a.date.getTime() - b.date.getTime());

  const timelineData = mergedData;

  const handleSnapshotChange = (urlValue: string) => {
    setUrl(urlValue);
  };

  if (!resolverIds && isLoadingSnapshots) {
    return (
      <>
        <LoadingContentComponent />
      </>
    );
  }
  if (!resolverIds && !isLoadingSnapshots) {
    return (
      <>
        <DomainUnavailableComponent />
      </>
    );
  }
  if (resolverIds && snapshots?.length === 0 && !isLoadingSnapshots) {
    return (
      <>
        <ContentUnavailableComponent />
      </>
    );
  }
  if (snapshots?.length > 0) {
    return (
      <SidebarLayout sidebarContent={
        timelineIsLoading ? <div style={{ textAlign: "center", width: "100%" }}>Loading...</div> :
        <Timeline
          data={timelineData}
          onItemSelected={handleSnapshotChange}
          activeItem={url}
        />
      }>
        <Box flex="1" width="100%" bg="white">
          <iframe
            title="Wayback Machine"
            width="100%"
            height="100vh"
            style={{ border: 0, minHeight: iframeMinHeight }}
            src={url ? url : ""}
          />
        </Box>
      </SidebarLayout>
    );
  }
  return <LoadingContentComponent />;
}
