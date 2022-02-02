import { Box } from "@chakra-ui/react";
import Head from "next/head";
import NavBar from "./NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <Head>
        <title>Encrypt Message</title>
        <meta
          name="description"
          content="Encrypt and decrypt your messages usign different methods"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Box maxW="960px" mx="auto" p={8}>
        {children}
      </Box>
    </>
  );
}