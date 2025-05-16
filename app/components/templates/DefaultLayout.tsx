import { Box } from "@chakra-ui/react";
import React from "react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box maxW={"7xl"} mx={"auto"}  className="md:px-2">
      {children}
    </Box>
  );
}
