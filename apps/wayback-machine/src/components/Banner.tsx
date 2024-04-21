import React, { useState } from 'react';
import { Box, Flex, Link, Text, IconButton, SlideFade } from "@chakra-ui/react";
import { CloseIcon } from '@chakra-ui/icons';

export default function Banner() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false); 
  }

  if (!process.env.NEXT_PUBLIC_BANNER) {
    return null;
  }

  const [text, link, href] = process.env.NEXT_PUBLIC_BANNER.split('|');

  return (
    <SlideFade offsetY="-20px" in={isOpen}>
      <Flex direction="row" align="center" justify="center" w="100%">
        <Box
          p={4}
          color='white'
          bgGradient='linear(to-r,  primary.100 0%, primary.700 15%, primary.700 85%, primary.100 100%)'
          textAlign="center"
          position="relative" 
          flexGrow={1}
        >
          <Text as="span" fontSize="20px" fontWeight="bold" mr={2}>
            {text}
          </Text>
          <Link
            href={href}
            isExternal
            _hover={{ textDecoration: 'none' }}
          >
            <Text as="span" fontWeight="extrabold" color='white' fontSize="20px" textDecoration="underline">
              {link}
            </Text>
          </Link>
         <IconButton
            aria-label="Close banner"
            icon={<CloseIcon />}
            onClick={handleClose}
            position="absolute"
            top="50%" // Center vertically in the parent
            transform="translateY(-50%)" // Adjust to precisely center by its own height
            right={5}
            size="xs"
            fontSize="12px"
            variant="outline"
            colorScheme="white"
            />
        </Box>
      </Flex>
    </SlideFade>
  );
}
