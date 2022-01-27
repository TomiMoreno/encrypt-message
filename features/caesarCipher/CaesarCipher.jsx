import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  Button,
  NumberInput,
  NumberInputField,
  Heading,
  Stack,
  Text,
  Textarea,
  Center,
  NumberInputStepper,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { caesarEncrypt } from "./encrypt";
import { caesarDecrypt } from "./decrypt";

export function CaesarCipher() {
  return (
    <Stack spacing={8} margin="0 auto" padding={4} maxW="960px" minW="80%">
      <Heading as="h1">Caesar Cipher</Heading>
      <EncryptComponent />
      <DecryptComponent />
    </Stack>
  );
}

function DecryptComponent() {
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    try {
      const decrypted = caesarDecrypt(values.messageToDecrypt, +values.shift);
      setDecryptedMessage(decrypted);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h2" size="lg" mb={4}>
        Decrypt
      </Heading>
      <FormControl isInvalid={errors.messageToDecrypt}>
        <FormLabel htmlFor="messageToDecrypt">Message to decrypt</FormLabel>
        <Textarea
          id="messageToDecrypt"
          placeholder="Message to decrypt"
          {...register("messageToDecrypt", {
            required: "This is required",
          })}
        />
        <FormErrorMessage>
          {errors.messageToDecrypt && errors.messageToDecrypt.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.shift}>
        <FormLabel htmlFor="shift">Shift used to encrypt</FormLabel>
        <NumberInput>
          <NumberInputField
            id="shift"
            placeholder="Shift"
            {...register("shift", {
              required: "This is required",
              min: { value: 0, message: "Minimum value should be 0" },
              pattern: {
                value: /^[0-9]*$/,
                message: "Only numbers are allowed",
              },
            })}
          />
        </NumberInput>
        <FormErrorMessage>
          {errors.shift && errors.shift.message}
        </FormErrorMessage>
      </FormControl>

      <Button
        mt={4}
        colorScheme="blue"
        isSubmitting={isSubmitting}
        type="submit"
      >
        Decrypt
      </Button>

      <Text
        fontSize="xl"
        fontWeight="bold"
        color="blue.500"
        mb={4}
        textAlign="center"
      >
        {decryptedMessage}
      </Text>
    </form>
  );
}

function EncryptComponent() {
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    try {
      const encrypted = caesarEncrypt(values.messageToEncrypt, +values.shift);
      setEncryptedMessage(encrypted);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h2" size="lg" mb={4}>
        Encrypt
      </Heading>
      <FormControl isInvalid={errors.messageToEncrypt}>
        <FormLabel htmlFor="messageToEncrypt">Message to encrypt</FormLabel>
        <Textarea
          id="messageToEncrypt"
          placeholder="Message to encrypt"
          {...register("messageToEncrypt", {
            required: "This is required",
          })}
        />
        <FormErrorMessage>
          {errors.messageToEncrypt && errors.messageToEncrypt.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.shift}>
        <FormLabel htmlFor="shift">Shift</FormLabel>
        <NumberInput>
          <NumberInputField
            id="shift"
            placeholder="Shift"
            {...register("shift", {
              required: "This is required",
              min: { value: 0, message: "Minimum value should be 0" },
              pattern: {
                value: /^[0-9]*$/,
                message: "Only numbers are allowed",
              },
            })}
          />
        </NumberInput>
        <FormErrorMessage>
          {errors.shift && errors.shift.message}
        </FormErrorMessage>
      </FormControl>

      <Button mt={4} colorScheme="blue" isLoading={isSubmitting} type="submit">
        Encrypt
      </Button>

      <Text
        fontSize="xl"
        fontWeight="bold"
        color="blue.500"
        mb={4}
        textAlign="center"
      >
        {encryptedMessage}
      </Text>
    </form>
  );
}
