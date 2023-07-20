
import React, { MouseEventHandler } from 'react';
import { Flex, Circle, Tooltip } from '@chakra-ui/react';
import useIsInView from '@/hooks/useIsInView';
import Image from 'next/image';

type TimelineItemProps = {
    date: Date;
    urlValue: string;
    eventType: string;
    onClick?: MouseEventHandler;
    isActive?: boolean;
  };

export const TimelineItem = ({ date, eventType, onClick, isActive }: TimelineItemProps) => {
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
    } else if (eventType === "domainRenewal") {
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
                src={isActive ? "timeline-icons/domain-renewal.svg" : "timeline-icons/domain-renewal.svg"}
                height={32}
                width={32}
                alt="First event"
              />
            </Circle>
          </Flex>
        </Tooltip>
      );
    } else if (eventType === "wrappedTransfer") {
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