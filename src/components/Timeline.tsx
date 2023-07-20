import React, { useState } from 'react';
import { Flex, Box, Button, useDisclosure, } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import { TimelineItem } from '@/utils/data-rendering/timelineItem';
import { ModalBodyData } from '@/utils/data-rendering/modalBodyData';

type TimelineData = {
  id: string;
  date: Date;
  urlValue: string;
  eventType: string;
  blockNumber: number;
  owner: {id: string};
  transactionID: string;
  initialDomainOwner: string;
  domainRegistrantId: string;
};

type TimelineProps = {
  data: TimelineData[];
  onItemSelected: (urlValue: string) => void;
  activeItem: string;
};

const Timeline = ({ data, onItemSelected, activeItem }: TimelineProps) => {
  const [selectedItem, setSelectedItem] = useState<TimelineData | null>(null);
  const [zoom, setZoom] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const maxZoom = 3;
  const minZoom = 0.5;

  const handleZoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 0.1, maxZoom));
  const handleZoomOut = () => setZoom((prevZoom) => Math.max(prevZoom - 0.1, minZoom));

  const handleItemClick = (urlValue: string, eventType: string, item: TimelineData) => {


    if (onItemSelected && eventType === "contentUpload") {
      onItemSelected(urlValue);
    } else {
      setSelectedItem(item)
      onOpen();
    }
  };

  const calculateFlexBasis = (data: TimelineData[]) => {
    if (data.length === 0) return [];
    if (data.length === 1) return ['100%'];

    console.log(data)

    const totalTime = data[data.length - 1].date.getTime() - data[0].date.getTime();

    return data.map((item: TimelineData, index: number) => {
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
            <ModalBodyData selectedItem={selectedItem}/>
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
