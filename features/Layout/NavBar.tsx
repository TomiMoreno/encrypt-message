import { ReactNode } from "react";
import NextLink from "next/link";
import {
  Box,
  Flex,
  Link,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
	HStack,
	IconButton,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

const NavLink = ({ children, ...rest }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.300", "gray.700"),
    }}
		{...rest}
  >
    {children}
  </Link>
);
const Links = [
	{
		name: 'Encrypt message',
		href: '/',
	},
	{
		name: 'Columnar Transposition',
		href: '/columnarTransposition',
	},
	{
		name: 'Caesar Cipher',
		href: '/caesar',
	}
]
export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map(({ name, href }) => (
              <NextLink key={name} href={href} passHref>
                <NavLink>{name}</NavLink>
              </NextLink>
            ))}
          </HStack>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map(({name, href}) => (
              <NextLink key={name} href={href} passHref>
                <NavLink>{name}</NavLink>
              </NextLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
