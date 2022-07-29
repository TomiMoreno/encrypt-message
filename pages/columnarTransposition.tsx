import { ChangeEvent, MouseEventHandler, useState } from "react";
import {
  Textarea,
  Box,
  Text,
  Input,
  Heading,
  Button,
  Flex,
  FormLabel,
  IconButton,
} from "@chakra-ui/react";
import encrypt from "../features/ColumnarTransposition/encrypt";
import decrypt from "../features/ColumnarTransposition/decrypt";
import { ArrowUpDownIcon } from "@chakra-ui/icons";

export default function ColumnarTranspositionCipher() {
  const [isEncrypting, setIsEncrypting] = useState(true);
  const [values, setValues] = useState({
    message: "",
    encryptionKey: "",
    decryptionKey: "",
    encryptedMessage: "",
  });
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleEncrypt: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const encrypted = encrypt(values.message, values.encryptionKey);
    setEncryptedMessage(encrypted);
  };

  const handleDecrypt: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const decrypted = decrypt(values.encryptedMessage, values.decryptionKey);
    setDecryptedMessage(decrypted);
  };

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" mb={8}>
        <Heading as="h1">Columnar Transposition Cipher</Heading>
        <Flex gap={2}>
          <FormLabel htmlFor="change-encryption">
            {isEncrypting ? "Encrypt" : "Decrypt"} a message
          </FormLabel>
          <IconButton
            aria-label={isEncrypting ? "Encrypt" : "Decrypt"}
            icon={<ArrowUpDownIcon aria-label="Change" />}
            colorScheme="purple"
            size="sm"
            onClick={() => setIsEncrypting((curr) => !curr)}
            id="change-encryption"
          />
        </Flex>
      </Flex>
      {isEncrypting ? (
        <>
          <Heading as="h2" size="lg" mb={4}>
            Encrypt
          </Heading>
          <Text>Message</Text>
          <Textarea
            value={values.message}
            onChange={handleInputChange}
            name="message"
            placeholder="Enter your message"
            mb={4}
          />
          <Text>Key</Text>
          <Input
            value={values.encryptionKey}
            onChange={handleInputChange}
            name="encryptionKey"
            placeholder="Enter your key"
            mb={4}
          />
          <Button onClick={handleEncrypt} colorScheme="purple" mb={4}>
            Encrypt
          </Button>

          <Text
            fontSize="xl"
            fontWeight="bold"
            color="purple.500"
            mb={4}
            textAlign="center"
          >
            {encryptedMessage}
          </Text>
        </>
      ) : (
        <>
          <Heading as="h2" size="lg" mb={4}>
            Decrypt Message
          </Heading>
          <Text>Encrypted Message</Text>
          <Textarea
            value={values.encryptedMessage}
            name="encryptedMessage"
            onChange={handleInputChange}
            placeholder="Enter your message"
            mb={4}
          />
          <Text>Decription Key</Text>
          <Input
            value={values.decryptionKey}
            name="decryptionKey"
            onChange={handleInputChange}
            placeholder="Enter your key"
            mb={4}
          />
          <Button onClick={handleDecrypt} colorScheme="purple">
            Decrypt
          </Button>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="purple.500"
            mb={4}
            textAlign="center"
          >
            {decryptedMessage}
          </Text>
        </>
      )}
    </>
  );
}
