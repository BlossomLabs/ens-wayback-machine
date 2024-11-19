import { Tooltip } from "@/components/ui/tooltip";
import useIsInView from "@/hooks/useIsInView";
import { Circle, Flex, Image } from "@chakra-ui/react";
import React, { type MouseEventHandler } from "react";

type TimelineItemProps = {
  date: Date;
  urlValue: string;
  eventType: string;
  onClick?: MouseEventHandler;
  isActive?: boolean;
};

export const TimelineItem = ({
  date,
  eventType,
  onClick,
  isActive,
}: TimelineItemProps) => {
  const [ref, isInView] = useIsInView();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (eventType === "domainRegistration") {
    return (
      <Tooltip
        portalled
        content={formattedDate}
        showArrow
        positioning={{ placement: isActive ? "top" : "bottom" }}
        open={!isInView ? false : isActive ? true : undefined}
        openDelay={0}
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
              src={
                isActive
                  ? "timeline-icons/first-event.svg"
                  : "timeline-icons/first-event.svg"
              }
              width="32px"
              height="32px"
              alt="First event"
            />
          </Circle>
        </Flex>
      </Tooltip>
    );
  }
  if (eventType === "domainRenewal") {
    return (
      <Tooltip
        portalled
        content={formattedDate}
        showArrow
        positioning={{ placement: isActive ? "top" : "bottom" }}
        open={!isInView ? false : isActive ? true : undefined}
        openDelay={0}
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
              src={
                isActive
                  ? "timeline-icons/domain-renewal.svg"
                  : "timeline-icons/domain-renewal.svg"
              }
              width="32px"
              height="32px"
              alt="First event"
            />
          </Circle>
        </Flex>
      </Tooltip>
    );
  }
  if (eventType === "wrappedTransfer") {
    return (
      <Tooltip
        portalled
        content={formattedDate}
        showArrow
        positioning={{ placement: isActive ? "top" : "bottom" }}
        open={!isInView ? false : isActive ? true : undefined}
        openDelay={0}
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
              src={
                isActive
                  ? "timeline-icons/new-owner.svg"
                  : "timeline-icons/new-owner.svg"
              }
              width="32px"
              height="32px"
              alt="First event"
            />
          </Circle>
        </Flex>
      </Tooltip>
    );
  }
  if (eventType === "contentUpload") {
    return (
      <Tooltip
        portalled
        content={formattedDate}
        showArrow
        positioning={{ placement: isActive ? "top" : "bottom" }}
        open={!isInView ? false : isActive ? true : undefined}
        openDelay={0}
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
              src={
                isActive
                  ? "timeline-icons/content-upload.svg"
                  : "timeline-icons/content-upload.svg"
              }
              width="32px"
              height="32px"
              alt="Content upload"
            />
          </Circle>
        </Flex>
      </Tooltip>
    );
  }
  const today = new Date();
  if (eventType === "domainExpiration" && today > date) {
    return (
      <Tooltip
        portalled
        content={formattedDate}
        showArrow
        positioning={{ placement: isActive ? "top" : "bottom" }}
        open={!isInView ? false : isActive ? true : undefined}
        openDelay={0}
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
              src={
                isActive
                  ? "timeline-icons/domain-expired.svg"
                  : "timeline-icons/domain-expired.svg"
              }
              width="32px"
              height="32px"
              alt="Content upload"
            />
          </Circle>
        </Flex>
      </Tooltip>
    );
  }
  return null;
};
