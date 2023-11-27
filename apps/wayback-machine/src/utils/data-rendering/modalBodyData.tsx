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
    registrarLookedUp: string,
    from: string,
    fromLookedUp: string
}

type BaseBoxProps = {
    label: string,
    text: string,
    fullText: string,
    link?: string
}

type AddressBoxProps = {
    label: string,
    address: string,
    ens?: string
}

type TransactionBoxProps = {
    label: string,
    transactionID: string
}

type DateBoxProps = {
    label: string,
    date: Date
}

function BaseBox({ label, text, fullText, link }: BaseBoxProps) {
  return (
    <Box marginBottom="2">
      <Text as="span" fontWeight="bold">{label}: </Text>
      {link ? (
        <Tooltip label={fullText}>
          <Link href={link} isExternal>
            {text}
            <ExternalLinkIcon mx='4px' />
          </Link>
        </Tooltip>
      ) : (
        <Text as="span" fontWeight="normal">{text}</Text>
      )}
    </Box>
  )
}

function AddressBox({ label, address, ens }: AddressBoxProps) {
  return (
    <BaseBox label={label} text={ens || address.slice(0, 6) + '...' + address.slice(-4)} fullText={address} link={`https://etherscan.io/address/${address}`} />
  )
}

function TransactionBox({ label, transactionID }: TransactionBoxProps) {
  return (
    <BaseBox label={label} text={transactionID.slice(0, 6) + '...' + transactionID.slice(-4)} fullText={transactionID} link={`https://etherscan.io/tx/${transactionID}`} />
  )
}

function DateBox({ label, date }: DateBoxProps) {
  return (
    <BaseBox label={label} text={date.toLocaleString('en-GB', {month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })} fullText="" />
  )
}

export const ModalBodyData = ({ selectedItem }: ModalBodyDataProps) => {
  if (selectedItem?.eventType === "transfer" || selectedItem?.eventType === "wrappedTransfer") {
    return (
      <div>
        <DateBox label="Date" date={selectedItem.date} />
        <AddressBox label="New owner" address={selectedItem.owner.id} ens={selectedItem.ownerLookedUp} />
      </div>
    )
  } else if (selectedItem?.eventType === "domainRegistration") {
    return (
      <div>
        <DateBox label="Date" date={selectedItem.date} />
        <DateBox label="Domain expiration" date={selectedItem.initialExpiryDate} />
        <AddressBox label="Domain owner" address={selectedItem.initialDomainOwner} ens={selectedItem.ownerLookedUp} />
        <AddressBox label="Domain registrant" address={selectedItem.domainRegistrantId} ens={selectedItem.registrarLookedUp} />
      </div>
    )
  } else if (selectedItem?.eventType === "domainRenewal") {
    return (
      <div>
        <DateBox label="Date" date={selectedItem.date} />
        <DateBox label="New expiry date" date={new Date(selectedItem.expiryDate * 1000)} />
        <TransactionBox label="Transaction" transactionID={selectedItem.transactionID} />
        <AddressBox label="From" address={selectedItem.from} ens={selectedItem.fromLookedUp} />
      </div>
    )
  } else if (selectedItem?.eventType === "domainExpiration") {
    return (
      <div>
        <DateBox label="Date" date={selectedItem.date} />
      </div>
    )
  } else {
    return null
  }
}