import {
  Box,
  Text,
  Flex,
  useDisclosure,
  Img,
  Grid,
  GridItem,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Avatar,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import '../App.css';
import ReactLogo from '../image/SNC.svg';
import Resetpassword from './Resetpassword';
import { BsChevronDown } from 'react-icons/bs';
import { fetchLogout } from '../services/fetch-api';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const handlelogout = () => {
    fetchLogout();
    navigate('/');
  };
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box w="100vw" h="5vh" bg="#ffebea">
        <Flex
          w="100%"
          h="100%"
          alignItems="center"
          justifyContent="space-between"
          px="2rem"
        >
          <Box
            w="max-content"
            h="100%"
            className="cursor"
            // onClick={() => navigate("/home")}
          >
            <VStack
              h="100%"
              w="max-content"
              justifyContent="center"
              alignItems="center"
            >
              <Img src={ReactLogo} alt="React Logo" w="6rem" />
            </VStack>
          </Box>
          <Box w="100%" h="100%">
            <Center h="100%">
              <Text
                fontSize={{ base: '25px', xl: '35px' }}
                fontWeight="semibold"
              >
                <b>Metting Room Reservations</b>
              </Text>
            </Center>
          </Box>
          <Box w="max-content" h="100%">
            <Box h="100%" w="100%">
              <Flex
                w="100%"
                justifyContent="flex-end"
                alignItems="center"
                h="100%"
              >
                <Menu>
                  <MenuButton>
                    <Flex alignItems="center">
                      <Avatar
                        name={window.localStorage.username}
                        mr="10px"
                        size="sm"
                      />
                      <Text
                        w="max-content"
                        fontSize="20px"
                        fontWeight="semibold"
                        mr="10px"
                      >
                        {window.localStorage.username}
                      </Text>
                      <BsChevronDown size={20} />
                    </Flex>
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <Resetpassword />
                    </MenuItem>
                    <MenuItem>Help</MenuItem>
                    <MenuItem
                      onClick={() => {
                        handlelogout();
                      }}
                    >
                      Log out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Box>
          </Box>
        </Flex>
        <Divider />
      </Box>
    </>
  );
}

export default Navbar;
