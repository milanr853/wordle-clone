import { Box, Flex, Grid, GridItem, Heading, Text, useMediaQuery } from "@chakra-ui/react"
import { useMemo } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { LetterMatrixContext } from "../Context/LetterContext"
import React from "react"



const WordsTrySection = () => {

    const generateArray = () => {
        const arr = []
        for (let i = 0; i < 6; i++) {
            arr.push(Math.random())
        }
        return arr
    }



    // ___use Memo Hook___
    const GenerateArray = useMemo(() => generateArray(), [])



    // __Getting data from Context__
    const { getLetterMatrix } = useContext(LetterMatrixContext)



    // __Media Queries__
    const [LessThan350] = useMediaQuery('(max-width:350px)')
    const [HeightLessThan550] = useMediaQuery('(max-height:550px)')
    const [HeightLessThan450] = useMediaQuery('(max-height:450px)')
    const [HeightMoreThan720] = useMediaQuery('(min-height:720px)')



    // Mapping the list of clicked letters over the grid of boxes 
    useEffect(() => {
        getLetterMatrix.map((row, ID) => {
            const LettersOfRow = document.querySelectorAll(`.letterOfRow${ID}`)
            row.map((letter, id) => {
                const Letter = document.getElementById(`letter${ID}${id}`)
                Letter.innerText = letter
            })
        })
    }, [getLetterMatrix])



    // Rendering the grid of boxes
    const renderGrid = GenerateArray.map((elem, ID) => {

        return (
            <Grid templateColumns="repeat(5,1fr)" className="row" columnGap='5px' id={`row${ID}`} key={ID} >
                <Grid border='1px solid' borderColor='whiteAlpha.300' className={`letterHolderOfRow${ID}`} justifyContent='center' alignContent='center' id={`letterHolder${0}OfRow${ID}`}>
                    <Text className={`letter letterOfRow${ID}`} id={`letter${ID}0`} fontWeight='semibold' fontSize={HeightLessThan450 ? "16px" : LessThan350 || HeightLessThan550 ? "22px" : '30px'}></Text>
                </Grid>
                <Grid border='1px solid' borderColor='whiteAlpha.300' className={`letterHolderOfRow${ID}`} justifyContent='center' alignContent='center' id={`letterHolder${1}OfRow${ID}`}>
                    <Text className={`letter letterOfRow${ID}`} id={`letter${ID}1`} fontWeight='semibold' fontSize={HeightLessThan450 ? "16px" : LessThan350 || HeightLessThan550 ? "22px" : '30px'} ></Text>
                </Grid>
                <Grid border='1px solid' borderColor='whiteAlpha.300' className={`letterHolderOfRow${ID}`} justifyContent='center' alignContent='center' id={`letterHolder${2}OfRow${ID}`}>
                    <Text className={`letter letterOfRow${ID}`} id={`letter${ID}2`} fontWeight='semibold' fontSize={HeightLessThan450 ? "16px" : LessThan350 || HeightLessThan550 ? "22px" : '30px'} ></Text>
                </Grid>
                <Grid border='1px solid' borderColor='whiteAlpha.300' className={`letterHolderOfRow${ID}`} justifyContent='center' alignContent='center' id={`letterHolder${3}OfRow${ID}`}>
                    <Text className={`letter letterOfRow${ID}`} id={`letter${ID}3`} fontWeight='semibold' fontSize={HeightLessThan450 ? "16px" : LessThan350 || HeightLessThan550 ? "22px" : '30px'} ></Text>
                </Grid>
                <Grid border='1px solid' borderColor='whiteAlpha.300' className={`letterHolderOfRow${ID}`} justifyContent='center' alignContent='center' id={`letterHolder${4}OfRow${ID}`}>
                    <Text className={`letter letterOfRow${ID}`} id={`letter${ID}4`} fontWeight='semibold' fontSize={HeightLessThan450 ? "16px" : LessThan350 || HeightLessThan550 ? "22px" : '30px'} ></Text>
                </Grid>
            </Grid>
        )
    })




    return (
        <>
            <Flex justifyContent='center' alignItems='center' w={LessThan350 ? "100%" : '350px'} h={HeightMoreThan720 ? "470px" : "70%"} className="tryBoxOuterWrapper" >

                <Grid w='100%' h='90%' templateRows='repeat(6,1fr)' rowGap='5px' textColor='white' className="tryBox" boxSizing="border-box" p='10px' >
                    {renderGrid}
                </Grid>
            </Flex>
        </>
    )
}


export default WordsTrySection