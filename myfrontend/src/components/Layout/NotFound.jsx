import React from 'react'
import {  Button, Container, Heading,  VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { RiErrorWarningFill } from 'react-icons/ri'
const NotFound = () => {
    return (
        <Container h="100vh" pb="16">
            <VStack justifyContent={"center"} h="full" spacing="4">
                <RiErrorWarningFill size="5rem" />
            <Heading  >Page Not Found </Heading>
         

    <Link to="/">
        <Button variant="gost"  >Go to Home</Button>
    </Link>

      
            </VStack>
        </Container>
      )
}

export default NotFound