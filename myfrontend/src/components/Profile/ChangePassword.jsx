import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../../redux/actions/profile'
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const ChangePassword = () => {
    const [oldPassword , setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const dispatch = useDispatch();
    const submitHandler = e => {
      e.preventDefault();
      dispatch(changePassword(oldPassword, newPassword));
    };
  
    const { loading, message, error } = useSelector(state => state.profile);
  
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
   <Container py="16" minH="90vh">
     <form onSubmit={submitHandler}>
        
<Heading textTransform={"uppercase"} my="16"  textAlign={["center" , "left"]}>Change Password</Heading>
<VStack s="8">
<Input required id="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)}
            placeholder='Old password'
            type="password"
            focusBorderColor={"green.200"}
            />
            <Input required id="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
            placeholder=' New password'
            type="password"
            focusBorderColor={"green.200"}
            />
            <Button isLoading={loading} w="full" colorScheme={"yellow"} type="submit" >Change</Button>
</VStack>
     </form>
   </Container>
  )
}

export default ChangePassword