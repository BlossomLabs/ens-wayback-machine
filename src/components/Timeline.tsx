import React, { MouseEventHandler, useState } from 'react';
import { Flex, Circle, Box, Tooltip, Button, useDisclosure, Text, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons'
import useIsInView from '@/hooks/useIsInView';
import Image from 'next/image';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

type Owner = {
  id: string;
};


type TimelineItem = {
  id: string;
  date: Date; 
  urlValue: string; 
  eventType: string;
  blockNumber: number;
  owner: Owner;
  transactionID: string;
};

type TimelineItemProps = {
  date: Date;
  urlValue: string;
  eventType: string;
  onClick?: MouseEventHandler;
  isActive?: boolean;
};

type TimelineProps = {
  data: TimelineItem[];
  onItemSelected: (urlValue: string) => void;
  activeItem: string;
};


const TimelineItem = ({ date, eventType, onClick, isActive }: TimelineItemProps) => {
  const [ref, isInView] = useIsInView();
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (eventType === "domainRegistration") {
    return (
      <Tooltip
        label={formattedDate}
        hasArrow
        placement={isActive ? "top" : "bottom"}
        isOpen={!isInView ? false : isActive ? true : undefined}
      >
        <Flex
          ref={ref}
          direction="column"
          alignItems="center"
          onClick={onClick}
          cursor="pointer"
          mt={1}
        >
         <Circle size="32px" mx="3">
            <Image
              src={isActive ? "timeline-icons/first-event.svg" : "timeline-icons/first-event.svg"}
              height={32}
              width={32}
              alt="First event"
            />
          </Circle>
        </Flex>
      </Tooltip>
    );
  } else if (eventType === "domainExpiration") {
     return(
      <Tooltip
        label={formattedDate}
        hasArrow
        placement={isActive ? "top" : "bottom"}
        isOpen={!isInView ? false : isActive ? true : undefined}
      >
        <Flex
          ref={ref}
          direction="column"
          alignItems="center"
          onClick={onClick}
          cursor="pointer"
          mt={1}
        >
         <Circle size="32px" mx="3">
            <Image
              src={isActive ? "timeline-icons/domain-renewal.svg" : "timeline-icons/domain-renewal.svg"}
              height={32}
              width={32}
              alt="First event"
            />
          </Circle>
        </Flex>
      </Tooltip>
     );
  } else if(eventType === "wrappedTransfer") {
     return(
      <Tooltip
        label={formattedDate}
        hasArrow
        placement={isActive ? "top" : "bottom"}
        isOpen={!isInView ? false : isActive ? true : undefined}
      >
        <Flex
          ref={ref}
          direction="column"
          alignItems="center"
          onClick={onClick}
          cursor="pointer"
          mt={1}
        >
         <Circle size="32px" mx="3">
            <Image
              src={isActive ? "timeline-icons/new-owner.svg" : "timeline-icons/new-owner.svg"}
              height={32}
              width={32}
              alt="First event"
            />
          </Circle>
        </Flex>
      </Tooltip>
     );
  } else if (eventType === "contentUpload") {
    return (
      <Tooltip
        label={formattedDate}
        hasArrow
        placement={isActive ? "top" : "bottom"}
        isOpen={!isInView ? false : isActive ? true : undefined}
      >
        <Flex
          ref={ref}
          direction="column"
          alignItems="center"
          onClick={onClick}
          cursor="pointer"
          mt={1}
        >
          <Circle size="32px" mx="3">
            <Image
              src={isActive ? "timeline-icons/content-upload.svg" : "timeline-icons/content-upload.svg"}
              height={32}
              width={32}
              alt="Content upload"
            />
          </Circle>
        </Flex>
      </Tooltip>
    );
  } else {
    return null
  }
};

const Timeline = ({ data, onItemSelected, activeItem }: TimelineProps) => {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const [zoom, setZoom] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const maxZoom = 3;
  const minZoom = 0.5;

  const handleZoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 0.1, maxZoom));
  const handleZoomOut = () => setZoom((prevZoom) => Math.max(prevZoom - 0.1, minZoom));

  const handleItemClick = (urlValue: string, eventType: string, item: TimelineItem) => {
    

    if (onItemSelected && eventType === "contentUpload") {
      onItemSelected(urlValue);
    } else {
      setSelectedItem(item)
      onOpen();
    }
  };

  const calculateFlexBasis = (data: TimelineItem[]) => {
    if (data.length === 0) return [];
    if (data.length === 1) return ['100%'];

    console.log(data)

    const totalTime = data[data.length - 1].date.getTime() - data[0].date.getTime();

    return data.map((item: TimelineItem, index: number) => {
      if (index === 0) return '0%';
      const prevItem = data[index - 1];
      const interval = item.date.getTime() - prevItem.date.getTime();
      return `${(interval / totalTime) * 100 * zoom}%`;
    });
  };

  const flexBasisValues = calculateFlexBasis(data);

  return (
    <div>
      <div>
        <Box
          position="relative"
          mx={8}
          mt={8}
          style={{ overflowX: "scroll", scrollbarWidth: "none", msOverflowStyle: "none" }}
          className="hide-scrollbar"
          backgroundImage="linear-gradient(to right, primary.900 0%, primary.900 100%)"
          backgroundSize="100% 3px"
          backgroundRepeat="no-repeat"
          backgroundPosition="0 14px"
          height="60px"
        >
          <Flex position="absolute" justifyContent="space-between" width={`${100 * zoom}%`} transformOrigin="left">
            {data.map((item, index) => (
              <Flex flexBasis={flexBasisValues[index]} key={index}>
                <TimelineItem
                  date={item.date}
                  urlValue={item.urlValue}
                  eventType={item.eventType}
                  isActive={item.urlValue === activeItem}
                  onClick={() => handleItemClick(item.urlValue, item.eventType, item)}
                />
              </Flex>
            ))}
          </Flex>
        </Box>
      </div>
      <Button onClick={handleZoomIn} disabled={zoom >= maxZoom}>
        Zoom In
      </Button>
      <Button onClick={handleZoomOut} disabled={zoom <= minZoom}>
        Zoom Out
      </Button>
      <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {selectedItem?.eventType === "transfer" && (<ModalHeader>{`Transfer date: ${selectedItem?.date.toLocaleDateString()}`}</ModalHeader>)}
          {selectedItem?.eventType === "wrappedTransfer" && (<ModalHeader>{`Wrapped transfer date: ${selectedItem?.date.toLocaleDateString()}`}</ModalHeader>)}
          {selectedItem?.eventType === "domainRegistration" && (<ModalHeader>{`Domain registered at: ${selectedItem?.date.toLocaleDateString()}`}</ModalHeader>)}
          <ModalCloseButton />
          <ModalBody>
            {/* You can access the selected item's data here */}
            {selectedItem?.eventType === "transfer" || selectedItem?.eventType === "wrappedTransfer" && (
              <div>
                <Box>
                  <Text as="span" fontWeight="bold">Event happened at: </Text>
                  <Text as="span" fontWeight="normal">{selectedItem.date.toDateString()}</Text>
                </Box>
                <Box>
                  <Text as="span" fontWeight="bold">Transaction ID: </Text>
                  <Tooltip label={selectedItem.transactionID}>
                    <Link href={`https://etherscan.io/tx/${selectedItem.transactionID}`} isExternal>
                      <Text as="span" fontWeight="normal">{selectedItem.transactionID.slice(0, 6) + '...' + selectedItem.transactionID.slice(-4)}</Text>
                      <ExternalLinkIcon mx='4px' />
                    </Link>
                  </Tooltip>
                </Box>
                <Box>
                  <Text as="span" fontWeight="bold">New owner: </Text>
                  <Tooltip label={selectedItem.owner.id}>
                    <Link href={`https://etherscan.io/address/${selectedItem.owner.id}`} isExternal>
                      <Text as="span" fontWeight="normal">{selectedItem.owner.id.slice(0, 6) + '...' + selectedItem.owner.id.slice(-4)}</Text>
                      <ExternalLinkIcon mx='4px' />
                    </Link>
                  </Tooltip>
                </Box>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </div>
    </div>
  );

};

export default Timeline;
