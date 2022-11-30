import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { transferTokens } from "../../Actions/walletActions";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Tooltip,
  Image,
  FormControl,
  Select,
  FormLabel,
  Input,
  Flex,
  Stack,
  SimpleGrid,
  Text,
  Button,
  IconButton,
} from "@chakra-ui/react";

// import { detailsUser } from "../../Actions/userActions";

// import { WALLET_EDIT_RESET } from "../../Constants/walletConstants";
// import { TOKENS_TRANSFER_RESET } from "../../Constants/walletConstants";

import { CopyableAddress } from "components/ui";

import { AiOutlineSetting } from "react-icons/ai";

// import { ArweaveIcon, KoiiIcon, RatIcon } from "components/icons";
import { useWallet } from "components/contexts";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
// import {
//   getBalances,
//   getExhangeRate,
//   getHistoricalData,
//   getLastTransaction,
//   getPrice,
// } from "api/sdk";

export function Wallet(props: any) {
  const walletAddAr = window.location.href.split("/").slice()[4];
  const navigate = useNavigate();

  const [walletBalance, setWalletBalance] = useState<any>({
    ar: 0,
    koii: 0,
    ratData: 0,
  });
  const [walletPrice, setWalletPrice] = useState<any>();
  const [exchangeValue, setExchangeValue] = useState<any>("1");
  const [lastTxn, setLastTxn] = useState<any>();
  const [tokenHis, setTokenHis] = useState<any>();

  const [keyModal, setKeyModal] = useState<any>(false);
  const [toWallet, setToWallet] = useState<any>("");
  const [quantity, setQuantity] = useState<any>("");
  const [ticker, setTicker] = useState<any>("AR");

  const [walletId, setWalletId] = useState<any>("");
  const [walletName, setWalletName] = useState<any>("");

  const [anftModalVisible, setAnftModalVisible] = useState<any>(false);
  const [transferModalVisible, setTransferModalVisible] = useState<any>(false);
  const [editWalletModalVisible, setEditWalletModalVisible] =
    useState<any>(false);
  const [openADUModal, setOpenADUModal] = useState<any>(false);

  const [txnDetailModal, setTxnDetailModal] = useState<any>(false);

  const [allTrxn, setAllTrxn] = useState<any>([]);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { loading: loadingUser, error: errorUser, userInfo } = userSignin;

  const walletEdit = useSelector((state: any) => state.walletEdit);
  const {
    loading: loadingWalletEdit,
    error: errorWalletEdit,
    success: successWalletEdit,
  } = walletEdit;

  // const tokensTransfer = useSelector((state: any) => state.tokensTransfer);
  // const {
  //   loading: loadingTokensTransfer,
  //   error: errorTokensTransfer,
  //   success: successTokensTransfer,
  // } = tokensTransfer;

  /* Finnie */
  // const {
  //   state: { connectFinnie, isLoading: finnieLoading, walletBalance, isFinnieConnected, walletPrice, xchangeRate, lastTxn, tokenHis },
  // } = useFinnie();
  const { getArweavePublicAddress, hasEncryptedData, isUnlocked, isLoading } =
    useWallet();

  const dispatch = useDispatch();
  useEffect(() => {
    const walletAdd = getArweavePublicAddress();
    if (!walletAdd) {
      navigate("/login");
    }

    // if (!isLoading) {
    //   getBalances(walletAdd).then((res: any) => {
    //     setWalletBalance(res);
    //   });
    //   getPrice(walletAdd).then((res) => {
    //     setWalletPrice(res);
    //   });
    //   getExhangeRate({
    //     to: "INR",
    //     from: "USD",
    //     quant: "1",
    //   }).then((res: any) => {
    //     setExchangeValue(res);
    //   });
    //   getLastTransaction({
    //     walletAddress: walletAdd,
    //   }).then((res: any) => {
    //     setLastTxn(res);
    //     setAllTrxn(res?.debDetail.concat(res?.credDetail));
    //   });
    //   getHistoricalData({
    //     ticker: "AR",
    //   }).then((res: any) => {
    //     setTokenHis(res);
    //   });
    // }

    // if (userInfo) {
    //   setWalletId(walletAdd);
    //   dispatch(detailsUser({ userId: userInfo._id, walletAddress: walletAdd }));
    // } else {
    //   navigate(redirect);
    // }

    // if (walletAdd === walletAddAr) {
    //   navigate(`/wallet/${walletAdd}`);
    // }

    // if (successWalletEdit) {
    //   dispatch({
    //     type: WALLET_EDIT_RESET,
    //   });

    //   window.alert("Wallet edited, please login again to activate the changes");
    // }

    // if (successTokensTransfer) {
    //   setToWallet("");
    //   setQuantity("");
    //   setTicker("");
    //   dispatch({
    //     type: TOKENS_TRANSFER_RESET,
    //   });
    //   window.alert(
    //     `${quantity} ${ticker} transferred to ${toWallet} successfully!`
    //   );
    //   setTransferModalVisible(false);
    // }
  }, [dispatch, getArweavePublicAddress, navigate]);

  const submitTransferHandler = () => {
    // dispatch(
    //   transferTokens({
    //     walletName,
    //     toWallet,
    //     quantity,
    //     ticker,
    //   })
    // );
  };

  const transferModalHandler = () => {
    hasEncryptedData()
      .then((res) => {
        if (res) {
          setEditWalletModalVisible(false);
          setAnftModalVisible(false);
          setTransferModalVisible(!transferModalVisible);
        }
      })
      .catch((e) => {
        navigate("/login");
        console.log(e);
      });
  };

  const openADUModalHandler = () => {
    setOpenADUModal(!openADUModal);
  };

  return (
    <Box px="2" pt="20">
      {loadingUser ? (
        <HLoading loading={loadingUser} />
      ) : errorUser ? (
        <MessageBox message={errorUser}></MessageBox>
      ) : (
        <Box maxW="container.lg" mx="auto" pb="8" color="black">
          <Stack p="2">
            <Stack align="center" p="2" direction="row" justify="space-between">
              {/* <ArrowBackIcon onClick={() => navigate(-1)} /> */}
              <Text fontWeight="600">Wallet Details</Text>
              <IconButton
                as={RouterLink}
                to={`/setting`}
                bg="none"
                icon={<AiOutlineSetting size="20px" color="black" />}
                aria-label="Edit Screen Details"
              ></IconButton>
            </Stack>
            {!isLoading ? (
              <Stack>
                <Box p="4" rounded="lg" shadow="card">
                  <Flex align="center" justify="space-between">
                    <Text fontWeight="600" fontSize="sm">
                      Wallet Address:{" "}
                    </Text>
                    <CopyableAddress
                      address={props?.match?.params?.id}
                      w="100%"
                      maxW="200px"
                    />
                  </Flex>
                  <Flex align="center" justify="space-between">
                    <Text fontWeight="600" fontSize="sm">
                      AD-Credits:{" "}
                    </Text>
                    <Flex align="center" justify="space-between">
                      <Text p="2" fontWeight="600" fontSize="sm">
                        ₹{" "}
                        {walletBalance?.ar +
                          walletBalance?.koii +
                          walletBalance?.ratData || 0}
                      </Text>
                      {/* <InfoIcon
                          onClick={openADUModalHandler}
                          fontSize="15px"
                          color="green.500"
                        /> */}
                    </Flex>
                  </Flex>
                  {openADUModal && (
                    <Box p="4">
                      <hr />
                      <Text p="2" align="center" fontSize="sm" fontWeight="600">
                        AD Credits are our in-app credits needed for interaction
                        with our platform.
                      </Text>
                      <Text
                        px="1"
                        align="center"
                        fontSize="xs"
                        fontWeight="600"
                      >
                        Each Ad Credit is the sum of your AR tokens, KOII
                        tokens, MONA tokens.
                      </Text>
                      <Text
                        px="1"
                        align="center"
                        fontSize="xs"
                        fontWeight="600"
                      >
                        For more information, please refer our white paper or
                        contact us...
                      </Text>
                    </Box>
                  )}
                </Box>
                {transferModalVisible ? (
                  <Box p="4" shadow="card" rounded="lg">
                    <FormControl id="toWallet">
                      <FormLabel fontSize="xs">Recipient Wallet</FormLabel>
                      <Stack direction="row" align="center">
                        <Input
                          id="toWallet"
                          onChange={(e) => setToWallet(e.target.value)}
                          placeholder={toWallet}
                          value={toWallet}
                          type="text"
                        />
                      </Stack>
                    </FormControl>
                    <FormControl id="quantity">
                      <FormLabel fontSize="xs">Transfer Value</FormLabel>
                      <Stack direction="row" align="center">
                        <Input
                          id="quantity"
                          onChange={(e) => setQuantity(e.target.value)}
                          placeholder={quantity}
                          value={quantity}
                          type="number"
                        />
                      </Stack>
                    </FormControl>
                    <FormControl id="ticker">
                      <FormLabel fontSize="xs">Tranfer Token</FormLabel>
                      <Stack direction="row" align="center">
                        <Select
                          id="ticker"
                          value={ticker}
                          onChange={(e) => setTicker(e.target.value)}
                        >
                          <option key={0} value="rat">
                            RAT
                          </option>
                          <option key={1} value="KOII">
                            KOII
                          </option>
                          <option key={2} value="AR">
                            AR
                          </option>
                        </Select>
                      </Stack>
                    </FormControl>
                    {/* {loadingTokensTransfer && (
                      <HLoading loading={loadingTokensTransfer} />
                    )}
                    {errorTokensTransfer && (
                      <MessageBox variant="danger">
                        {errorTokensTransfer}
                      </MessageBox>
                    )} */}

                    <SimpleGrid p="2" gap="2" columns={[2]}>
                      <Button
                        bgGradient="linear-gradient(to left, #BC78EC, #7833B6)"
                        onClick={submitTransferHandler}
                      >
                        Submit Transfer
                      </Button>
                      <Button
                        variant="outline"
                        color="violet.500"
                        onClick={() => setTransferModalVisible(false)}
                      >
                        Cancel Transfer
                      </Button>
                    </SimpleGrid>
                  </Box>
                ) : (
                  <SimpleGrid
                    bgGradient="linear-gradient(to bottom, #BC78EC20, #7833B660)"
                    p="4"
                    rounded="lg"
                    shadow="card"
                    columns={[2]}
                    gap="0"
                  >
                    <Box
                      onClick={transferModalHandler}
                      align="center"
                      borderRight="1px"
                      borderColor="gray.200"
                    >
                      <Text p="2" fontWeight="600" fontSize="sm">
                        Send Tokens
                      </Text>
                      {/* <BsArrowUpRightCircle /> */}
                    </Box>
                    <Box
                      onClick={() => navigate(`/payments`)}
                      align="center"
                      borderLeft="1px"
                      borderColor="gray.200"
                    >
                      <Text p="2" fontWeight="600" fontSize="sm">
                        Add Tokens
                      </Text>
                      {/* <BiWallet /> */}
                    </Box>
                  </SimpleGrid>
                )}
                <Box p="4" shadow="card" rounded="lg">
                  <Flex align="center" justify="space-between">
                    <Text p="2" fontWeight="600" fontSize="sm">
                      Tokens
                    </Text>
                    <Text p="2" fontWeight="600" fontSize="xs">
                      see more
                    </Text>
                  </Flex>
                  <SimpleGrid gap="4" columns={[2, 3]}>
                    <Box p="4" shadow="card" rounded="lg" align="center">
                      {/* <ArweaveIcon m="2" color="black" boxSize="30px" /> */}
                      <Text fontWeight="600" fontSize="sm">
                        {walletBalance?.ar?.toFixed?.(5) || 0}
                      </Text>
                      <Flex align="center" justify="space-between">
                        <Text fontWeight="600" fontSize="xs">
                          ̥₹{" "}
                          {(
                            walletBalance?.ar *
                            walletPrice?.arPrice *
                            exchangeValue
                          ).toFixed?.(5) || 0}
                        </Text>
                        <Text fontWeight="600" fontSize="xs">
                          ${" "}
                          {(walletBalance?.ar * walletPrice?.arPrice).toFixed?.(
                            5
                          ) || 0}
                        </Text>
                      </Flex>
                    </Box>
                    <Box p="4" shadow="card" rounded="lg" align="center">
                      {/* <KoiiIcon m="2" color="black" boxSize="30px" /> */}
                      <Text fontWeight="600" fontSize="sm">
                        {walletBalance?.koii?.toFixed?.(5) || 0}
                      </Text>
                      <Flex align="center" justify="space-between">
                        {/* <Text fontWeight="600" fontSize="xs">̥₹ {((walletBalance?.koii) * (walletPrice?.koiiPrice) * exchangeValue).toFixed?.(3)} *</Text> */}
                        {/* <Text fontWeight="600" fontSize="xs">$ {((walletBalance?.koii) * (walletPrice?.koiiPrice)).toFixed?.(3)} *</Text> */}
                      </Flex>
                    </Box>

                    <Box p="4" shadow="card" rounded="lg" align="center">
                      {/* <RatIcon m="2" color="black" boxSize="30px" /> */}
                      <Text fontWeight="600" fontSize="sm">
                        {walletBalance?.ratData?.toFixed?.(3) || 0}
                      </Text>
                      <Flex align="center" justify="space-between">
                        {/* <Text fontWeight="600" fontSize="xs">̥₹ {((walletBalance?.ratData) * (walletPrice?.ratPrice)).toFixed?.(3)} *</Text> */}
                        {/* <Text fontWeight="600" fontSize="xs">$ {((walletBalance?.ratData)/exchangeValue).toFixed?.(3)} *</Text> */}
                      </Flex>
                    </Box>
                  </SimpleGrid>
                </Box>
                <Box p="2" shadow="" rounded="">
                  <Flex align="center" justify="space-between">
                    <Text p="2" fontWeight="600" fontSize="sm">
                      Transactions
                    </Text>
                    <Text p="2" fontWeight="600" fontSize="xs">
                      {txnDetailModal ? "see less" : "see more"}
                      {/* <IconButton
                          onClick={() => setTxnDetailModal(!txnDetailModal)}
                          bg="none"
                          icon={
                            txnDetailModal ? (
                              <BiChevronUp size="20px" color="black" />
                            ) : (
                              <BiChevronDown size="20px" color="black" />
                            )
                          }
                          aria-label="Edit Advert Details"
                        ></IconButton> */}
                    </Text>
                  </Flex>
                  {lastTxn?.lastTxn &&
                    lastTxn?.txnDetail?.transactions &&
                    !txnDetailModal && (
                      <Box
                        p="4"
                        my="2"
                        shadow="card"
                        rounded="lg"
                        align="center"
                      >
                        <Text fontWeight="600" fontSize="xs">
                          {lastTxn?.txnDetail?.transactions?.edges?.[0]?.node
                            ?.block?.timestamp
                            ? new Date(
                                lastTxn?.txnDetail?.transactions?.edges?.[0]
                                  ?.node?.block?.timestamp * 1000
                              )
                                .toString()
                                ?.split("GMT+0530")
                            : "Please wait for transaction to be written on chain, don't worry, it is confirmed. See below..."}
                        </Text>
                        <Box align="left">
                          <Flex align="center" justify="space-between">
                            {lastTxn?.txnDetail?.transactions?.edges?.[0]?.node
                              ?.tags.length === 0 && (
                              <Flex>
                                {/* <ArweaveIcon
                                    m="2"
                                    p="1"
                                    bgColor="gray.500"
                                    color="white"
                                    rounded="2xl"
                                    boxSize="30px"
                                  /> */}
                              </Flex>
                            )}
                            {lastTxn?.txnDetail?.transactions?.edges?.[0]?.node
                              ?.tags.length === 4 && (
                              <Flex>
                                {/* <KoiiIcon
                                    m="2"
                                    p="1"
                                    bgColor="blue.300"
                                    color="white"
                                    rounded="2xl"
                                    boxSize="30px"
                                  /> */}
                                *
                              </Flex>
                            )}
                            {lastTxn?.txnDetail?.transactions?.edges?.[0]?.node
                              ?.tags.length === 8 && (
                              <Flex>
                                {/* <KoiiIcon
                                    m="2"
                                    p="1"
                                    bgColor="blue.300"
                                    color="white"
                                    rounded="2xl"
                                    boxSize="30px"
                                  /> */}
                                *
                              </Flex>
                            )}
                            {lastTxn?.txnDetail?.transactions?.edges?.[0]?.node
                              ?.tags.length === 6 && (
                              <Flex>
                                {/* <RatIcon
                                    m="2"
                                    color="violet.900"
                                    rounded="2xl"
                                    boxSize="30px"
                                  /> */}
                              </Flex>
                            )}
                            <Text fontWeight="600" fontSize="sm">
                              {lastTxn?.txnDetail?.transactions?.edges?.[0]
                                ?.node.tags.length > 0
                                ? "SmartContract Action"
                                : "AR Transfer"}
                            </Text>
                            <Flex align="center" justify="space-between">
                              <Text p="2" fontWeight="600" fontSize="xs">
                                Cost:{" "}
                                {lastTxn?.txnDetail?.transactions?.edges?.[0]
                                  ? (
                                      Number(
                                        lastTxn?.txnDetail?.transactions
                                          ?.edges?.[0]?.node?.quantity?.ar
                                      ) +
                                      Number(
                                        lastTxn?.txnDetail?.transactions
                                          ?.edges?.[0]?.node?.fee?.ar
                                      )
                                    )?.toFixed?.(3)
                                  : ""}{" "}
                                AD Credits
                              </Text>
                              {/* {lastTxn?.txnDetail?.transactions?.edges?.[0]
                                  ?.node?.recipient === walletAddAr ? (
                                  <BsArrowDownLeft color="green" size="15px" />
                                ) : (
                                  <BsArrowUpRight color="red" size="15px" />
                                )} */}
                            </Flex>
                          </Flex>
                          {lastTxn?.txnDetail?.transactions?.edges?.[0]?.node
                            ?.recipient === walletAddAr && (
                            <Stack>
                              <hr />
                              <Text fontWeight="600" fontSize="xs">
                                From:{" "}
                                {
                                  lastTxn?.txnDetail?.transactions?.edges?.[0]
                                    ?.node?.owner?.address
                                }
                              </Text>
                              <Text fontWeight="" fontSize="xs">
                                Amount:{" "}
                                {
                                  lastTxn?.txnDetail?.transactions?.edges?.[0]
                                    ?.node?.quantity?.ar
                                }{" "}
                                AD Credits
                              </Text>
                            </Stack>
                          )}
                          <Stack>
                            <hr />
                            <Text fontWeight="600" fontSize="xs">
                              {lastTxn?.txnDetail?.transactions?.edges?.[0]
                                ?.node?.recipient
                                ? `To: ${lastTxn?.txnDetail?.transactions?.edges?.[0]?.node?.recipient}`
                                : ""}
                            </Text>
                            <Text fontWeight="" fontSize="xs">
                              Amount:{" "}
                              {lastTxn?.txnDetail?.transactions?.edges?.[0]
                                ?.node?.recipient === ""
                                ? lastTxn?.txnDetail?.transactions?.edges?.[0]
                                    ?.node?.fee?.ar
                                : lastTxn?.txnDetail?.transactions?.edges?.[0]
                                    ?.node?.quantity?.ar}{" "}
                              AD Credits
                            </Text>
                          </Stack>
                          <Text
                            onClick={() =>
                              window.open(
                                `https://viewblock.io/arweave/tx/${lastTxn?.txnDetail?.transactions?.edges?.[0]?.node?.id}`
                              )
                            }
                            fontWeight="600"
                            fontSize="xs"
                          >
                            Tx:{" "}
                            {
                              lastTxn?.txnDetail?.transactions?.edges?.[0]?.node
                                ?.id
                            }
                          </Text>
                          <Text fontWeight="600" fontSize="xs">
                            Fee:{" "}
                            {
                              lastTxn?.txnDetail?.transactions?.edges?.[0]?.node
                                ?.fee?.ar
                            }{" "}
                            AD Credits
                          </Text>
                        </Box>
                      </Box>
                    )}
                  <hr />

                  {allTrxn
                    ?.sort((a: any, b: any) => {
                      return (
                        b?.node?.block?.timestamp - a?.node?.block?.timestamp
                      );
                    })
                    ?.map((txn: any) => {
                      return (
                        <Box
                          my="2"
                          bgColor={
                            txn?.node?.block?.timestamp
                              ? "violet.50"
                              : "violet.100"
                          }
                          onClick={() => setTxnDetailModal(!txnDetailModal)}
                          key={txn?.node?.id}
                          p="4"
                          shadow="card"
                          rounded="lg"
                          align="center"
                        >
                          <Text fontWeight="600" fontSize="xs" color="gray.500">
                            {txn?.node?.block?.timestamp
                              ? new Date(txn?.node?.block?.timestamp * 1000)
                                  .toString()
                                  ?.split("GMT+0530")
                              : "Please wait for a while"}
                          </Text>
                          <Box align="left">
                            <Flex align="center" justify="space-between">
                              {txn?.node?.tags.length === 0 && (
                                <Flex>
                                  {/* <ArweaveIcon
                                      m="2"
                                      p="1"
                                      bgColor="gray.500"
                                      color="white"
                                      rounded="2xl"
                                      boxSize="30px"
                                    /> */}
                                </Flex>
                              )}
                              {txn?.node?.tags.length === 4 && (
                                <Flex>
                                  {/* <KoiiIcon
                                      m="2"
                                      p="1"
                                      bgColor="blue.300"
                                      color="white"
                                      rounded="2xl"
                                      boxSize="30px"
                                    /> */}
                                  *
                                </Flex>
                              )}
                              {txn?.node?.tags.length === 8 && (
                                <Flex>
                                  {/* <KoiiIcon
                                      m="2"
                                      p="1"
                                      bgColor="blue.300"
                                      color="white"
                                      rounded="2xl"
                                      boxSize="30px"
                                    /> */}
                                  *
                                </Flex>
                              )}
                              {txn?.node?.tags.length === 6 && (
                                <Flex>
                                  {/* <RatIcon
                                      m="2"
                                      color="violet.900"
                                      rounded="2xl"
                                      boxSize="30px"
                                    /> */}
                                </Flex>
                              )}
                              <Text fontWeight="600" fontSize="sm">
                                {txn?.node.tags.length > 0
                                  ? "SmartContract Action"
                                  : "AR Transfer"}
                              </Text>
                              <Flex align="center" justify="space-between">
                                <Text p="2" fontWeight="600" fontSize="xs">
                                  Cost:{" "}
                                  {(
                                    Number(txn?.node?.quantity?.ar) +
                                    Number(txn?.node?.fee?.ar)
                                  )?.toFixed?.(5)}{" "}
                                  Ad Credits
                                </Text>
                                {/* {txn?.node?.recipient === walletAddAr ? (
                                    <BsArrowDownLeft
                                      color="green"
                                      size="15px"
                                    />
                                  ) : (
                                    <BsArrowUpRight color="red" size="15px" />
                                  )} */}
                              </Flex>
                            </Flex>
                            {txnDetailModal && (
                              <Stack key={txn?.node?.id}>
                                {txn?.node?.recipient === walletAddAr ? (
                                  <Stack>
                                    <hr />
                                    <Text fontWeight="600" fontSize="xs">
                                      From: {txn?.node?.owner?.address}
                                    </Text>
                                    <Text fontWeight="" fontSize="xs">
                                      Amount: {txn?.node?.quantity?.ar} Ad
                                      Credits
                                    </Text>
                                  </Stack>
                                ) : (
                                  <Stack>
                                    <hr />
                                    <Text fontWeight="600" fontSize="xs">
                                      {txn?.node?.recipient === ""
                                        ? null
                                        : `To: ${txn?.node?.recipient}`}
                                    </Text>
                                    <Text fontWeight="" fontSize="xs">
                                      Amount:{" "}
                                      {txn?.node?.recipient === ""
                                        ? txn?.node?.fee?.ar
                                        : txn?.node?.quantity?.ar}{" "}
                                      Ad Credits
                                    </Text>
                                  </Stack>
                                )}
                                <Text
                                  onClick={() =>
                                    window.open(
                                      `https://viewblock.io/arweave/tx/${txn?.node?.id}`
                                    )
                                  }
                                  fontWeight="600"
                                  fontSize="xs"
                                >
                                  Tx: {txn?.node?.id}
                                </Text>
                                <Text fontWeight="600" fontSize="xs">
                                  Tx Fee: {txn?.node?.fee?.ar} Ad Credits
                                </Text>
                              </Stack>
                            )}
                          </Box>
                        </Box>
                      );
                    })}
                </Box>
              </Stack>
            ) : (
              <Box align="center" p="4" rounded="lg" shadow="card">
                <Text>Connecting to your finnie wallet...</Text>
                <HLoading loading={true} />
                <Tooltip
                  rounded="lg"
                  shadow="card"
                  bgColor="violet.500"
                  p="4"
                  label="kisi ko batana ni"
                  aria-label="A tooltip"
                >
                  <Image
                    alt="kisi ko batana ni"
                    p="4"
                    src="https://cdn3d.iconscout.com/3d/premium/thumb/artist-3025709-2526907.png"
                  />
                </Tooltip>
              </Box>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
