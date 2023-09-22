import { Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../../redux/actions/user'
import { useDispatch } from 'react-redux'

export const fileUploadCss={
    cursor:"pointer" , marginLeft:"-5%",width:"110%" ,border:"none"  ,height:"100%",
    color:"#ECC94B",backgroundColor:"white"
}
const fileUploadStyle = {
    "&::file-selector-button":fileUploadCss,
}
const Register = () => {
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [name , setName] = useState("")
    const [imagePreview , setImagePreview] = useState("")
    const [image , setImage] = useState("")
    const dispatch = useDispatch()
    const chnageImageHandler =(e)=>{
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = ()=>{
            setImagePreview(reader.result)
            setImage(file)
        }
    }

    const submitHandler = e => {
        e.preventDefault();
        const myForm = new FormData();
    
        myForm.append('name', name);
        myForm.append('email', email);
        myForm.append('password', password);
        myForm.append('file', image);
    
        dispatch(register(myForm));
      };
  return <Container mt="120px" mb={["80px" ," 20px"]}  h="100vh">
    <VStack h="full" justifyContent="center" spacing="16">
        <Heading textTransform={"uppercase"} children="Registration"></Heading>
        <form onSubmit={submitHandler} style={{width:"100%"}}>
            <Box my="4" display={"flex"} justifyContent="center">
                <Avatar src={imagePreview} size={"2xl"}/>
            </Box>
        <Box my="4">
         <FormLabel htmlFor="name" children="Name"/>
            <Input required id="name" value={name} onChange={e => setName(e.target.value)}
            placeholder='abc'
            type="text"
            focusBorderColor={"green.200"}
            />
         </Box>
         <Box my="4">
         <FormLabel htmlFor="email" children="Email Address"/>
            <Input required id="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder='abc@gmail.com'
            type="email"
            focusBorderColor={"green.200"}
            />
         </Box>
         <Box my="4">
         <FormLabel htmlFor="password" children="Password Address"/>
            <Input required id="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder='Enter your password'
            type="password"
            focusBorderColor={"green.200"}
            />
         </Box>
         <Box my="4">
         <FormLabel htmlFor="chooseAvatar" children="choose Avatar"/>
            <Input required id="chooseAvatar" accept="image/*"
           css={fileUploadStyle}
           onChange={chnageImageHandler}
            type="file"
            focusBorderColor={"green.200"}
            />
         </Box>
       
         <Button my="4" colorScheme={"green"} type="submit">Sign Up</Button>
         <Box my="4">
            Already Signed Up ?{" "} <Link to="/login">
                <Button colorScheme='green' variant="link">Login</Button>
                {" "}Here
            </Link>
         </Box>
        </form>
    </VStack>
  </Container>
}

export default Register