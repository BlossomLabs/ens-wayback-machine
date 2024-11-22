import React, { ReactNode } from 'react'
import {
  IconButton,
  Box,
  Flex,
  Image,
  useDisclosure,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react'
import { DrawerRoot, DrawerContent, DrawerCloseTrigger } from '@/components/ui/drawer'
import {
  FiMenu,
} from 'react-icons/fi'
import { Link } from '@tanstack/react-router'

export default function SidebarLayout({ children, sidebarContent }: { children: ReactNode, sidebarContent: ReactNode }) {
  const { open, onOpen, onClose } = useDisclosure()
  const sidebarWidth = 80
  return (
    <Box minH="100vh">
      <DrawerRoot
        open={open}
        size="xs"
        placement="start">
        <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} sidebarWidth={sidebarWidth}>
          {sidebarContent}
        </SidebarContent>
        <DrawerContent>
          <SidebarContent onClose={onClose} sidebarWidth={sidebarWidth}>
            {sidebarContent}
          </SidebarContent>
        </DrawerContent>
      </DrawerRoot>
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: sidebarWidth }} p="4">
        {children}
      </Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
  sidebarWidth: number
}

const SidebarContent = ({ onClose, children, sidebarWidth, ...rest }: SidebarProps) => {
  return (
    <Box
      bg="primary.100"
      w={sidebarWidth}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex justify="center" pb="8" height="120px">
        <Logo />
      </Flex>
      <DrawerCloseTrigger display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      <Flex overflowY="scroll" h="full" justify="center" height="calc(100vh - 120px)">
        <Flex w={40} p="4">
          {children}
        </Flex>
      </Flex>
    </Box>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="30"
      alignItems="center"
      bg="primary.300"
      borderBottomColor="primary.100"
      borderBottomWidth="1px"
      justifyContent="flex-start"
      py="2"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        children={<FiMenu />}
      />
    </Flex>
  )
}

function Logo() {
  return (
    <Link to="/">
      <Image
        alt="Logo"
        src="/header-logo.svg"
        width="120px"
        height="100px"
        fit="contain"
      />
    </Link>
  )
}
