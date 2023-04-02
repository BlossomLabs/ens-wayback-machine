import { FormEventHandler, useState } from "react";
import { Box, Flex, Card, Link, Text, Input, InputGroup, InputLeftElement, Heading, Container } from "@chakra-ui/react"
import { SearchIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';

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
            backgroundColor="rgba(242, 193, 133, 0.5)"
            borderRadius="20px"
            border={"2px solid black"}
            p={4}
          >
            <Heading textAlign="center" fontSize={"50px"}>
              ENS Wayback Machine
            </Heading>
            <Text textAlign="center" mt={4} fontSize={"20px"}>
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
                  // Workaround because Chakra UI input theming doesn't support _focusVisible
                  _focusVisible={{
                    outline: 'none',
                  }}
                  // Workaround because Chakra UI input theming doesn't support _hover
                  _hover={{
                    borderColor: 'black !important',
                  }}
                />
              </InputGroup>
            </form>
          </Box>
          <Box>
            <Flex mt={4} justify="space-around" wrap="wrap">
              {featured.map((item) => (
                <Card variant={'semiTransparent'} key={item} borderWidth="1px" m={2}>
                  <Text textAlign="center" fontSize={20}>
                    <Link href={`/#/${item}`}>
                      {item}
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
