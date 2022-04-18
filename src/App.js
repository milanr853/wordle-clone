import { Flex } from "@chakra-ui/react";
import Header from "./Components/Header";
import PlayArea from "./Components/PlayArea";
import React from "react";

import { LetterMatrixProvider } from "./Context/LetterContext";
import { RowProvider } from "./Context/RowContext";
import { ShortPopupProvider } from "./Context/ShortLengthPopupContext";
import { WordNotPresentPopupProvider } from "./Context/WordNotPresentContext";
import { WinPopupProvider } from "./Context/WinPopupContext";
import { MessageContextProvider } from "./Context/GameOverMessageContext";
import { DisplayContextProvider } from "./Context/GameOverPopupDisplayContext";

function App() {
  return (
    <>
      <DisplayContextProvider>
        <MessageContextProvider>
          <WinPopupProvider>
            <WordNotPresentPopupProvider>
              <ShortPopupProvider>
                <RowProvider>
                  <LetterMatrixProvider>
                    <Flex
                      w="100vw"
                      h="100vh"
                      bgColor="blackAlpha.900"
                      className="bodyWrapper"
                      flexDirection="column"
                    >
                      <Header />
                      <PlayArea />
                    </Flex>
                  </LetterMatrixProvider>
                </RowProvider>
              </ShortPopupProvider>
            </WordNotPresentPopupProvider>
          </WinPopupProvider>
        </MessageContextProvider>
      </DisplayContextProvider>
    </>
  );
}

export default App;
