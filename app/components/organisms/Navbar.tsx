"use client";

import { Box } from "@chakra-ui/react";
import DesktopMenu from "../molecules/DesktopMenu";
import MobileMenu from "../molecules/MobileMenu";

export default function Navbar() {
  return (
    <Box position="sticky" top={0} zIndex={60} bg="white">
    
      <Box borderBottom="1px" borderColor="white" boxShadow={"md"} bg="white">
        <Box display="flex" alignItems="center" px={4} py={2}>
          <Box ml="auto" display={{ base: "block", lg: "none" }}>
            <MobileMenu />
          </Box>
          <Box flex="1">
            <DesktopMenu />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
