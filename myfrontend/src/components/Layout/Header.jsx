import React from 'react'
import {ColorModeSwitcher} from "../../ColorModeSwitcher" 
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, VStack, useDisclosure } from '@chakra-ui/react'
import {RiDashboardFill, RiLoginBoxFill, RiMenu5Fill} from "react-icons/ri"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/user'
const LinkButton = ({url="/" , title="Home",onClose})=>(
    <Link onClick={onClose} to={url}>
    <Button variant={"gost"}>{title}</Button>
    </Link>
)
const Header = ({ isAuthenticated = false, user }) => {
    const {isOpen,onClose, onOpen} =  useDisclosure()
    const dispatch = useDispatch();

    const logoutHandler = () => {
      onClose();
      dispatch(logout());
    };
  

  return <>
  <ColorModeSwitcher/>
  <Button onClick={onOpen} colorScheme='yellow' zIndex={"overlay"} width="12" h="12" rounded="full" position="fixed" top="6" left="6">
    <RiMenu5Fill/>
  </Button>
  <Drawer placement='left' onClose={onClose} isOpen={isOpen} >
    <DrawerOverlay backdropFilter={'blur(3px'} />
    <DrawerContent>
        <DrawerHeader borderBottomWidth={"1px"}>Khushboo's Course</DrawerHeader>
        <DrawerBody>
            <VStack spacing={"4"} alignItems={"center"}>
               <LinkButton onClick={onClose} url="/" title='Home' />
               <LinkButton onClick={onClose} url="/courses" title='Browser All Courses' />
               <LinkButton onClick={onClose} url="/request" title='Request a Course' />
               <LinkButton onClick={onClose} url="/contact" title='Contact Us' />
               <LinkButton onClick={onClose} url="/about" title='About' />
              <HStack justifyContent={"space-evenly"} position="absolute" bottom={"2rem"} w="80%">
            {isAuthenticated?(<>
            <VStack>
                <HStack>
                    <Link onClick={onClose} to="/profile">
                    <Button variant={"ghost"} colorScheme='yellow'>Profile</Button>
                    </Link>
                    <Button variant={"ghost"} onClick={logoutHandler} colorScheme='yellow'>
                        <RiLoginBoxFill/>
                        LogOut</Button>
                </HStack>
                {user && user.role==="admin" && <Link onClick={onClose} to="/admin/dashboard">
                    <Button colorScheme='purple' variant={"ghost"}>
                        <RiDashboardFill style={{margin:"4px"}}/>
                        Dashboard
                    </Button>
                    </Link>}
            </VStack>
            </>):(<>
            <Link onClick={onClose} to="/login">
                <Button colorScheme={"yellow"}>Login</Button>
            </Link>
            <p>OR</p>
            <Link onClick={onClose} to="/register">
                <Button colorScheme={"yellow"}>Sign Up</Button>
            </Link>
            </>)}
              </HStack>
            </VStack>
        </DrawerBody>
    </DrawerContent>
  </Drawer>
  </>
}

export default Header

