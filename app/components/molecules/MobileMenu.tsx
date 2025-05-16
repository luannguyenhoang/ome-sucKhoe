"use client";

import { menus } from "@/router";
import {
  Accordion,
  AccordionItem,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Image,
  Link,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Menu } from "lucide-react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();

  return (
    <Box display={{ base: "block", lg: "none" }}>
      <IconButton
        aria-label="Open menu"
        icon={<Menu size={24} />}
        variant="ghost"
        onClick={onOpen}
      />

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader
            borderBottomWidth="1px"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={55}
              height={55}
              style={{ objectFit: "cover" }}
            />
            <Text fontSize="2xl" fontWeight="bold">
              OM&apos;E
            </Text>
          </DrawerHeader>

          <DrawerBody>
            <Accordion allowMultiple>
              {menus.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <AccordionItem key={item.href} border="none">
                    <Link
                      as={NextLink}
                      href={item.href}
                      color={isActive ? "green.500" : "black"}
                      display="block"
                      py={4}
                      fontWeight="500"
                      _hover={{ color: "green.500" }}
                      onClick={onClose}
                    >
                      {item.title}
                    </Link>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
