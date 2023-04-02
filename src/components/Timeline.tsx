// components/Timeline.js
import React, { MouseEventHandler } from 'react';
import { Flex, Circle, Box, Tooltip } from '@chakra-ui/react';
import useIsInView from '@/hooks/useIsInView';

type TimelineItem = {
  date: Date;
  value: string;
};

type TimelineItemProps = {
  date: Date;
  value: string;
  onClick?: MouseEventHandler;
  isActive?: boolean;
};

const TimelineItem = ({ date, onClick, isActive }: TimelineItemProps) => {
  const [ref, isInView] = useIsInView();
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Tooltip label={formattedDate} hasArrow placement={isActive ? "top": "bottom"} isOpen={!isInView ? false : isActive ? true : undefined}>
      <Flex ref={ref} direction="column" alignItems="center" onClick={onClick} cursor="pointer">
        <Circle size="16px" mx="3" bg={isActive? "black" : "primary.900"} mt={2} />
      </Flex>
    </Tooltip>
  );
};

type TimelineProps = {
  data: { date: Date; value: string }[];
  onItemSelected: (value: string) => void;
  activeItem: string;
};

const Timeline = ({ data, onItemSelected, activeItem }: TimelineProps) => {
  const handleItemClick = (value: string) => {
    if (onItemSelected) {
      onItemSelected(value);
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
      return `${(interval / totalTime) * 100}%`;
    });
  };

  const flexBasisValues = calculateFlexBasis(data);

  return (
    <Box
      position="relative"
      mx={8}
      mt={8}
      overflowX={'scroll'}
      backgroundImage="linear-gradient(to right, primary.900 0%, primary.900 100%)"
      backgroundSize="100% 3px"
      backgroundRepeat="no-repeat"
      backgroundPosition="0 14px"
      height="60px"
    >
      <Flex position="absolute" justifyContent="space-between" width="100%">
        {data.map((item, index) => (
          <Flex flexBasis={flexBasisValues[index]} key={index}>
            <TimelineItem
              date={item.date}
              value={item.value}
              isActive={item.value === activeItem}
              onClick={() => handleItemClick(item.value)}
            />
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default Timeline;
