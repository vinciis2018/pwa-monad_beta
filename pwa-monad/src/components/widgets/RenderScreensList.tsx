import { SimpleGrid, Flex } from "@chakra-ui/react";
import { Screen } from "components/common";
// import { EmptyState } from "components/ui";
import { motion } from "framer-motion";

interface Props {
  screens: any;
}

export function RenderScreensList({ screens }: Props) {
  const MotionFlex = motion(Flex);

  return (
    <>
      {screens?.length !== 0 && (
        <SimpleGrid w="100%" minW="0" minH="0" gap="8" columns={[1, 2]}>
          {screens?.map((screen: Record<string, any>) => (
            <MotionFlex
              key={screen._id}
              flexDir="column"
              w="100%"
              role="group"
              rounded="md"
              shadow="card"
              whileHover={{
                translateY: -3,
              }}
              pos="relative"
              zIndex="1"
            >
              <Screen screen={screen} />
            </MotionFlex>
          ))}
        </SimpleGrid>
      )}

      {/* {nfts?.length === 0 && <EmptyState minH={{ base: "300px", md: "600px" }} />} */}
    </>
  );
}
