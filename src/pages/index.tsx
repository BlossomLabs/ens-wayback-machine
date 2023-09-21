import { FormEventHandler, useState } from "react";
import { Box, Flex, Card, Link, Text, Input, InputGroup, InputLeftElement, Heading, Container, HStack } from "@chakra-ui/react"
import { SearchIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';
import Favicon from "@/components/Favicon";

const featured = [
  'evmcrispr.eth',
  'uniswap.eth',
  'vitalik.eth',
]

export default function Home() {
  const [url, setUrl] = useState('')
  const navigate = useNavigate()

  const handeSubmit: FormEventHandler = (event) => {
    event.preventDefault()
    navigate(`/${url}`)
  }

  return (
    <>
      <Flex
        minHeight="100vh"
        align="center"
        justify="center"
      >
        <Container>
          <Box
            backgroundColor="rgba(193, 143, 101, 0.9)"
            borderRadius="8px"
            border={"2px solid black"}
            p={4}
          >
            <Box bg="primary.500" borderRadius="5px" p={4} mt="-60px" border="3px solid black">
              <Heading textAlign="center" fontSize={"37px"}>
                ENS Wayback Machine
              </Heading>
            </Box>
            <Text textAlign="center" mt={4} fontSize={"26px"}>
              The ENS Wayback Machine allows users to go back in time and see how ENS linked dApps looked like.
            </Text>
            <form onSubmit={handeSubmit}>
              <InputGroup mt={4} mx="auto" maxW="lg">
                <InputLeftElement pointerEvents='none'>
                  <SearchIcon color='black' />
                </InputLeftElement>
                <Input
                  value={url}
                  autoFocus
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder='Enter an ENS URL'
                  size="lg"
                  // Workaround because Chakra UI input theming doesn't support _focusVisible
                  _focusVisible={{
                    outline: 'none',
                  }}
                  // Workaround because Chakra UI input theming doesn't support _hover
                  _hover={{
                    borderColor: 'black !important',
                  }}
                  fontWeight="extrabold"
                />
              </InputGroup>
            </form>
          </Box>
          <Box>
            <Flex mt={4} justify="space-around" wrap="wrap" flexDirection={['column', 'column', 'row']}>
              {featured.map((item) => (
                <Card variant={'semiTransparent'} key={item} borderWidth="2px" p={2} mb={1}>
                  <Text textAlign="center" fontSize={20}>
                    <Link href={`/#/${item}`}>
                      <HStack spacing={2}>
                        <Favicon width="16" height="16" alt="" src={`https://${item}.limo/favicon.ico`} />
                        <Text>{item}</Text>
                      </HStack>
                    </Link>
                  </Text>
                </Card>
              ))}
            </Flex>
          </Box>
        </Container>
      </Flex>
    </>
  );
}
