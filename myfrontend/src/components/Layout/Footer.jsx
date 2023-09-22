import { Box, Stack, VStack, Heading, HStack } from '@chakra-ui/react';
import React from 'react';
import {
  TiSocialYoutubeCircular,
  TiSocialInstagramCircular,
} from 'react-icons/ti';
import {DiGithub} from 'react-icons/di'
const Footer = () => {
  return (
    <Box padding={'4'} bg="blackAlpha.900" minH={'10vh'}>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width="full">
          <Heading children="All Rights Reserved" color={'white'} />
          <Heading
            fontFamily={'body'}
            size="sm"
            children="@Shikhu D Mentor"
            color={'yellow.400'}
          />
        </VStack>
        <HStack spacing={['2', '10']} justifyContent="center" color={'white'} fontSize='50'>
          <a href="https://youtube.com/ShikhuDmentor" target={'blank'}>
            <TiSocialYoutubeCircular /></a>
            <a href="https://youtube.com/ShikhuDmentor" target={'blank'}> 
            <TiSocialInstagramCircular /></a>
            <a href="https://youtube.com/ShikhuDmentor" target={'blank'}>
            <DiGithub/>
            </a>
          
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
