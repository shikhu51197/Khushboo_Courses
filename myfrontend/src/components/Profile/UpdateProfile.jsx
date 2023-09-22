import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';

const UpdateProfile = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(name , email)
     await dispatch(updateProfile(name, email));
     dispatch(loadUser());
    navigate('/profile');
  };
  const { loading } = useSelector(state => state.profile);
  return (
    <Container py="16" minH="90vh">
      <form onSubmit={submitHandler}>
        <Heading
          textTransform={'uppercase'}
          my="16"
          textAlign={['center', 'left']}
        >
          Update Profile
        </Heading>
        <VStack s="8">
          <Input
            id="password"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            type="text"
            focusBorderColor={'green.200'}
          />
          <Input
            required
            id="password"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            focusBorderColor={'green.200'}
          />
          <Button
            isLoading={loading}
            w="full"
            colorScheme={'yellow'}
            type="submit"
          >
            Change
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
