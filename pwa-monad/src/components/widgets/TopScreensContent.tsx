import useInfiniteScroll from "react-infinite-scroll-hook";
import { useEffect, useState } from "react";
import { StringParam, withQueryParams } from "use-query-params";
// api
import { useScreens } from "hooks";
// ui
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  // Button,
  Center,
} from "@chakra-ui/react";
import { RenderScreensList } from "components/widgets";
import HLoading from "components/atoms/HLoading";
// import { refreshPage } from "services/utils";

const TopScreensContent = ({ query }: any) => {
  /*  */
  const { data: screens, isLoading, isError } = useScreens();

  /* Pagination */
  const [screensView, setScreensView] = useState(screens?.slice?.(0, 12));
  const [page, setPage] = useState(0);
  /* Get 12 more every scroll */
  useEffect(() => {
    setScreensView(screens?.slice?.(0, page === 0 ? 12 : page * 12));
  }, [screens, page]);
  useEffect(() => {
    setPage(0);
  }, []);

  const hasMore = screensView?.length !== screens?.length;

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasMore,
    onLoadMore: () => {
      setPage((page) => page + 1);
    },
    disabled: isError || isLoading,
    rootMargin: "0px 0px 0px 0px",
  });

  /* on Error */
  if (isError) {
    return (
      <Center>
        <Alert
          status="error"
          variant="left-accent"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Oops! Something went wrong
          </AlertTitle>
          <AlertDescription maxWidth="sm" mb="2">
            We are working to fix it.
          </AlertDescription>
          {/* <Button onClick={refreshPage}>Try again</Button> */}
        </Alert>
      </Center>
    );
  }
  return (
    <>
      {isLoading && <HLoading loading={isLoading} />}
      {/* Loading | Nfts */}
      {!isLoading && <RenderScreensList screens={screensView} />}
      {!isLoading && hasMore && <div ref={sentryRef} />}
    </>
  );
};

export default withQueryParams(
  {
    t: StringParam,
  },
  TopScreensContent
);
