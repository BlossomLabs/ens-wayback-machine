import React, { MouseEventHandler, useState } from 'react';
import { Flex, Circle, Box, Tooltip, Button } from '@chakra-ui/react';
import useIsInView from '@/hooks/useIsInView';
import Image from 'next/image';

type TimelineItem = {
  date: Date;
  urlValue: string;
};

type TimelineItemProps = {
  date: Date;
  urlValue: string;
  eventType: string;
  onClick?: MouseEventHandler;
  isActive?: boolean;
};

const TimelineItem = ({ date, eventType, onClick, isActive }: TimelineItemProps) => {
  const [ref, isInView] = useIsInView();
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (eventType === "newDomain") {
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
          <Circle size="16px" mx="3" bg={isActive ? "black" : "primary.900"} mt={2} />
          <Image
            src={isActive ? "timeline-icons/first-event.svg" : "timeline-icons/first-event.svg"}
            height={32}
            width={32}
            alt="First event"
          />
        </Flex>
      </Tooltip>
    );
  } else {
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
          <Circle size="16px" mx="3" bg={isActive ? "black" : "primary.900"} mt={2} />
          <Image
            src={isActive ? "timeline-icons/content-upload.svg" : "timeline-icons/content-upload.svg"}
            height={32}
            width={32}
            alt="Content upload"
          />
        </Flex>
      </Tooltip>
    );
  }
};

type TimelineProps = {
  data: { date: Date; urlValue: string; eventType: string }[];
  onItemSelected: (urlValue: string) => void;
  activeItem: string;
};

const Timeline = ({ data, onItemSelected, activeItem }: TimelineProps) => {
  const [zoom, setZoom] = useState(1);
  const maxZoom = 3;
  const minZoom = 0.5;

  const handleZoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 0.1, maxZoom));
  const handleZoomOut = () => setZoom((prevZoom) => Math.max(prevZoom - 0.1, minZoom));

  const handleItemClick = (urlValue: string) => {
    if (onItemSelected) {
      onItemSelected(urlValue);
    }
  };

  const calculateFlexBasis = (data: TimelineItem[]) => {
    if (data.length === 0) return [];
    if (data.length === 1) return ['100%'];

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
          overflowX="scroll"
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
                  onClick={() => handleItemClick(item.urlValue)}
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
    </div>
  );
};

export default Timeline;
