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

import "./keyboard.css"




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
        const ind = Math.floor(Math.random() * 2314)
        const word = wordStore[ind]
        return word.toUpperCase()
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
        let typed = typedLetters
        let current = currentWordLetters

        //Recurssion for box
        function checking(typed, current, n, fixInd) {
            const key = document.getElementById(`key-${typedLetters[n]}`)
            const box = document.getElementById(`letterHolder${n}OfRow${rowIndex}`)
            if (n > 4) {
                return
            }

            if (typed[n] === current[n] ) {
                box.style.backgroundColor = "#538d4e"
                box.style.borderColor = "#538d4e"
                key.style.backgroundColor = "#538d4e"
                typed = typed.replace(typed[n], '.')
                current = current.replace(current[n], '.')
            }

            else if (current.includes(typed[n]) ) {
                box.style.backgroundColor = "#b59f3b"
                box.style.borderColor = "#b59f3b"
                key.style.backgroundColor = "#b59f3b"
                current = current.replace(current[current.indexOf(typed[n])], '.')
                typed = typed.replace(typed[n], '.')
            }

            else {
                box.style.backgroundColor = '#3a3a3c'
                box.style.borderColor = '#3a3a3c'
                key.style.backgroundColor = '#3a3a3c'
            }
            checking(typed, current, n + 1, fixInd)
        }
        checking(typed, current, 0, 0)
    }


    const shakeTiles = (rowNum) => {
        const rowElements = document.querySelectorAll(`.letterHolderOfRow${rowNum}`)
        rowElements.forEach(elem => {
            elem.classList.add('shake')
            setTimeout(() => {
                elem.classList.remove("shake")
            }, 500);
        })
    }


    const flipTiles = (rowNum) => {
        const rowElements = document.querySelectorAll(`.letterHolderOfRow${rowNum}`)
        setGameContinue(false)

        rowElements.forEach((elem, ind) => {
            setTimeout(() => {
                elem.classList.add('flip')
            }, (ind + 1) * 325);
            setTimeout(() => {
                elem.style.transform = "rotateX(0deg)"
            }, ((ind + 2) * 325));
        })

        setTimeout(() => {
            rowElements.forEach((elem, ind) => {
                elem.classList.remove('flip')
            })
            setGameContinue(true)
        }, 2100);
    }


    const notPresentPopup = () => {
        setShowNoWordPopup(1)
    }


    const shortLengthPopup = () => {
        setShowShortPopup(1)
    }


    const gameOver = () => {
        setTimeout(() => {
            setGameContinue(false)

            setShowWinPopup(1)
            setTimeout(() => {
                setShowWinPopup(0)
            }, 1500);

            setTimeout(() => {
                setDisplay("flex")
            }, 1550);
        }, 2200);
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
                    // Flip Tiles
                    flipTiles(rowNum)

                    //Box color change || Keyboard color change
                    const rowIndex = rowNum
                    compareThenColorUpdate(typedWord, rowIndex)

                    //move to next row
                    const newRowNum = rowNum + 1
                    setRowNum(newRowNum)
                }
                else {
                    // pop-up func
                    notPresentPopup()
                    shakeTiles(rowNum)
                }


                const fetchedLetter = [...currentWordLetters].toString().replaceAll(",", "")
                if (fetchedLetter === typedWord || wordCount === 6) {
                    // game-over function
                    gameOver()
                    setGameOverData({ message: fetchedLetter === typedWord ? "Cool!!! You did it" : "Sad :( You lose", count: wordCount,word:currentWordLetters })
                }
            }
            else {
                //pop-up for short-length
                shortLengthPopup()
                shakeTiles(rowNum)
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
            <Grid w={LessThan500 ? "100%" : "500px"} h={HeightMoreThan720 ? "200px" : '30%'} boxSizing="border-box" p="8px" paddingTop="0" templateColumns='repeat(20,1fr)' templateRows='repeat(3,1fr)' columnGap='6px' rowGap='9px' textColor='white' fontWeight='semibold' fontSize={LessThan350 ? "10px" : '14px'} className="keyboard" userSelect='none' onKeyDown={handleKeyboard} value={currentWordLetters}>

                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id='key-Q' onClick={printLetter}>Q</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id='key-W' onClick={printLetter}>W</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id='key-E' onClick={printLetter}>E</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id='key-R' onClick={printLetter}>R</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id='key-T' onClick={printLetter}>T</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id='key-Y' onClick={printLetter}>Y</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id='key-U' onClick={printLetter}>U</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id='key-I' onClick={printLetter}>I</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id='key-O' onClick={printLetter}>O</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id='key-P' onClick={printLetter}>P</Grid>

                <Grid></Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id="key-A" onClick={printLetter}>A</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id="key-S" onClick={printLetter}>S</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id="key-D" onClick={printLetter}>D</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id="key-F" onClick={printLetter}>F</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id="key-G" onClick={printLetter}>G</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id="key-H" onClick={printLetter}>H</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id="key-J" onClick={printLetter}>J</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id="key-K" onClick={printLetter}>K</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id="key-L" onClick={printLetter}>L</Grid>
                <Grid></Grid>

                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 3' justifyContent='center' alignContent='center' cursor='pointer' className="Enter" onClick={proceedForFurtherWord}>ENTER</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id="key-Z" onClick={printLetter}>Z</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id="key-X" onClick={printLetter}>X</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id="key-C" onClick={printLetter}>C</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id="key-V" onClick={printLetter}>V</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id="key-B" onClick={printLetter}>B</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id="key-N" onClick={printLetter}>N</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key" id="key-M" onClick={printLetter}>M</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 3' justifyContent='center' alignContent='center' cursor='pointer' className="Back" onClick={backspace}><i className="fas fa-backspace"></i></Grid>
            </Grid>
        </>
    )
}


export default React.memo(Keyboard)