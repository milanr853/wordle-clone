import { Box, Flex, Grid, Heading, Text, useMediaQuery } from "@chakra-ui/react"
import { useMemo } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { LetterArrayContext } from "../Context/LetterContext"


const WordsTrySection = () => {

    const generateArray = () => {
        console.log('render')
        const arr = []
        for (let i = 0; i < 30; i++) {
            arr.push(Math.random())
        }
        return arr
    }

    // ___use Memo Hook___
    const GenerateArray = useMemo(() => {
        return generateArray()
    }, [])


    const [LessThan350] = useMediaQuery('(max-width:350px)')
    const [HeightLessThan550] = useMediaQuery('(max-height:550px)')
    const [HeightLessThan450] = useMediaQuery('(max-height:450px)')
    const [HeightMoreThan720] = useMediaQuery('(min-height:720px)')


    const { getLetterArray } = useContext(LetterArrayContext)


    // Mapping the list of clicked letters over the grid of boxes 
    useEffect(() => {
        getLetterArray.map((elem, ID) => {
            const letter = document.getElementById(`letter${ID}`)
            const box = document.getElementById(`${ID}`)
            letter.innerText = elem
            box.style.borderColor = "#9c9c9c"
        })
    }, [getLetterArray])


    // Rendering the grid of boxes
    const renderGrid = GenerateArray.map((elem, id) => {
        return (
            <Grid border='1px solid' borderColor='whiteAlpha.300' justifyContent='center' alignContent='center' className="letterHolder" id={`${id}`} key={id}>
                <Text className="letter" fontWeight='semibold' fontSize={HeightLessThan450 ? "16px" : LessThan350 || HeightLessThan550 ? "22px" : '30px'} id={`letter${id}`}></Text>
            </Grid>
        )
    })




    return (
        <>
            <Flex justifyContent='center' alignItems='center' w={LessThan350 ? "100%" : '350px'} h={HeightMoreThan720 ? "470px" : "70%"} className="tryBoxOuterWrapper" >

                <Grid w='100%' h='90%' templateColumns='repeat(5,1fr)' templateRows='repeat(6,1fr)' gridGap='5px' textColor='white' className="tryBox" boxSizing="border-box" p='10px' >
                    {renderGrid}
                </Grid>
            </Flex>
        </>
    )
}


export default WordsTrySection