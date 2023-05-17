import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  useToast
} from "@chakra-ui/react";
import {useState} from "react";
import {sendContactForm} from "../lib/api";

const initValues = {
  name: '',
  email: '',
  subject: '',
  message: ''
}

const initState = {values: initValues}

export default function Home() {
  const toast = useToast();
  const [ state, setState ] = useState(initState)
  const [ touched, setTouched ] = useState({})
  
  const {values, isLoading, error} = state
  
  const onBlur = ( {target} ) =>
    setTouched(( prev ) => ({...prev, [target.name]: true}));
  
  const handleChange = ( {target} ) =>
    setState(( prev ) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));
  
  const onSubmit = async () => {
    setState(( prev ) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      await sendContactForm(values);
      setTouched({});
      setState(initState);
      toast({
        title: "Message sent.",
        status: "success",
        duration: 2000,
        position: "top",
      });
    } catch (error) {
      setState(( prev ) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  };
  
  return (
    <Container maxW="450px" mt={12}>
      <Heading>Contact</Heading>
      {error && (
        <Text color={"red.300"} my={4} fontSize={"xl"}>
          {error}
        </Text>
      )}
      <FormControl isInvalid={touched.name && !values.name} isRequired mb={5}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          errorBorderColor="red.300"
          onBlur={onBlur}
        />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={touched.email && !values.email} isRequired mb={5}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          errorBorderColor="red.300"
          onBlur={onBlur}
        />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={touched.subject && !values.subject} isRequired mb={5}>
        <FormLabel>Subject</FormLabel>
         <Input
           type="text"
           name="subject"
           value={values.subject}
           onChange={handleChange}
           errorBorderColor="red.300"
           onBlur={onBlur}
         />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>
      <FormControl mb={5}>
        <FormLabel>Message</FormLabel>
        <Textarea
          type="text"
          name="message"
          value={values.message}
          onChange={handleChange}
          rows={4}
        />
      </FormControl>
      <Button
        variant="outline"
        colorScheme="blue"
        disabled={!values.name || !values.email || !values.subject}
        onClick={onSubmit}
        isLoading={isLoading}
      >
        Submit
      </Button>
    </Container>
  );
}