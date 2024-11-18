import React, { useState, useEffect } from 'react';
import { Box, Flex, Link, Text, IconButton, Collapsible } from "@chakra-ui/react";
import { LuX } from 'react-icons/lu';

export default function Banner() {
  const [bannerContent, setBannerContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchBannerContent = async () => {
      if (!process.env.NEXT_PUBLIC_BANNER_URL) {
        return;
      }

      try {
        const response = await fetch(process.env.NEXT_PUBLIC_BANNER_URL);
        const data = await response.text();
        setBannerContent(data);
      } catch (error) {
        console.error('Error fetching banner content:', error);
      }
    };

    fetchBannerContent();
  }, []);

  if (!bannerContent) {
    return null;
  }

  const [text, link, href] = bannerContent.split('|');

  return (
    <Collapsible.Root defaultOpen>
      <Collapsible.Content>
        <Flex direction="row" align="center" justify="center" w="100%" bg='primary.500'>
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
            <Link href={href} target="_blank">
              <Text as="span" fontWeight="extrabold" color='white' fontSize="20px" textDecoration="underline">
                {link}
              </Text>
            </Link>
            <Collapsible.Trigger paddingY="3">
              <IconButton
                aria-label="Close banner"
                children={<LuX />}
                position="absolute"
                top="50%" // Center vertically in the parent
                transform="translateY(-50%)" // Adjust to precisely center by its own height
                right={5}
                variant="outline"
                _hover={{ bg: 'transparent' }}
                color='white'
                border='none'
              />
            </Collapsible.Trigger>
          </Box>
        </Flex>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
