import { Box, Button, HStack, Heading, Image, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import "./home.css"
import { Link } from 'react-router-dom'
import vg from "../../assets/Images/boy.png"
import {CgGoogle , CgYoutube } from "react-icons/cg"
import {SiUdemy , SiCoursera } from "react-icons/si"
import {DiAws } from "react-icons/di"
import intro from "../../assets/Videos/coursevideo.mp4"

const Home = () => {
  return <section className='home'>
<div className='container'>
    <Stack
    direction={["column" , "row"]}
    height="100%"
    justifyContent={["center", "space-between"]}
    alignItems="center"
    spacing={["16" , "56"]}
    >
<VStack
width={"full"}
alignItems={["center" , "flex-end"]} spacing={"8"}
>
    <Heading children="LEARN FROM EXPERTS " size={"2xl"} />
    <Text fontSize={"2xl"} fontFamily={"cursive"} textAlign={["center" , "left"]} children="Find Valuable Content At Reasonable Prize" />
    <Link to="/courses">
        <Button size={"lg"} colorScheme='yellow'>Explore Now</Button>
    </Link>
</VStack>
<Image className='vector-graphics' boxSize={"md"} src={vg} objectFit="contain"/>
    </Stack>
</div>
<Box padding={"8"} bg="blackAlpha.800">
    <Heading textAlign="center" fontFamily="body" color="yellow.400" children="OUR BRANDS"></Heading>
    <HStack className='brandsBanner' justifyContent={"space-evenly"} marginTop="4">
        <CgGoogle/>
        <CgYoutube/>
        <SiCoursera/>
        <SiUdemy/>
        <DiAws />
    </HStack>
</Box>
<div className='container2'>
<video 
src={intro} controls autoPlay muted controlsList='nodownload nofullscreen noremoteplayback'
disablePictureInPictureMode='true' disableRemotePlayback
>
      
    </video>
</div>
  </section>
}

export default Home