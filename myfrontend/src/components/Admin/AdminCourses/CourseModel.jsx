import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { fileUploadCss } from '../../Auth/Register';

const CourseModel = ({
  isOpen,
  onClose,
  id,
  deleteButtonHandler,
  courseTitle,
  lectures = [],
  addLectureHandler,
  loading
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoPrev, setvideoPrev] = useState('');
  const chnageVideoHandler =(e)=>{
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = ()=>{
        setvideoPrev(reader.result)
        setVideo(file)
    }
}

const handleClose = () => {
  setTitle('');
  setDescription('');
  setVideo('');
  setvideoPrev('');
  onClose();
};
  return (
    <Modal  isOpen={isOpen} size="full" onClose={handleClose} scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{courseTitle}</ModalHeader>
        <ModalCloseButton  onClick={onClose}></ModalCloseButton>
        <ModalBody p="16">
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box px={['0', '16']}>
              <Box my="5">
                <Heading>Course Title</Heading>
                <Heading size="sm" opacity={'0.4'}>{`#${id}`}</Heading>
              </Box>
              <Heading size="lg">Lectures</Heading>
           
{lectures.map((item , index) =>(
    <VideoCart
    key={index}
    title={item.title}
    description={item.description}
    num={index+1}
    leactureId={item._id}
    courseId={id}
    deleteButtonHandler={deleteButtonHandler}
    loading={loading}
  />
))}

            </Box>
            <Box>
              <form
                onSubmit={e =>
                  addLectureHandler(e, id, title, description, video)
                }
              >
                <VStack s="4">
                  <Heading size="md" textTransform={'uppercase'}>
                    Add Lecture
                  </Heading>
                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                     <Input
                    focusBorderColor="purple.300"
                    placeholder="discription"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                     <Input required  accept="video/mp4*"
          
          onChange={chnageVideoHandler}
           type="file"
           focusBorderColor={"purple.300"}
           css={{
             "&::file-selector-button":{
               ...fileUploadCss,color:"purple.300"
             }
           }}
           />
           {
            videoPrev && (
                <video controlsList='nodownload' controls src={videoPrev}></video>
            )
           }
           <Button isLoading={loading} w="full" colorScheme='purple' type="submit">Upload</Button>
                </VStack>
              </form>


            </Box>
          </Grid>
        </ModalBody>

        <ModalFooter >
            <Button onClose={handleClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CourseModel;

const VideoCart = ({
  title,
  description,
  num,
  leactureId,
  courseId,
  deleteButtonHandler,
  loading
}) => {
  return (
    <Stack
      direction={['column', 'row']}
      my="8"
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107 , 70 , 193 , 0.5)'}
      justifyContent={['flex-start', 'space-between']}
      p={['4', '8']}
    >
      <Box>
        <Heading size="sm">{`#${num} ${title}`}</Heading>
        <Text>{description}</Text>
      </Box>
      <Button
      isLoading={loading}
        color={'purple.600'}
        onClick={() => deleteButtonHandler(courseId, leactureId)}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
};
