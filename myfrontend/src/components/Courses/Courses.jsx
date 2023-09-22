import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadUser } from '../../redux/actions/user';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { addToPlaylist } from '../../redux/actions/profile';
import { getAllCourses } from '../../redux/actions/course';

const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
  loading
}) => {
  return (
    <VStack  className="course" alignItems={['center', 'flex-start']}>
      <Image src={imageSrc} boxSize="60" objectFit={'contain'} />
      <Heading
        textAlign={['center', 'left']}
        maxW="200px"
        fontFamily={'sans-serif'}
        noOfLines={'3'}
        children={title}
        size="sm"
      />
      <Text children={description}  noOfLines={10} />
      <HStack>
        <Text
          fontWeight={'bold'}
          textTransform="uppercase"
          children={'Creator'}
        />
        <Text
          fontFamily={'body'}
          
          children={creator}
        />
      </HStack>

      <Heading
        textAlign={'center'}
        size="xs"
        children={`Lecture - ${lectureCount}`}
        textTransform="uppercase"
      />
      <Heading
       textAlign={'center'}
        size="xs"
        children={`Views - ${views}`}
        textTransform="uppercase"
      />

      <Stack direction={['column', 'row']} alignItems="center">
        <Link to={`/course/${id}`}>
          <Button colorScheme="yellow">Watch Now</Button>
        </Link>
        <Button
        isLoading={loading}
          colorScheme="yellow"
          variant={'ghost'}
          onClick={() => addToPlaylistHandler(id)}
        >
          Add to PlayList
        </Button>
      </Stack>
    </VStack>
  );
};

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  const addToPlaylistHandler = async (couseId) => {
    await dispatch(addToPlaylist(couseId));
    setTimeout(()=>{
      dispatch(loadUser());
         },2000)
  };

  const categories = [
    'Web development',
    'Artificial Intellegence',
    'Data Structure & Algorithm',
    'App Development',
    'Machine Learning',
    'Data Science',
    'Game Development',
  ];

  const { loading,courses, error, message } = useSelector(state => state.course);

 
  useEffect(() => {
    dispatch(getAllCourses(category, keyword));

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
  
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [category, keyword, dispatch, error, message]);

  return (
    <Container  minH={'95vh'} maxH="auto" paddingY={'8'} maxW={"60%"}>
      <Heading children="All Courses" m={'8'} />
      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search a course..."
        type="text"
        focusBorderColor="green.300"
      />
      <HStack
        overflowX={'auto'}
        paddingY={'8'}
        css={{ '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {categories.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minW={'60'}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>
      <Box
      gap="20px"
    
      display="flex"
         direction={['row', 'column']}
        flexWrap="wrap"
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
        
      >
       {courses.length > 0 ? (
          courses.map(item => (
            <Course

              key={item._id}
              title={item.title}
              description={item.description}
              views={item.views}
              imageSrc={item.poster.url}
              id={item._id}
              creator={item.createdBy}
              lectureCount={item.numOfVideos}
              addToPlaylistHandler={addToPlaylistHandler}
              loading={loading}
            />
          ))
        ) : (
          <Heading mt="4" children="Courses Not Found" />
        )}
      </Box>
    </Container>
  );
};

export default Courses;
