import {
  Avatar,
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { fileUploadCss } from '../Auth/Register';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelSubscription, loadUser } from '../../redux/actions/user';
import { removeFromPlaylist, updateProfilePicture } from '../../redux/actions/profile';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
const Profile = ({user}) => {


  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(state => state.profile);
  const {
    loading: subscriptionLoading,
    message: subscriptionMessage,
    error: subscriptionError,
  } = useSelector(state => state.subscription);

  const removeFromPlaylistHandler = async (id) => {
    await dispatch(removeFromPlaylist(id));

    setTimeout(()=>{
 dispatch(loadUser());
    },2000)
   
  };

  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('file', image);
    await dispatch(updateProfilePicture(myForm));
    dispatch(loadUser());
  };

  const cancelSubscriptionHandler = () => {
    dispatch(cancelSubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
      
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    if (subscriptionMessage) {
      toast.success(subscriptionMessage);
      dispatch({ type: 'clearMessage' });
      setTimeout(()=>{
      dispatch(loadUser());
           },2000)
 ;
    }

    if (subscriptionError) {
      toast.error(subscriptionError);
      dispatch({ type: 'clearError' });
    }
  }, [dispatch, error, message , subscriptionError ,subscriptionMessage ]);

  const {isOpen , onClose , onOpen} = useDisclosure()
  return (
    <Container minH={'95vh'} maxW="container.lg" py="8">
      <Heading m="8" textTransform={'uppercase'}>
        Profile
      </Heading>
      <Stack
        justifyContent={'flex-start'}
        direction={['column', 'row']}
        alignItems={'center'}
        spacing={['8', '16']}
        p="8"
      >
        <VStack>
          <Avatar boxSize={'48'} src={user.avatar.url} />
          <Button  onClick={onOpen} colorScheme={'yellow'} variant="gost">
            Change Photo
          </Button>
        </VStack>
        <VStack spacing={'4'} align={['center', 'flex-start']}>
          <HStack>
            <Text fontWeight={'bold'}>Name :</Text>
            <Text>{user.name}</Text>
          </HStack>
          <HStack>
            <Text fontWeight={'bold'}>Email :</Text>
            <Text>{user.email}</Text>
          </HStack>
          <HStack>
            <Text fontWeight={'bold'}>Created At :</Text>
            <Text>{user.createdAt.split('T')[0]}</Text>
          </HStack>

          {user.role !== 'admin' && (
            <HStack>
              <Text fontWeight={'bold'}>
                {user.subscription && user.subscription.status === 'active' ? (
                  <Button isLoading={subscriptionLoading} onClick={cancelSubscriptionHandler} color="yellow.500" variant="unstyled">
                    Cancle Subscription
                  </Button>
                ) : (
                  <Link to="/subscribe">
                    <Button colorScheme="yellow">Subscribe</Button>
                  </Link>
                )}
              </Text>
            </HStack>
          )}
          <Stack direction={['column', 'row']} alignItems={'center'}>
            <Link to="/updateprofile">
              <Button>Update Profile</Button>
            </Link>
            <Link to="/changepassword">
              <Button>Change Password</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>

      <Heading size="md" my="8">
        PlayList
      </Heading>
      {user.playlist.length > 0 && (
        <Stack
          direction={['column', 'row']}
          alignItems={'center'}
          flexWrap="wrap"
          p="4"
        >
          {user.playlist.map((element, index) => (
            <VStack w="48" m="2" key={element.course}>
              <Image
                boxSize={'full'}
                objectFit="contain"
                src={element.poster}
              />
              <HStack>
                <Link to={`/course/${element.course}`}>
                  <Button variant={'ghost'} colorScheme="yellow">
                    {' '}
                    Watch Now
                  </Button>
                </Link>
                <Button isLoading={loading} onClick={()=> removeFromPlaylistHandler(element.course)}><RiDeleteBin7Fill/></Button>
              </HStack>
            </VStack>
          ))}
        </Stack>
      )}

      <ChangePhotoBox loading={loading} changeImageSubmitHandler={changeImageSubmitHandler}isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};

export default Profile;


function ChangePhotoBox({isOpen , onClose , changeImageSubmitHandler , loading}){
    const [image , setImage] = useState("")
    const [imagePrev , setImagePrev] = useState("")
    const changeImage =(e)=>{
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = ()=>{
            setImagePrev(reader.result)
            setImage(file)
        }
    }

    const closeHandler = ()=>{
        onClose()
        setImagePrev("")
        setImage("") 
    }
    return (
        <Modal isOpen={isOpen} onClose={closeHandler} >
           <ModalOverlay backdropFilter={"blur(10px)"} />
           <ModalContent>
            <ModalCloseButton/>
            <ModalBody>
                <Container>
                    <form onSubmit={(e)=> changeImageSubmitHandler(e , image)}>
                        <VStack s="8">
                         {
                            imagePrev &&  <Avatar src={imagePrev} boxSize={"48"} />
                         }
            
            <Input type="file" css={{"&::file-selector-button":fileUploadCss}} onChange={changeImage}/>
            <Button isLoading={loading} w="full" colorScheme='yellow' type="submit">Change</Button>

                        </VStack>
                    </form>
                </Container>
            </ModalBody>

<ModalFooter>
    <Button mr="3" onClick={closeHandler}>Cancel
    </Button>
</ModalFooter>

           </ModalContent>

        </Modal>
    )
}