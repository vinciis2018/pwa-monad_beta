import { Box, Center, Stack, Text } from "@chakra-ui/react";
// import { Leaderboard } from "components/widgets";

export function Page404() {
  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Text p="4" textAlign="center" fontSize="lg" color="red.500">
            404! <strong>Page not found!</strong>
          </Text>
          {/* <Leaderboard props="advert" /> */}
        </Stack>
      </Center>
    </Box>
  );
}
