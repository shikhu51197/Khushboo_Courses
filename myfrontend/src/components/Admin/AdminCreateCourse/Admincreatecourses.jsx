
import {  Container, Grid, Heading, VStack,Input, Select, Image, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import cursor from '../../../assets/Images/cursor.png';
import SideBar from '../Dashboard/SideBar';
import { fileUploadCss } from '../../Auth/Register';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse } from '../../../redux/actions/admin';
import { useEffect } from 'react';

const Admincreatecourses = () => {
  const [title , setTitle] = useState("")
  const [description , setDescription] = useState("")
  const [createdBy , setCatetedBy] = useState("")
  const [category , setCategory] = useState("")
  const [image , setImage] = useState("")
  const [imagePrev , setImagePrev] = useState("")
  
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(state => state.admin);
  const categories = [
    'Frontend Developer',
    'Backend Developer',
    'Full-Stack Developer',
    'Data Structures',
    'Game Programming',
  ];
  const chnageImageHandler =(e)=>{
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = ()=>{
      setImagePrev(reader.result)
        setImage(file)
    }
}
const submitHandler = e => {
  e.preventDefault();
  const myForm = new FormData();
  myForm.append('title', title);
  myForm.append('description', description);
  myForm.append('category', category);
  myForm.append('createdBy', createdBy);
  myForm.append('file', image);
  dispatch(createCourse(myForm));
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
}, [dispatch, error, message]);

  return (
    <Grid
    css={{ cursor : `url(${cursor}) , default` }}
    minH={'100vh'}
    templateColumns={['1fr', '5fr 1fr']}
  >
<Container py="16">
  <form onSubmit={submitHandler}>
      <Heading textTransform="uppercase" my="16" textAlign={["center ","left" ]} >Create Course</Heading>
      <VStack  m="auto" spacing="8">
      <Input   value={title} onChange={e => setTitle(e.target.value)}
           placeholder='Title'
           type="text"
           focusBorderColor={"purple.300"}
           />
             <Input   value={description} onChange={e => setDescription(e.target.value)}
           placeholder='discription'
           type="text"
           focusBorderColor={"purple.300"}
           />
             <Input   value={createdBy} onChange={e => setCatetedBy(e.target.value)}
           placeholder='Creater Name'
           type="text"
           focusBorderColor={"purple.300"}
           />
           <Select  focusBorderColor={"purple.300"} value={category} onChange={e => setCategory(e.target.value)} >
            <option value="">Category</option>
            {categories.map((item)=>{
              return         <option  key={item} value={item}>{item}</option>
            })}
           
           </Select>
           <Input required  accept="image/*"
          
          onChange={chnageImageHandler}
           type="file"
           focusBorderColor={"purple.300"}
           css={{
             "&::file-selector-button":{
               ...fileUploadCss,color:"purple.300"
             }
           }}
           />
           {imagePrev && (
            <Image src={imagePrev} boxSize={"64"} objectFit={"contain"} />
           )}

           <Button w="full"   isLoading={loading} colorScheme='purple' type="submit">Create</Button>
      </VStack>
  </form>

  
</Container>
<SideBar/>

  </Grid>
  )
}

export default Admincreatecourses