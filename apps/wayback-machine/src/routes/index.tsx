import Banner from "@/components/Banner";
import Favicon from "@/components/Favicon";
import { InputGroup } from "@/components/ui/input-group";
import {
  Box,
  Card,
  Container,
  Flex,
  HStack,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React, { type FormEventHandler, useState, useEffect } from "react";
import { LuSearch } from "react-icons/lu";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

const featured = ["evmcrispr.eth", "uniswap.eth", "vitalik.eth"];

export default function HomeComponent() {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handeSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    navigate({ to: `/${url}` });
  };

  // Redirect form /#/ens-url to /ens-url
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#/")) {
      const path = hash.slice(2); // Remove '#/'
      navigate({ to: `/${path}` });
    }
  }, [navigate]);

  return (
    <>
      <Banner />
      <Flex minHeight="calc(100vh - 62px)" align="center" justify="center">
        <Container maxW="xl">
          <Box
            backgroundColor="rgba(193, 143, 101, 0.9)"
            borderRadius="8px"
            border={"2px solid black"}
            p={4}
          >
            <Box
              bg="primary.500"
              borderRadius="5px"
              p={4}
              mt="-60px"
              border="3px solid black"
            >
              <Heading textAlign="center" fontSize={"37px"}>
                ENS Wayback Machine
              </Heading>
            </Box>
            <Text textAlign="center" mt={4} fontSize={"26px"}>
              The ENS Wayback Machine allows users to go back in time and see
              how ENS linked dApps looked like.
            </Text>
            <form onSubmit={handeSubmit}>
              <InputGroup
                mt={4}
                mx="auto"
                maxW="lg"
                width="100%"
                startElement={<LuSearch size={20} color="black" />}
              >
                <Input
                  value={url}
                  autoFocus
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="Enter an ENS URL"
                  size="lg"
                  fontWeight="extrabold"
                />
              </InputGroup>
            </form>
          </Box>
          <Box>
            <Flex
              mt={4}
              justify="space-around"
              wrap="wrap"
              flexDirection={["column", "column", "row"]}
            >
              {featured.map((item) => (
                <Card.Root
                  key={item}
                  borderWidth="2px"
                  p={2}
                  mb={1}
                  bg="rgba(193, 143, 101, 0.9)"
                >
                  <Text textAlign="center" fontSize={20}>
                    <Link
                      to={`/${item}`}
                    >
                      <HStack spaceX={2}>
                        <Favicon src={`https://${item}.limo/favicon.ico`} />
                        <Text>{item}</Text>
                      </HStack>
                    </Link>
                  </Text>
                </Card.Root>
              ))}
            </Flex>
          </Box>
        </Container>
      </Flex>
    </>
  );
}
