import { Box, Flex, useMediaQuery, VStack } from "@chakra-ui/react"

import WordsTrySection from "./WordsTrySection"
import Keyboard from "./Keyboard"


const PlayArea = ()=>{
    const [HeightMoreThan900] = useMediaQuery('(min-height:900px)')

    return(
        <>
        <Flex w='full' h='100%' className="playArea" flexDirection='column' alignItems='center' justifyContent={HeightMoreThan900?"space-around":'space-between'}>
            <WordsTrySection/>
            <Keyboard/>
        </Flex>
        </>
    )
}


export default PlayArea