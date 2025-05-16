"use client";

import {
  Button,
  Container,
  Heading,
  Text,
  VStack
} from "@chakra-ui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container maxW="container.xl" h="100vh">
      <VStack spacing={6} justify="center" h="full">
        <Heading size="4xl" color="blue.500">
          404
        </Heading>
        <Heading size="xl">Trang không tồn tại</Heading>
        <Text fontSize="lg" color="gray.600" textAlign="center">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </Text>
        <Button
          as={Link}
          href="/"
          colorScheme="blue"
          size="lg"
          rounded="full"
          px={8}
        >
          Về trang chủ
        </Button>
      </VStack>
    </Container>
  );
}
