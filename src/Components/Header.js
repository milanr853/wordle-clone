import { Flex, Heading } from "@chakra-ui/react";

const Header = () => {
  // const randomNum = Math.floor(Math.random()*11)

  return (
    <>
      <Flex
        w="full"
        h="55px"
        borderBottom="1px"
        borderColor="whiteAlpha.300"
        justifyContent="center"
        className="header"
        alignItems="center"
      >
        <Heading
          color="white"
          className="title"
          fontFamily="merriweather"
          fontWeight="bold"
        >
          Wordle
        </Heading>
      </Flex>
    </>
  );
};

export default Header;
