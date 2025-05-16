"use client";

import { menus } from "@/router";
import { Box, Container, Flex, HStack, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DesktopMenu() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Box
        display={{ base: "none", lg: "block" }}
        w="full"
        transition="all 0.3s ease"
        bg="white"
      >
        <Container maxW="container.xl">
          <Flex py={2} justify="center" align="center" gap={10}>
            <Flex
              mr={{ base: 0, lg: 4 }}
              justifyContent={"center"}
              alignItems={"center"}
              gap={2}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={54}
                height={54}
                style={{ objectFit: "cover" }}
              />
              <Text fontSize="25px" className="font-bold text-black">
                OM&apos;E
              </Text>
            </Flex>
            <HStack spacing={4}>
              {menus.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    textAlign={"end"}
                    width={"fit-content"}
                    key={item.href}
                    as={NextLink}
                    href={item.href}
                    fontSize="15px"
                    fontWeight="bold"
                    color={isActive ? "green.500" : "gray.800"}
                    position="relative"
                    display="flex"
                    alignItems="center"
                    gap={1}
                    px={2}
                    whiteSpace="nowrap"
                    _after={{
                      content: '""',
                      position: "absolute",
                      width: "0%",
                      height: "2px",
                      bottom: "-4px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: "green.500",
                      transition: "width 0.3s ease-in-out",
                    }}
                    _hover={{
                      color: "green.500",
                      _after: {
                        width: "100%",
                      },
                    }}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </HStack>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
