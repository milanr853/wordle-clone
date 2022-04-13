import {Box, Flex, VStack} from "@chakra-ui/react"
import Header from "./Components/Header"
import PlayArea from "./Components/PlayArea";


function App() {
  
  return (
    <>
    <Flex w='100vw' h='100vh' bgColor='blackAlpha.900' className="bodyWrapper" flexDirection='column' >
      <Header/>
      <PlayArea/>
    </Flex>
    </>
  );
}

export default App;
