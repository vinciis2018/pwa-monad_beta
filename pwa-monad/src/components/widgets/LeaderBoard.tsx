import { Box } from "@chakra-ui/react";
import { TopScreensContent, TopAdvertsContent } from "components/widgets";

export function Leaderboard({ props }: any) {
  return (
    <Box color="blue.500" bg="gray.50" rounded="sm" p="2">
      {props === "screen" && <TopScreensContent />}
      {props === "advert" && <TopAdvertsContent />}
    </Box>
  );
}
