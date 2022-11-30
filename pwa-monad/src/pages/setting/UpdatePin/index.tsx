import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HPasswordInput from "components/atoms/HPasswordInput";
import { useWallet } from "components/contexts";
import ReactCodeInput from "react-code-input";
import { Box, Center, Flex, Stack, Text, Button } from "@chakra-ui/react";
import { AiOutlineArrowLeft, AiOutlineCloseCircle } from "react-icons/ai";

export function UpdatePin() {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [oldPinFocus, setOldPinFocus] = useState(true);
  const [oldPin, setOldPin] = useState("");
  const [createPinFocus, setCreatePinFocus] = useState(false);
  const [createPin, setCreatePin] = useState("");
  const [confirmPinFocus, setConfirmPinFocus] = useState(false);
  const [confirmPin, setConfirmPin] = useState("");
  const oldInputRef = useRef<ReactCodeInput>(null);
  const pinInputRef = useRef<ReactCodeInput>(null);
  const confirmInputRef = useRef<ReactCodeInput>(null);

  const { changePin, unlock } = useWallet();

  const onClick = async () => {
    if (oldPin === "") {
      setErr("Please input current PIN.");
    } else if (createPin === "" || confirmPin === "") {
      setErr("Please input PIN.");
    } else if (createPin !== confirmPin) {
      setErr("New Access PINs don't match, please try again.");
    } else {
      unlock(oldPin)
        .then(() =>
          changePin(oldPin, createPin).then(() => {
            setErr("");
            navigate("/setting/update-pin-success");
          })
        )
        .catch(() => {
          setErr("Current PIN is incorrect.");
        });
    }
  };

  const activeFocusArea = (element: string = "old") => {
    if (element === "old") {
      setOldPinFocus(true);
      setCreatePinFocus(false);
      setConfirmPinFocus(false);
      // @ts-ignore
      oldInputRef.current.textInput[0].focus();
    } else if (element === "create") {
      setOldPinFocus(false);
      setCreatePinFocus(true);
      setConfirmPinFocus(false);
      // @ts-ignore
      pinInputRef.current.textInput[0].focus();
    } else {
      setOldPinFocus(false);
      setCreatePinFocus(false);
      setConfirmPinFocus(true);
      // @ts-ignore:
      confirmInputRef.current.textInput[0].focus();
    }
  };

  useEffect(() => {
    // @ts-ignore:
    if (oldInputRef) oldInputRef.current.textInput[0].focus();
  }, [oldInputRef]);

  return (
    <Box px="2" pt="20" color="black.500">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Flex p="4" justify="space-between" align="center">
            <AiOutlineArrowLeft
              size="20px"
              color="black"
              onClick={() => navigate("/setting")}
            />
            <Text fontSize="lg" fontWeight="600">
              Update PIN
            </Text>
            <AiOutlineCloseCircle
              size="20px"
              color="black"
              onClick={() => navigate(`/upload`)}
            />
          </Flex>
          <hr />
          <Text fontSize="sm" textAlign="center">
            Update the password to access your wallet.
          </Text>
          {err !== "" ? err : <span>&nbsp;</span>}
          <Box onClick={() => activeFocusArea("old")}>
            <Text px="8" fontSize="xs">
              Enter your current password
            </Text>
            <HPasswordInput
              label="Current Access PIN"
              onChange={setOldPin}
              onComplete={() => activeFocusArea("create")}
              focused={oldPinFocus}
              labelAlign="left"
              ref={oldInputRef}
            />
          </Box>
          <Box onClick={() => activeFocusArea("create")}>
            <Text px="8" fontSize="xs">
              Create your new password
            </Text>
            <HPasswordInput
              label="New Access PIN"
              onChange={setCreatePin}
              onComplete={() => activeFocusArea("confirm")}
              focused={createPinFocus}
              labelAlign="left"
              ref={pinInputRef}
            />
          </Box>
          <Box onClick={() => activeFocusArea("confirm")}>
            <Text px="8" fontSize="xs">
              Confirm your new password
            </Text>
            <HPasswordInput
              label="Confirm New Access PIN"
              onChange={setConfirmPin}
              focused={confirmPinFocus}
              labelAlign="left"
              ref={confirmInputRef}
            />
          </Box>
          <Button variant="outline" color="violet.500" onClick={onClick}>
            Update Password
          </Button>
        </Stack>
      </Center>
    </Box>
  );
}
