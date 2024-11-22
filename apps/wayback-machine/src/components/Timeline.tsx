import { TimelineRoot, TimelineItem, TimelineTitle, TimelineDescription, TimelineConnector, TimelineContent } from "@/components/ui/timeline";
import { useState } from "react";
import { Circle, Flex, Image, For, useDisclosure } from "@chakra-ui/react";
import Dialog from "./Dialog";

type TimelineData = {
  id: string;
  date: Date;
  urlValue: string;
  eventType: string;
  blockNumber: number;
  transactionID: string;
  owner: { id: string };
  initialDomainOwner: string;
  domainRegistrantId: string;
  initialExpiryDate: Date;
  expiryDate: number;
  ownerLookedUp: string;
  registrarLookedUp: string;
  from: string;
  fromLookedUp: string;
};

type TimelineProps = {
  data: TimelineData[];
  onItemSelected: (urlValue: string) => void;
  activeItem: string;
};

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: 'short', // Abbreviated month name
    day: 'numeric', // Day as a number
    year: 'numeric' // Full year
  })
}

function formatEventType(eventType: string) {
  switch (eventType) {
    case 'domainRegistration':
      return 'Domain Registration'
    case 'domainRenewal':
      return 'Domain Renewal'
    case 'transfer':
      return 'Changed Ownership'
    case 'domainExpiration':
      return 'Domain Expired'
    case 'contentUpload':
      return 'Updated Content'
    default:
      return eventType
  }
}

export default function Timeline({ data, onItemSelected, activeItem }: TimelineProps) {
  const now = new Date()
  const revertedData = [...data].reverse().filter(item => item.eventType !== null && item.date <= now)
  const { open, onOpen, onClose } = useDisclosure()
  const [selectedItem, setSelectedItem] = useState<TimelineData | null>(null)

  const handleItemClick = (
    item: TimelineData,
  ) => {
    if (onItemSelected && item.eventType === "contentUpload") {
      onItemSelected(item.urlValue);
    } else {
      setSelectedItem(item);
      onOpen();
    }
  };

  return (
    <>
      <TimelineRoot>
        <For each={revertedData} fallback={<></>}>
          {(item) => (
            <TimelineItem>
              <TimelineConnector outlineWidth={activeItem && activeItem === item.urlValue ? 1 : 0} outlineColor="primary.900" outlineOffset={5}>
                <TimelineIcon icon={item.eventType} onClick={() => handleItemClick(item)} cursor="pointer" />
              </TimelineConnector>
              <TimelineContent width="auto">
                <TimelineTitle whiteSpace="nowrap" onClick={() => handleItemClick(item)} cursor="pointer">
                  {formatDate(item.date)}
                </TimelineTitle>
                <TimelineDescription>
                  {formatEventType(item.eventType)}
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          )}
        </For>
      </TimelineRoot>
      <Dialog open={open} onClose={onClose} selectedItem={selectedItem} />
    </>
  )
}

function TimelineIcon({ icon, ...props }: { icon: string, [key: string]: any }) {
  return (
    <Flex
      direction="column"
      alignItems="center"
      mt={1}
      {...props}
    >
      <Circle size="32px" mx="3">
        <Image
          src={`timeline-icons/${icon}.svg`}
          width="32px"
          height="32px"
          alt={icon}
        />
      </Circle>
    </Flex>
  )
}
