import { Box, Flex, VStack } from "@chakra-ui/react"
import Header from "./Components/Header"
import PlayArea from "./Components/PlayArea";

import { LetterArrayProvider,BoolProvider } from "./Context/LetterContext"

function App() {

  return (
    <>
    <BoolProvider>
      <LetterArrayProvider>
        <Flex w='100vw' h='100vh' bgColor='blackAlpha.900' className="bodyWrapper" flexDirection='column' >
          <Header />
          <PlayArea />
        </Flex>
      </LetterArrayProvider>
      </BoolProvider>
    </>
  );
}

export default App;
