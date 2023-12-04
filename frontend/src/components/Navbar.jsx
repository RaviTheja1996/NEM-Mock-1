import React from "react";
import { HStack, Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <HStack
      spacing={6}
      justifyContent={"center"}
      height="3rem"
      bgColor={"lightgreen"}
      color={"black"}
    >
      <ChakraLink as={ReactRouterLink} to="/">
        Home
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to="/contacts">
        Contact Management
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to="/appointment">
        Appointment Scheduling
      </ChakraLink>
    </HStack>
  );
};

export default Navbar;
