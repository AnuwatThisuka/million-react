import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  Center,
} from '@chakra-ui/react';
import React from 'react';
import { useState, useEffect } from 'react';
import '../App.css';
import Swal from 'sweetalert2';
import { fetchroomvipinfo } from '../services/fetch-api';
import { useSelector, useDispatch } from 'react-redux';
import { updateRoomvip } from '../store/slices/viproomSlices';

const Table1 = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const roominfo = useSelector((state) => state.viproominfo);
  console.log(roominfo);

  const [formNotes, setFormNotes] = useState({
    Notes: '',
  });

  const [errorMsg, setErrorMsg] = useState({
    msg: '',
  });

  const { Notes } = formNotes;
  const handleNotes = () => {
    if (Notes == '') {
      setErrorMsg({
        ...errorMsg,
        msg: '** กรุณาระบุหมายเหตุในการไม่อนุมัติ **',
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

        setFormNotes({
          ...formNotes,
          Notes: '',
        });
      });
    }
  };

  const getroomvip = () => {
    fetchroomvipinfo().then((data) => {
      dispatch(updateRoomvip(data));
    });
  };

  const datatable = () => {
    roominfo.map((info, i) => {
      return (
        <Tr key={i} h={{ base: '1rem', xl: '2.938rem' }}>
          <Td>{i + 1}</Td>
          <Td>{info.Name}</Td>
          <Td>{info.Purpose}</Td>
          <Td>{info.Activity}</Td>
          <Td>{info.PartNo}</Td>
          <Td>{info.PartName}</Td>
          <Td>{info.StartDate}</Td>
          <Td>{info.EndDate}</Td>
          <Td>{info.Process}</Td>
          <Td>{info.Target}</Td>
          <Td>{info.Actual}</Td>
        </Tr>
      );
    });
  };

  useEffect(() => {
    const initPage = setTimeout(() => {
      getroomvip();
    }, 500);
    const timer5s = setInterval(() => {
      getroomvip();
    }, 5000);
    return () => {
      clearTimeout(initPage);
      clearInterval(timer5s);
    };
  }, []);
  return (
    <>
      <Box w="100vw" h="95vh" px="2rem">
        <Tabs
          size="lg"
          variant="enclosed"
          h="100%"
          pt="1rem"
          borderColor="#00000011"
        >
          <TabList h="5%">
            <Tab fontSize="xl">Pending Approval</Tab>
            <Tab fontSize="xl">Approve</Tab>
            <Tab fontSize="xl">Dis Approved</Tab>
          </TabList>
          <Box></Box>
        </Tabs>
      </Box>
    </>
  );
};

export default Table1;
