import React from 'react';
import { useState } from 'react';
import '../App.css';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';

function Resetpassword() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [formReset, setFormReset] = useState({
    Currentpassword: '',
    Newpassword: '',
    Confirmpassword: '',
  });
  const [errorMsg, setErrorMsg] = useState({
    msg: '',
  });

  const { Currentpassword, Newpassword, Confirmpassword } = formReset;
  const handleReset = () => {
    if (Currentpassword == '' || Newpassword == '' || Confirmpassword == '') {
      setErrorMsg({
        ...errorMsg,
        msg: '**กรุณาระบุ Password ให้ครบทุกช่อง **',
      });
    } else {
      onClose();
      Swal.fire({
        icon: 'success',
        title: 'สำเร็จ',
        // text: "สำเร็จ",
      }).then(() => {
        setErrorMsg({
          ...errorMsg,
          msg: '',
        });

        setFormReset({
          ...formReset,
          Currentpassword: '',
          Newpassword: '',
          Confirmpassword: '',
        });
      });
    }
  };
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <Text onClick={onOpen}>Reset Password</Text>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reset Your Passwordt</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Current Password</FormLabel>
              <Input
                placeholder="Current Password"
                value={Currentpassword}
                onChange={({ target: { value: Currentpassword } }) => {
                  setFormReset({ ...formReset, Currentpassword });
                }}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>New Password</FormLabel>
              <Input
                placeholder="New Password"
                value={Newpassword}
                onChange={({ target: { value: Newpassword } }) => {
                  setFormReset({ ...formReset, Newpassword });
                }}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                placeholder="Confirm Password"
                value={Confirmpassword}
                onChange={({ target: { value: Confirmpassword } }) => {
                  setFormReset({ ...formReset, Confirmpassword });
                }}
              />
            </FormControl>
            <Text color="red">{errorMsg.msg}</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="green"
              colorScheme="green"
              mr={3}
              onClick={() => {
                handleReset();
              }}
            >
              <Text>Reset Password</Text>
            </Button>
            <Button
              onClick={onClose}
              color="#FFFFFF"
              colorScheme="red"
              bg="red"
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Resetpassword;
