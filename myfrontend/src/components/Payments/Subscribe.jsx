import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '../../redux/store';
import { buySubscription } from '../../redux/actions/user';
import { useEffect } from 'react';
import logo from "../../assets/Images/giphy.gif"

const Subscribe = ({user}) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState('');

  const { loading, error, subscriptionId } = useSelector(
    state => state.subscription
  );
  const { error: courseError } = useSelector(state => state.course);

  const subscribeHandler = async () => {
    const {
      data: { key },
    } = await axios.get(`${server}/razorpaykey`);

    setKey(key);
    dispatch(buySubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearError' });
    }
    if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key,
          name: 'Course Start',
          description: 'Get access to all premium content',
          image: logo,
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
             email: user.email,
            contact: '',
          },
          notes: {
            address: 'the Indian',
          },
          theme: {
            color: '#FFC800',
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopUp();
    }
  }, [
    dispatch,
    error,
    courseError,
     user.name,
     user.email,
    key,
    subscriptionId,
  ]);
  
  return (
    <Container h="90vh" p="16">
        <Heading  my="8" textAlign="center">Welcome</Heading>
        <VStack
        boxShadow={"lg"}
        alignItems="stretch"
        borderRadius={"lg"}
        spacing="0"
        >
<Box bg="yellow.400" p="4" css={{borderRadius:"8px 8px 0 0"}}>
    <Text>Pro Pack - Rs.299.00</Text>
</Box>
<Box p="4">
  <VStack textAlign={"center"} px="8" mt="4" spacing="8">
  <Text>Join the Pro Pack and get access to all the Content</Text>
  <Heading>Rs.299 Only</Heading>
  </VStack>
  <Button my="8" w="full" colorScheme='yellow' isLoading={loading} onClick={subscribeHandler}>Buy Now</Button>
</Box>
<Box bg="blackAlpha.600" p="4" css={{borderRadius:"0 0 8px 8px"}}>
<Heading color="white" textTransform="uppercase" size="sm">100% refund on cancellation</Heading>
<Text fontSize={"xs"} color="white"  > Terms and conditions Apply</Text>
</Box>
        </VStack>

    </Container>
  )
}

export default Subscribe