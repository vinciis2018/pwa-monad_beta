import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  Box,
  Image,
  Text,
  Stack,
  Center,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { fewScreens } from "../../Actions/screenActions";
import { triggerPort } from "services/utils";
import {
  AiOutlineFundProjectionScreen,
  AiOutlineAim,
  AiOutlineArrowRight,
  AiOutlinePicture,
  AiOutlineArrowLeft,
} from "react-icons/ai";

// import { TopNftsContent } from "components/widgets";
// import { TimeFilter } from "components/filters";

import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import { Leaderboard } from "components/widgets";

export function Home(props: any) {
  const navigate = useNavigate();

  const [screensModal, setScreensModal] = React.useState(false);
  const [nftsModal, setNftModal] = React.useState(false);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const screenFew = useSelector((state: any) => state.screenList);
  const {
    loading: loadingScreensFew,
    error: errorScreensFew,
    screens: screensFew,
  } = screenFew;

  const dispatch = useDispatch<any>();
  React.useEffect(() => {
    if (userInfo && !userInfo.defaultWallet) {
      navigate("/welcome");
    }

    dispatch(fewScreens({}));
  }, [dispatch, navigate, userInfo]);

  const modalHandler = () => {
    setNftModal(false);
    setScreensModal(false);
  };

  const screensModalHandler = () => {
    setScreensModal(true);
    setNftModal(false);
  };

  const nftsModalHandler = () => {
    setScreensModal(false);
    setNftModal(true);
  };

  return (
    <Box px="2" pt="20" color="black.500">
      {/* Container */}
      <Box maxW="container.lg" mx="auto" pb="8">
        <Stack p="1" color="">
          {loadingScreensFew ? (
            <HLoading loading={loadingScreensFew} />
          ) : errorScreensFew ? (
            <MessageBox variant="danger">{errorScreensFew}</MessageBox>
          ) : (
            <Center width="100%">
              {screensFew?.length === 0 && (
                <MessageBox>No Screen Found</MessageBox>
              )}
              <Carousel showArrows autoPlay showThumbs={false}>
                {screensFew?.map((screen: any) => (
                  <Box
                    key={screen?._id}
                    as={RouterLink}
                    to={`/screen/${screen?._id}/${
                      screen?.image.split("/").slice(-1)[0]
                    }/${screen?.activeGameContract}`}
                    d="flex"
                    flexDir="column"
                    rounded="lg"
                    bg=""
                    shadow="card"
                    flexBasis="100%"
                  >
                    <Image
                      height="300px"
                      width="100%"
                      // shadow="card"
                      rounded="xl"
                      src={screen?.image}
                      onLoad={() =>
                        triggerPort(screen?.image.split("/").slice(-1)[0])
                      }
                    />
                    <Text fontSize="" className="legend">
                      {screen?.name}
                    </Text>
                  </Box>
                ))}
              </Carousel>
            </Center>
          )}
          <SimpleGrid pt="5" gap="2" columns={[2]}>
            <Box
              onClick={() => navigate(`/screens`)}
              py="10"
              rounded="lg"
              shadow="card"
              bgColor="green.100"
              align="center"
            >
              <AiOutlineFundProjectionScreen fontSize="50px" color="gray" />
              <Text p="2" fontSize="2xl" color="gray" fontWeight="600">
                Ad Screens
              </Text>
            </Box>
            <Box
              onClick={() => navigate(`/adverts`)}
              bgColor="teal.100"
              py="10"
              rounded="lg"
              shadow="card"
              align="center"
            >
              <AiOutlinePicture fontSize="50px" color="gray" />
              <Text p="2" fontSize="2xl" color="gray" fontWeight="600">
                Ad Campaigns
              </Text>
            </Box>
          </SimpleGrid>
          <Box p="" as={RouterLink} to={`/mapbox`}>
            <Flex
              px="10"
              py="10"
              rounded="lg"
              shadow="card"
              bgColor="violet.100"
              align="center"
              justify="center"
            >
              <AiOutlineAim fontSize="50px" color="gray" />
              <Text p="2" fontSize="40px" color="gray" fontWeight="600">
                Ad Explorer
              </Text>
            </Flex>
          </Box>
          {userInfo && (
            <Flex p="2" justify="space-between">
              <AiOutlineArrowLeft
                onClick={!screensModal ? screensModalHandler : nftsModalHandler}
                fontSize="20px"
              />
              <Text
                onClick={() =>
                  navigate(
                    `/userProfile/${userInfo._id}/${userInfo?.defaultWallet}`
                  )
                }
                align="center"
                fontSize="md"
                fontWeight="600"
              >
                Or you can simply upload an NFT here...
              </Text>
              <AiOutlineArrowRight
                onClick={!nftsModal ? nftsModalHandler : screensModalHandler}
                fontSize="20px"
              />
            </Flex>
          )}
          <hr />
          <Stack>
            <Flex align="center" justify="space-between">
              <Box
                m="1"
                color={screensModal ? "gray.700" : ""}
                bgColor={screensModal ? "gray.200" : "gray.100"}
                onClick={screensModalHandler}
                width="100%"
              >
                <Text fontSize="xs" p="2" align="center" fontWeight="600">
                  Screens
                </Text>
              </Box>
              <Box
                m="1"
                color={!screensModal && !nftsModal ? "gray.700" : ""}
                bgColor={!screensModal && !nftsModal ? "gray.200" : "gray.100"}
                onClick={modalHandler}
                width="100%"
              >
                <Text fontSize="xs" p="2" align="center" fontWeight="600">
                  Campaigns
                </Text>
              </Box>
              <Box
                m="1"
                color={nftsModal ? "gray.700" : ""}
                bgColor={nftsModal ? "gray.200" : "gray.100"}
                onClick={nftsModalHandler}
                width="100%"
              >
                <Text fontSize="xs" p="2" align="center" fontWeight="600">
                  Wall
                </Text>
              </Box>
            </Flex>
            {screensModal ? (
              <Leaderboard props="screen" />
            ) : nftsModal ? (
              <Stack>
                {/* <TimeFilter /> */}
                <Text>Coming Soon...</Text>
                <hr />
                {/* <TopNftsContent /> */}
              </Stack>
            ) : (
              <Leaderboard props="advert" />
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
