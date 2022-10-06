import React from 'react';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import bgimg from '../../image/bg.png';
import '../../App.css';
const ContentWrapper = ({ content: Content }) => {
  const pageTransition = {
    ease: 'anticipate',
    type: 'tween',
  };
  return (
    <>
      <Box
        h="100vh"
        bg="white"
        bgImage={bgimg}
        bgPosition="right bottom"
        bgSize={{
          xl: '1200px',
          lg: '1200px',
          md: '600px',
          sm: '600px',
          base: '550px',
        }}
        bgRepeat="no-repeat"
        w="100%"
        overflow="auto"
      >
        <motion.div
          initial={{ opacity: 0, y: '1%' }}
          animate={{ opacity: 1, y: '0%' }}
          exit={{ opacity: 0, y: '1%' }}
          transition={pageTransition}
        >
          <Content />
        </motion.div>
      </Box>
    </>
  );
};

export default ContentWrapper;
