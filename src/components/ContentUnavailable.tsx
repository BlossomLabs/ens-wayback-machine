import { Box, Flex, Text, Heading, Container } from "@chakra-ui/react"
import { Link } from "react-router-dom";



export default function ContentUnavailableComponent () {
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
              This domain has no content hashes available, go back and try again.
            </Text>
            <Link to={'/'}>
            <Text textAlign="center" fontWeight="bold" mt={8} fontSize={"32px"}>
              Click here to go back
            </Text>
            </Link>
            </Box>
        </Container>
      </Flex>
      </>
    )
}