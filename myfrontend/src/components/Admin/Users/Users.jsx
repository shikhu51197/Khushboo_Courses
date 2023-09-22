import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import cursor from '../../../assets/Images/cursor.png';
import SideBar from '../Dashboard/SideBar';
import {  RiDeleteBin7Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  getAllUsers,
  updateUserRole,
} from '../../../redux/actions/admin';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const Users = () => {
  const { users, loading, error, message } = useSelector(state => state.admin);

  const dispatch = useDispatch();

  const updateHandler = userId => {
 
    dispatch(updateUserRole(userId));
  };
  const deleteButtonHandler = userId => {
    dispatch(deleteUser(userId));
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

    dispatch(getAllUsers());
  }, [dispatch, error, message]);
  return (
    <Grid
      css={{ cursor: `url(${cursor}) , default` }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box p={['0', '16']} overflowX={'auto'}>
        <Heading
          textTransform="uppercase"
          my="16"
          textAlign={['center ', 'left']}
        >
          All Users
        </Heading>
        <TableContainer w={['100vw', 'full']}>
          <Table variant="simple" size="lg">
            <TableCaption>All Available Users in the DateBase </TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Subscription</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users &&
                users.map(item => (
                  <Row
                    updateHandler={updateHandler}
                    deleteButtonHandler={deleteButtonHandler}
                    loading={loading}
                    key={item._id}
                    item={item}
                  />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <SideBar />
    </Grid>
  );
};

export default Users;

const Row = ({ item, updateHandler, deleteButtonHandler, loading }) => {

 
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>
        {item.subscription && item.subscription.status === 'active'
          ? 'Active'
          : 'Not Active'}
      </Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => updateHandler(item._id)}
            variant={'outline'}
            isLoading={loading}
            color="purple.500"
          >
            change role
          </Button>
          <Button
            onClick={() => deleteButtonHandler(item._id)}
            isLoading={loading}
            color="purple.600"
          >
            <RiDeleteBin7Line />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
};
