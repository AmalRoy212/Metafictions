import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Messenger from "./Messenger";
import SideDrawer from './SideDrawer';

function MessagePage() {

  const [currentChat, setCurrentChat] = useState();
  
  return (
    <div>
      <SideDrawer setCurrentChat={setCurrentChat} />
      <ChakraProvider>
        <Messenger currentChat={currentChat} />
      </ChakraProvider>
    </div>
  )
}

export default MessagePage
