import { ChangeEvent, MouseEventHandler, useState } from 'react'
import Head from 'next/head'
import { Textarea, Box, Text, Input, Heading, Button } from '@chakra-ui/react'
import encrypt from './encrypt'
import decrypt from './decrypt'

export default function BoxesCipher() {
  const [values, setValues] = useState({
    message: '',
    encryptionKey: '',
    decryptionKey: '',
    encryptedMessage: ''
  })
  const [decryptedMessage, setDecryptedMessage] = useState('')
  const [encryptedMessage, setEncryptedMessage] = useState('')
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleEncript: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const encrypted = encrypt(values.message, values.encryptionKey);
    setEncryptedMessage(encrypted);
  };

  const handleDecrypt: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const decrypted = decrypt(
      values.encryptedMessage,
      values.decryptionKey
    );
    setDecryptedMessage(decrypted);
  };
  

  return (
    <>
      <Heading
        as="h1"
        mb={4}
        textAlign="center"
        >
        Encrypt Message
      </Heading>
      <Text>Message</Text>
      <Textarea
        value={values.message}
        onChange={handleInputChange}
        name='message'
        placeholder='Enter your message'
        mb={4}
      />
      <Text>Key</Text>
      <Input
        value={values.encryptionKey}
        onChange={handleInputChange}
        name="encryptionKey"
        placeholder='Enter your key'
        mb={4}
        />
      <Button
        onClick={handleEncript}
        colorScheme="purple"
        mb={4}
        >
        Encript
      </Button>

        <Text>Encrypted Message:</Text>
        <Text
          fontSize="xl"
          fontWeight="bold"
          color="purple.500"
          mb={4}
          textAlign="center"
        >
          {encryptedMessage}
        </Text>
        <Heading as="h2" size="lg" mb={4} textAlign="center">
          Decrypt Message
        </Heading>
        <Text>Encrypted Message</Text>
        <Textarea
          value={values.encryptedMessage}
          name="encryptedMessage"
          onChange={handleInputChange}
          placeholder='Enter your message'
          mb={4}
        />
        <Text>Decription Key</Text>
        <Input
          value={values.decryptionKey}
          name="decryptionKey"
          onChange={handleInputChange}
          placeholder='Enter your key'
          mb={4}
        />
        <Button onClick={handleDecrypt} colorScheme="purple">Decrypt</Button>
        <Text fontSize="xl" fontWeight="bold" color="purple.500" mb={4} textAlign="center">
          {decryptedMessage}
        </Text>
    </>
  )
}