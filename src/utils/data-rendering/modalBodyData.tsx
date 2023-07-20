import { Box, Tooltip, Text, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons'

type ModalBodyDataProps = {
    selectedItem: ModalData | null;
};

type ModalData = {
    eventType: string,
    date: Date,
    transactionID: string,
    owner: { id: string },
    initialDomainOwner: string,
    domainRegistrantId: string,
    initialExpiryDate: Date,
    expiryDate: number,
    ownerLookedUp: string,
    registrarLookedUp: string
}

export const ModalBodyData = ({ selectedItem }: ModalBodyDataProps) => {

    if (selectedItem?.eventType === "transfer" || selectedItem?.eventType === "wrappedTransfer") {
        return (
            <div>
                <Box>
                    <Text as="span" fontWeight="bold">Event happened at: </Text>
                    <Text as="span" fontWeight="normal">{selectedItem.date.toDateString()}</Text>
                </Box>
                <Box>
                    <Text as="span" fontWeight="bold">Transaction ID: </Text>
                    <Tooltip label={selectedItem.transactionID}>
                        <Link href={`https://etherscan.io/tx/${selectedItem.transactionID}`} isExternal>
                            <Text as="span" fontWeight="normal">{selectedItem.transactionID.slice(0, 6) + '...' + selectedItem.transactionID.slice(-4)}</Text>
                            <ExternalLinkIcon mx='4px' />
                        </Link>
                    </Tooltip>
                </Box>
                <Box>
                    <Text as="span" fontWeight="bold">New owner: </Text>
                    <Tooltip label={selectedItem.owner.id}>
                        <Link href={`https://etherscan.io/address/${selectedItem.owner.id}`} isExternal>
                            {selectedItem.ownerLookedUp && (
                                <Text as="span" fontWeight="normal">{selectedItem.ownerLookedUp}</Text>
                            )}
                            {!selectedItem.ownerLookedUp && (
                                <Text as="span" fontWeight="normal">{selectedItem.owner.id.slice(0, 6) + '...' + selectedItem.owner.id.slice(-4)}</Text>
                            )}
                            <ExternalLinkIcon mx='4px' />
                        </Link>
                    </Tooltip>
                </Box>
            </div>
        )
    } else if (selectedItem?.eventType === "domainRegistration") {
        return (
            <div>
                <Box>
                    <Text as="span" fontWeight="bold">Event happened at: </Text>
                    <Text as="span" fontWeight="normal">{selectedItem.date.toDateString()}</Text>
                </Box>
                <Box>
                    <Text as="span" fontWeight="bold">Domain expiration: </Text>
                    <Text as="span" fontWeight="normal">{selectedItem.initialExpiryDate.toDateString()}</Text>
                </Box>
                <Box>
                    <Text as="span" fontWeight="bold">Domain owner: </Text>
                    <Tooltip label={selectedItem.initialDomainOwner}>
                        <Link href={`https://etherscan.io/address/${selectedItem.initialDomainOwner}`} isExternal>
                            {selectedItem.ownerLookedUp && (
                                <Text as="span" fontWeight="normal">{selectedItem.ownerLookedUp}</Text>
                            )}
                             {!selectedItem.ownerLookedUp && (
                            <Text as="span" fontWeight="normal">{selectedItem.initialDomainOwner.slice(0, 6) + '...' + selectedItem.initialDomainOwner.slice(-4)}</Text>
                             )}
                            <ExternalLinkIcon mx='4px' />
                        </Link>
                    </Tooltip>
                </Box>
                <Box>
                    <Text as="span" fontWeight="bold">Domain registrant: </Text>
                    <Tooltip label={selectedItem.domainRegistrantId}>
                        <Link href={`https://etherscan.io/address/${selectedItem.domainRegistrantId}`} isExternal>
                            {selectedItem.registrarLookedUp && (
                            <Text as="span" fontWeight="normal">{selectedItem.registrarLookedUp}</Text>
                            )}
                            {!selectedItem.registrarLookedUp && (
                            <Text as="span" fontWeight="normal">{selectedItem.domainRegistrantId.slice(0, 6) + '...' + selectedItem.domainRegistrantId.slice(-4)}</Text>
                            )}
                            <ExternalLinkIcon mx='4px' />
                        </Link>
                    </Tooltip>
                </Box>
            </div>
        )
    } else if (selectedItem?.eventType === "domainRenewal") {
        return (
            <div>
                <Box>
                    <Text as="span" fontWeight="bold">Event happened at: </Text>
                    <Text as="span" fontWeight="normal">{selectedItem.date.toDateString()}</Text>
                </Box>
                <Box>
                    <Text as="span" fontWeight="bold">New expiry date: </Text>
                    <Text as="span" fontWeight="normal">{new Date(selectedItem.expiryDate * 1000).toDateString()}</Text>
                </Box>
                <Box>
                    <Text as="span" fontWeight="bold">Transaction ID: </Text>
                    <Tooltip label={selectedItem.transactionID}>
                        <Link href={`https://etherscan.io/tx/${selectedItem.transactionID}`} isExternal>
                            <Text as="span" fontWeight="normal">{selectedItem.transactionID.slice(0, 6) + '...' + selectedItem.transactionID.slice(-4)}</Text>
                            <ExternalLinkIcon mx='4px' />
                        </Link>
                    </Tooltip>
                </Box>
            </div>
        )
    } else {
        return null
    }
}