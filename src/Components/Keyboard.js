import { Box, Flex, Grid, GridItem, useMediaQuery } from "@chakra-ui/react"


const Keyboard = () => {
const [LessThan500] = useMediaQuery('(max-width:500px)')
const [LessThan350] = useMediaQuery('(max-width:350px)')
const [HeightMoreThan720] = useMediaQuery('(min-height:720px)')

    return (
        <>
            <Grid w={LessThan500?"100%":"500px"} h={HeightMoreThan720?"200px":'30%'} boxSizing="border-box" p="8px" paddingTop="0" templateColumns='repeat(20,1fr)' templateRows='repeat(3,1fr)' columnGap='6px' rowGap='9px' textColor='white' fontWeight='semibold' fontSize={LessThan350?"10px":'14px'} className="keyboard" >

                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">Q</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">W</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">E</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">R</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">T</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">Y</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">U</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">I</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">O</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">P</Grid>

                <Grid></Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">A</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">S</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">D</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">F</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">G</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">H</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">J</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">K</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">L</Grid>
                <Grid></Grid>

                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 3' justifyContent='center' alignContent='center' cursor='pointer' className="Enter">ENTER</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">Z</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">X</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">C</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">V</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">B</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">N</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 2' justifyContent='center' alignContent='center' cursor='pointer' className="key">M</Grid>
                <Grid bgColor='whiteAlpha.600' borderRadius='4px' column='span 3' justifyContent='center' alignContent='center' cursor='pointer' className="Back">#</Grid>
            </Grid>
        </>
    )
}


export default Keyboard