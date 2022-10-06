import React, { useState } from "react";
import {
  Box,
  Flex,
  Input,
  Stack,
  VStack,
  Text,
  Center,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import bg from "../image/bg.png";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { fetchLogin } from "../services/fetch-api";

const Login = () => {
  const navigate = useNavigate();
  const [formlogin, setFormlogin] = useState({
    Username: "",
    Password: "",
  });
  const [errorMsg, setErrorMsg] = useState({
    msg: "",
  });

  const { Username, Password } = formlogin;

  const handleLogin = () => {
    if (Username == "" || Password == "") {
      setErrorMsg({ ...errorMsg, msg: "**กรุณาระบุ Password หรือ Username**" });
    } else {
      fetchLogin(formlogin).then((data) => {
        console.log(data);
        if (data.state) {
          Swal.fire({
            icon: "success",
            title: data.msg,
            showConfirmButton: !data.state,
            timer: 2000,
          }).then(() => {
            navigate("/Home");
            setErrorMsg({
              ...errorMsg,
              msg: "",
            });
            setFormlogin({
              ...formlogin,
              username: "",
              password: "",
            });
          });
        } else {
          Swal.fire({
            icon: "error",
            title: data.msg,
            // text: "สำเร็จ",
          });
          setFormlogin({
            ...formlogin,
            Username: "",
            Password: "",
          });
        }
      });
    }
  };
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <Box
        w="100vw"
        h="100vh"
        bg="#FFFFFF"
        bgImage={bg}
        bgPosition="right bottom"
        bgSize="1200px"
        bgRepeat="no-repeat"
      >
        <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
          <Box
            bg="white"
            shadow="md"
            w="30%"
            h="max-content"
            rounded="md"
            py="50px"
          >
            <Stack px="50px">
              <Center w="100%">
                <Text fontSize="25px" fontWeight="semibold" color="black">
                  Metting Room Reservations Approve
                </Text>
              </Center>
              <Box>
                <Text
                  mb="5px"
                  fontSize="16px"
                  fontWeight="semibold"
                  color="black"
                >
                  Enter Username
                </Text>
                <Input
                  color="black"
                  placeholder="username"
                  size="md"
                  type="text"
                  value={Username}
                  onChange={({ target: { value: Username } }) => {
                    setFormlogin({ ...formlogin, Username });
                  }}
                />
              </Box>
              <Box mt="10px">
                <Text
                  mb="5px"
                  fontSize="16px"
                  fontWeight="semibold"
                  color="black"
                >
                  Password
                </Text>
                <InputGroup size="md">
                  <Input
                    value={Password}
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    onChange={({ target: { value: Password } }) => {
                      setFormlogin({ ...formlogin, Password });
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
              <Text color="red">{errorMsg.msg}</Text>
              <Center w="100%">
                <Button bg="red" color="white" mt="50px" onClick={handleLogin}>
                  Login
                </Button>
              </Center>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Login;
