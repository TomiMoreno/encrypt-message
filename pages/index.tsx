import Head from 'next/head'
import NextLink from 'next/link'
import { Box, Heading, LinkBox, LinkOverlay, Text, SimpleGrid} from '@chakra-ui/react'

export default function Home() {
  
  return (
    <>
      <Heading as="h1" mb={4} textAlign="center">
        Encrypt Message
      </Heading>
      <Heading as="h2" size="lg" mb={4}>
        Methods
      </Heading>
      <SimpleGrid columns={[1, 1, 2]} spacing={8}>
        <NextLink href="/caesar">
          <LinkBox as="article" p="5" borderWidth="1px" rounded="md">
            <Box as="time" dateTime="2021-01-15 15:30:00 +0000 UTC">
              Substitution
            </Box>
            <Heading size="md" my="2">
              <LinkOverlay href="#">Caesar cipher</LinkOverlay>
            </Heading>
            <Text>
              The Caesar cipher (or Caesar code) is a monoalphabetic
              substitution cipher, where each letter is replaced by another
              letter located a little further in the alphabet.
            </Text>
          </LinkBox>
        </NextLink>
        <NextLink href="/columnarTransposition">
          <LinkBox as="article" p="5" borderWidth="1px" rounded="md">
            <Box as="time" dateTime="2021-01-15 15:30:00 +0000 UTC">
              Transposition
            </Box>
            <Heading size="md" my="2">
              <LinkOverlay href="#">
                Columnar transposition cipher
              </LinkOverlay>
            </Heading>
            <Text>
              The Columnar transposition cipher is a transposition cipher where 
              the message is written out in rows of a fixed length, and then read
              out again column by column, and the columns are chosen in some
              scrambled order. Both the width of the rows and the permutation
              of the columns are usually defined by a keyword.
            </Text>
          </LinkBox>
        </NextLink>
      </SimpleGrid>
    </>
  );            
}