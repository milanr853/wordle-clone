import { Box, Flex, Grid, GridItem, useMediaQuery } from "@chakra-ui/react"
import { LetterArrayContext, BoolContext } from "../Context/LetterContext"
import { useContext } from "react"
import { useState } from "react"
import { useEffect } from "react"


const Keyboard = () => {
    // ___MEDIA QUERIES___
    const [LessThan500] = useMediaQuery('(max-width:500px)')
    const [LessThan350] = useMediaQuery('(max-width:350px)')
    const [HeightMoreThan720] = useMediaQuery('(min-height:720px)')


    // ___GETTING DATA FROM CONTEXT API___
    // Getting the array of letters clicked from the Context
    const { getLetterArray, setLetterArray } = useContext(LetterArrayContext)
    // Getting the boolean value from the Context
    const { bool, setBool } = useContext(BoolContext)


    // ___USE EFFECT___
    useEffect(() => {
        if (getLetterArray.length > 0 && getLetterArray.length % 5 === 0) {
            setBool(false)
        }
        else{
            setBool(true)
        }
    }, [getLetterArray])



    // _____EVENT LISTNERS_____
    // Pushing elements using useState hook in an array
    const printLetter = (e) => {
        if (bool) {
            if (getLetterArray.length < 30) {
                setLetterArray([...getLetterArray, e.target.innerText])
            }
        }
    }



    const proceedForFurtherWord = (e) => {
        setBool(true)
    }




    const backspace = () => {
        if (getLetterArray.length !== 0) {
            const filteredArray = getLetterArray.filter((elem,id) => {
                if (id != [getLetterArray.length - 1]) {
                    return elem
                }
            })
            setLetterArray(filteredArray)
            document.getElementById(`letter${getLetterArray.length - 1}`).innerText = ""
            document.getElementById(`${getLetterArray.length - 1}`).style.borderColor = 'rgba(255, 255, 255, 0.16)'
        }
    }




    return (
        <>
            <Grid w={LessThan500 ? "100%" : "500px"} h={HeightMoreThan720 ? "200px" : '30%'} boxSizing="border-box" p="8px" paddingTop="0" templateColumns='repeat(20,1fr)' templateRows='repeat(3,1fr)' columnGap='6px' rowGap='9px' textColor='white' fontWeight='semibold' fontSize={LessThan350 ? "10px" : '14px'} className="keyboard" userSelect='none'>

                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>Q</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>W</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>E</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>R</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>T</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>Y</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>U</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>I</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>O</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>P</Grid>

                <Grid></Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>A</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>S</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>D</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>F</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>G</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>H</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>J</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>K</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>L</Grid>
                <Grid></Grid>

                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 3' justifyContent='center' alignContent='center' cursor='pointer' className="Enter" onClick={proceedForFurtherWord}>ENTER</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>Z</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>X</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>C</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>V</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>B</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>N</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" onClick={printLetter}>M</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 3' justifyContent='center' alignContent='center' cursor='pointer' className="Back" onClick={backspace}><i className="fas fa-backspace"></i></Grid>
            </Grid>
        </>
    )
}


export default Keyboard