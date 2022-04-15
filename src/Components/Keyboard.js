import { Box, Flex, Grid, GridItem, useMediaQuery } from "@chakra-ui/react"
import { LetterMatrixContext } from "../Context/LetterContext"
import { RowContext } from "../Context/RowContext"
import { useContext } from "react"
import { useEffect } from "react"
import React from "react"

import wordsBank from '../WordsBank'
import { useMemo } from "react"
import { useState } from "react"

import { ShortPopupContext } from "../Context/ShortLengthPopupContext"
import { WordNotPresentPopupContext } from "../Context/WordNotPresentContext"
import { WinPopupContext } from "../Context/WinPopupContext"
import { MessageContext } from "../Context/GameOverMessageContext"
import { DisplayContext } from '../Context/GameOverPopupDisplayContext'




const Keyboard = () => {
    // Getting All Words
    const wordStore = useMemo(() => wordsBank(), [])

    // ___MEDIA QUERIES___
    const [LessThan500] = useMediaQuery('(max-width:500px)')
    const [LessThan350] = useMediaQuery('(max-width:350px)')
    const [HeightMoreThan720] = useMediaQuery('(min-height:720px)')



    // ___GETTING DATA FROM CONTEXT API___
    // matrixContext
    const { getLetterMatrix, setLetterMatrix } = useContext(LetterMatrixContext)
    // rowContext
    const { rowNum, setRowNum } = useContext(RowContext)
    // length popup Context
    const { setShowShortPopup } = useContext(ShortPopupContext)
    // word not present popup Context
    const { setShowNoWordPopup } = useContext(WordNotPresentPopupContext)
    // Winning popup context
    const { setShowWinPopup } = useContext(WinPopupContext)
    // Game Over Data From context
    const { setGameOverData } = useContext(MessageContext)
    // Game Popup Display context
    const { setDisplay } = useContext(DisplayContext)
    // Game Over State
    const [GameContinue, setGameContinue] = useState(true)
    // Word Count State
    let [wordCount, setWordCount] = useState(0)



    // -------------------------------
    // ___FUNCTIONS___
    const fetchWord = () => {
        console.log("fetched")
        const ind = Math.floor(Math.random() * 2314)
        const word = wordStore[ind]
        return word.toUpperCase().split("")
    }
    const currentWordLetters = useMemo(() => fetchWord(), [])


    // Word Check Function
    const checkWordFromStore = (typedWord) => {
        if (wordStore.includes(typedWord.toLowerCase())) {
            return true
        }
        else return false
    }


    const compareThenColorUpdate = (typedLetters, rowIndex) => {
        // console.log(typedLetters, currentWordLetters)

        for (let i = 0; i < currentWordLetters.length; i++) {
            if (currentWordLetters.includes(typedLetters[i])) {
                if (i === currentWordLetters.indexOf(typedLetters[i])) {
                    document.getElementById(`letterHolder${i}OfRow${rowIndex}`).style.backgroundColor = "#538d4e"
                }
                else document.getElementById(`letterHolder${i}OfRow${rowIndex}`).style.backgroundColor = "#b59f3b"
            }
        }
    }


    const notPresentPopup = () => {
        setShowNoWordPopup(1)
        setTimeout(() => {
            setShowNoWordPopup(0)
        }, 1000);
    }


    const shortLengthPopup = () => {
        setShowShortPopup(1)
        setTimeout(() => {
            setShowShortPopup(0)
        }, 1000);
    }


    const gameOver = () => {
        setGameContinue(false)

        setShowWinPopup(1)
        setTimeout(() => {
            setShowWinPopup(0)
        }, 1000);


        setTimeout(() => {
            setDisplay("flex")
        }, 1050);
    }



    // -------------------------------
    // ___EVENT LISTNERS___
    const printLetter = (e) => {
        if (GameContinue) {
            if (getLetterMatrix[rowNum].length < 5) {
                const newMatrix = [...getLetterMatrix]
                newMatrix[rowNum] = [...newMatrix[rowNum], e.target.innerText.toUpperCase()]
                setLetterMatrix(newMatrix)
            }
        }
    }


    const proceedForFurtherWord = () => {
        if (GameContinue) {
            if (getLetterMatrix[rowNum].length === 5) {
                const typedWord = getLetterMatrix[rowNum].toString().replaceAll(",", "")
                const value = checkWordFromStore(typedWord)

                if (value) {
                    setWordCount(wordCount += 1)
                    document.querySelectorAll(`.letterHolderOfRow${rowNum}`).forEach((holder) => {
                        holder.style.backgroundColor = "#3a3a3c"
                        holder.style.borderColor = "#3a3a3c"
                    })
                    const rowIndex = rowNum
                    compareThenColorUpdate(getLetterMatrix[rowNum], rowIndex)
                    const newRowNum = rowNum + 1
                    setRowNum(newRowNum)
                }
                else {
                    // pop-up func
                    notPresentPopup()
                }


                const fetchedLetter = [...currentWordLetters].toString().replaceAll(",", "")
                console.log(fetchedLetter, typedWord)
                if (fetchedLetter === typedWord || wordCount === 6) {
                    // game-over function
                    gameOver()
                    setGameOverData({ message: fetchedLetter === typedWord ? "Cool!!! You did it" : "Sad :( You lose", count: wordCount })
                }
            }
            else {
                //pop-up for short-length
                shortLengthPopup()
            }
        }
    }


    const backspace = () => {
        if (GameContinue) {
            if (getLetterMatrix[rowNum].length > 0) {
                const Matrix = [...getLetterMatrix]
                Matrix[rowNum] = Matrix[rowNum].filter((elem, ind) => {
                    if (ind == (Matrix[rowNum].length - 1)) {
                        //do nothing
                    }
                    else return elem
                })
                const Letter = document.getElementById(`letter${rowNum}${Matrix[rowNum].length}`)
                Letter.innerText = ""
                setLetterMatrix(Matrix)
            }
        }
    }


    // ___For adding On Key Down || Keyboard Events in react___
    const handleKeyboard = (event) => {
        if (GameContinue) {
            if (event.keyCode >= 65 && event.keyCode <= 90) {
                if (getLetterMatrix[rowNum].length < 5) {
                    const newMatrix = [...getLetterMatrix]
                    newMatrix[rowNum] = [...newMatrix[rowNum], event.key.toUpperCase()]
                    setLetterMatrix(newMatrix)
                }
            }
            else if (event.keyCode === 13) {
                proceedForFurtherWord()
            }
            else if (event.keyCode === 8) {
                backspace()
            }
        }
    }


    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard)
        return () => document.removeEventListener("keydown", handleKeyboard)
    }, [handleKeyboard])


    return (
        <>
            <Grid w={LessThan500 ? "100%" : "500px"} h={HeightMoreThan720 ? "200px" : '30%'} boxSizing="border-box" p="8px" paddingTop="0" templateColumns='repeat(20,1fr)' templateRows='repeat(3,1fr)' columnGap='6px' rowGap='9px' textColor='white' fontWeight='semibold' fontSize={LessThan350 ? "10px" : '14px'} className="keyboard" userSelect='none' onKeyDown={handleKeyboard}>

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