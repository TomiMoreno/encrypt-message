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
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import encrypt from "../features/caesarCipher/encrypt";
import decrypt from "../features/caesarCipher/decrypt";
import { ArrowUpDownIcon } from "@chakra-ui/icons";

export default function CaesarCipher() {
  const [isEncrypting, setIsEncrypting] = useState(true);
  return (
    <Stack spacing={8}>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h1">Caesar Cipher</Heading>
        <Flex gap={2}>
          <FormLabel htmlFor="change-encryption">
            {isEncrypting ? "Encrypt" : "Decrypt"} a message
          </FormLabel>
          <IconButton
            aria-label={isEncrypting ? "Encrypt" : "Decrypt"}
            icon={<ArrowUpDownIcon aria-label="Change" />}
            colorScheme="blue"
            size="sm"
            onClick={() => setIsEncrypting((curr) => !curr)}
            id="change-encryption"
          />
        </Flex>
      </Flex>
      {isEncrypting ? <EncryptComponent /> : <DecryptComponent />}
    </Stack>
  );
}

function DecryptComponent() {
  type FormValues = {
    messageToDecrypt: string;
    shift: number;
  };
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  function onSubmit(values: FormValues) {
    try {
      const decrypted = decrypt(values.messageToDecrypt, +values.shift);
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
      <FormControl isInvalid={!!errors.messageToDecrypt}>
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

      <FormControl isInvalid={!!errors.shift}>
        <FormLabel htmlFor="shift">Shift used to encrypt</FormLabel>
        <NumberInput>
          <NumberInputField
            id="shift"
            placeholder="Shift"
            {...register("shift", {
              required: "This is required",
              pattern: {
                message: "Only positive or negative numbers are allowed",
                value: /^[+-]?\d+$/,
              },
            })}
          />
        </NumberInput>
        <FormErrorMessage>
          {errors.shift && errors.shift.message}
        </FormErrorMessage>
      </FormControl>

      <Button mt={4} colorScheme="blue" isLoading={isSubmitting} type="submit">
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
  type FormValues = {
    messageToEncrypt: string;
    shift: number;
  };
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const shift = watch("shift");

  console.log(shift);
  function onSubmit(values: FormValues) {
    try {
      const encrypted = encrypt(values.messageToEncrypt, +values.shift);
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
      <FormControl isInvalid={!!errors.messageToEncrypt}>
        <FormLabel htmlFor="messageToEncrypt">Message to encrypt</FormLabel>
        <Textarea
          id="messageToEncrypt"
          placeholder="Message to encrypt"
          {...register("messageToEncrypt", {
            required: "This is required",
            pattern: {
              message: "Only letters are allowed",
              value: /^[a-zA-Z ]+$/,
            },
          })}
        />
        <FormErrorMessage>
          {errors.messageToEncrypt && errors.messageToEncrypt.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.shift}>
        <FormLabel htmlFor="shift">
          Shift (a-{">"}
          {encrypt("a", +shift || 0)}){" "}
        </FormLabel>
        <NumberInput>
          <NumberInputField
            id="shift"
            placeholder="Shift"
            {...register("shift", {
              required: "This is required",
              pattern: {
                message: "Only positive or negative numbers are allowed",
                value: /^[+-]?\d+$/,
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
