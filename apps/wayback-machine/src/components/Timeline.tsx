import React, { useState } from 'react';
import { Flex, Box, useDisclosure, IconButton, VStack, } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import { TimelineItem } from '@/utils/data-rendering/timelineItem';
import { ModalBodyData } from '@/utils/data-rendering/modalBodyData';
import { PlusIcon } from '@heroicons/react/24/outline';
import { MinusIcon } from '@chakra-ui/icons';

type TimelineData = {
  id: string,
  date: Date,
  urlValue: string,
  eventType: string,
  blockNumber: number,
  transactionID: string,
  owner: { id: string },
  initialDomainOwner: string,
  domainRegistrantId: string,
  initialExpiryDate: Date,
  expiryDate: number,
  ownerLookedUp: string,
  registrarLookedUp: string,
  from: string,
  fromLookedUp: string
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

    const totalTime = data[data.length - 1]!.date.getTime() - data[0]!.date.getTime();

    return data.map((item: TimelineData, index: number) => {
      if (index === 0) return '0%';
      const prevItem = data[index - 1];
      const interval = item.date.getTime() - prevItem!.date.getTime();
      return `${(interval / totalTime) * 100 * zoom}%`;
    });
  };

  // Add a dummy item to the end of the timeline to see how much time passes between the last item and now
  data = [...data, {
    id: "",
    date: new Date(),
    urlValue: "",
    eventType: "",
    blockNumber: 0,
    transactionID: "",
    owner: { id: "" },
    initialDomainOwner: "",
    domainRegistrantId: "",
    initialExpiryDate: new Date(),
    expiryDate: new Date().getTime(),
    ownerLookedUp: "",
    registrarLookedUp: "",
    from: "",
    fromLookedUp: ""
  }]

  const flexBasisValues = calculateFlexBasis(data);

  return (
    <div>
      <Flex>
        <Box
          flex='1'
          position="relative"
          mx={8}
          mt={8}
          style={{ overflowX: "scroll" }}
          className="hide-scrollbar"
          backgroundImage="linear-gradient(to right, primary.900 0%, primary.900 100%)"
          backgroundSize="100% 3px"
          backgroundRepeat="no-repeat"
          backgroundPosition="0 14px"
          height="60px"
        >
          <Flex position="absolute" justifyContent="space-between" width={`${100 * zoom}%`} transformOrigin="left">
            {data.map((item, index) => (
              item.date <= new Date() && (
                <Flex flexBasis={flexBasisValues[index]} key={item.date.toString()}>
                  <TimelineItem
                    date={item.date}
                    urlValue={item.urlValue}
                    eventType={item.eventType}
                    isActive={item.urlValue === activeItem}
                    onClick={() => handleItemClick(item.urlValue, item.eventType, item)}
                  />
                </Flex>
              )
            ))}
          </Flex>
        </Box>
        <VStack w="30px" mt={4}>
          <IconButton
            colorScheme='primary'
            size={'xs'}
            aria-label='Zoom in'
            icon={<PlusIcon />}
            onClick={handleZoomIn} disabled={zoom >= maxZoom}
          />
          <IconButton
            colorScheme='primary'
            size={'xs'}
            aria-label='Zoom out'
            icon={<MinusIcon />}
            onClick={handleZoomOut} disabled={zoom <= minZoom}
          />
        </VStack>
      </Flex>
      <div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            {selectedItem?.eventType === "transfer" && (<ModalHeader>{`Transfer`}</ModalHeader>)}
            {selectedItem?.eventType === "wrappedTransfer" && (<ModalHeader>{`Wrapped transfer`}</ModalHeader>)}
            {selectedItem?.eventType === "domainRegistration" && (<ModalHeader>{`Domain registered`}</ModalHeader>)}
            {selectedItem?.eventType === "domainRenewal" && (<ModalHeader>{`Domain renewed`}</ModalHeader>)}
            {selectedItem?.eventType === "domainExpiration" && (<ModalHeader>{`Domain expired`}</ModalHeader>)}
            <ModalCloseButton />
            <ModalBody>
              <ModalBodyData selectedItem={selectedItem}/>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );

};

export default Timeline;
