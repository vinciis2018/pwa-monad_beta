import { SimpleGrid, Flex } from "@chakra-ui/react";
import { Advert } from "components/common";
// import { EmptyState } from "components/ui";
import { motion } from "framer-motion";

interface Props {
  videos: any;
}

export function RenderAdvertsList({ videos }: Props) {
  const MotionFlex = motion(Flex);
  return (
    <>
      {videos?.length !== 0 && (
        <SimpleGrid w="100%" minW="0" minH="0" gap="8" columns={[1, 2]}>
          {videos?.map((video: Record<string, any>) => (
            <MotionFlex
              key={video._id}
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
              <Advert video={video} />
            </MotionFlex>
          ))}
        </SimpleGrid>
      )}

      {/* {nfts?.length === 0 && <EmptyState minH={{ base: "300px", md: "600px" }} />} */}
    </>
  );
}
