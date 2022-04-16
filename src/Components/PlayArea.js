import { Box, Flex, useMediaQuery, VStack, Heading, Text } from "@chakra-ui/react"

import WordsTrySection from "./WordsTrySection"
import Keyboard from "./Keyboard"

import { ShortPopupContext } from "../Context/ShortLengthPopupContext"
import { WordNotPresentPopupContext } from "../Context/WordNotPresentContext"
import { WinPopupContext } from "../Context/WinPopupContext"
import { MessageContext } from "../Context/GameOverMessageContext"
import { DisplayContext } from '../Context/GameOverPopupDisplayContext'

import { useContext } from "react"

import React from "react"


const PlayArea = () => {
    const { showShortPopup, setShowShortPopup } = useContext(ShortPopupContext)
    const { showNoWordPopup, setShowNoWordPopup } = useContext(WordNotPresentPopupContext)
    const { showWinPopup } = useContext(WinPopupContext)
    const { Display, setDisplay } = useContext(DisplayContext)
    const { gameOverData } = useContext(MessageContext)

    const [HeightMoreThan900] = useMediaQuery('(min-height:900px)')


// --------------------------------------------------------------
    const setDisplayofPopup = () => {
        setDisplay("none")
    }


    if (showShortPopup === 1) {
        setTimeout(() => {
            setShowShortPopup(0)
        }, 1000)
    }


    if (setShowNoWordPopup === 1) {
        setTimeout(() => {
            setShowNoWordPopup(0)
        }, 1000)
    }


    const display = () => Display
// --------------------------------------------------------------



    return (
        <>
            <Flex w='full' h='100%' className="playArea" flexDirection='column' alignItems='center' justifyContent={HeightMoreThan900 ? "space-around" : 'space-between'} position='relative'>

                <Flex bgColor='#ffffff' width='175px' h='50px' borderRadius='5px' justifyContent='center' alignItems="center" fontWeight='bold' position='absolute' top='5%' opacity={showShortPopup} transition='0.3s' className="shortLengthPopup">Not enough letters</Flex>

                <Flex bgColor='#ffffff' width='175px' h='50px' borderRadius='5px' justifyContent='center' alignItems="center" fontWeight='bold' position='absolute' top='5%' opacity={showNoWordPopup} transition='0.3s' className="notPresentPopup">Not in word list</Flex>

                <Flex bgColor='#ffffff' width='175px' h='50px' borderRadius='5px' justifyContent='center' alignItems="center" fontWeight='bold' position='absolute' top='5%' opacity={showWinPopup} transition='0.3s' className="winPopup">{gameOverData.message}</Flex>

                <Flex bgColor='#303030' width='300px' h='200px' justifyContent='center' alignItems="center" flexDir='column' fontWeight='bold' position='absolute' top='20%' className="gameOverPopup" color='white' display={display()}>
                    <i className="bi bi-x" style={{ position: "absolute", top: "0", right: "0", cursor: "pointer" }} onClick={setDisplayofPopup}></i>
                    <Text pb='20px'>Attempts: {gameOverData.count} of 6</Text>
                    <Text>Win: {gameOverData.message.includes(":(") ? "0%" : "100%"}</Text>
                </Flex>

                <WordsTrySection />
                <Keyboard />
            </Flex>
        </>
    )
}


export default React.memo(PlayArea)