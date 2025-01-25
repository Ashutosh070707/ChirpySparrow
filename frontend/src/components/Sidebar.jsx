import {
  Box,
  Container,
  Flex,
  Image,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loggedInUserAtom } from "../atoms/loggedInUserAtom";
import { Navigate, Link as RouterLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import { useLogout } from "../../hooks/useLogout";
import { authScreenAtom } from "../atoms/authAtom";
import { BsFillChatQuoteFill, BsPlus } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const loggedInUser = useRecoilValue(loggedInUserAtom);
  const navigate = useNavigate();
  const logout = useLogout();
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  return (
    <Flex
      direction={"column"}
      position="fixed"
      left="0"
      height="100vh"
      bg={colorMode === "dark" ? "gray.800" : "white"}
      width="16%"
      alignItems="flex-start"
      justifyContent="center"
    >
      <Flex
        justifyContent="center"
        w="full"
        h="800px"
        maxH="800px"
        bg={colorMode === "dark" ? "gray.800" : "white"}
        overflowY="auto"
        borderRadius={10}
        mt={"2%"}
        mb={"4%"}
      >
        <Flex direction="column" alignItems={"center"} justifyContent="center">
          <Box alignItems="center">
            <Link
              as={RouterLink}
              to="/"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              <Text
                fontSize="2xl"
                fontWeight="bold"
                fontFamily={"Comic Sans MS, Comic Sans, cursive"}
              >
                ChirpySparrow
              </Text>
            </Link>
          </Box>
          <Flex direction={"column"} alignItems={"flex-start"} gap={10}>
            <Link
              as={RouterLink}
              to="/"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              <Flex gap={4}>
                <AiFillHome size={26}></AiFillHome>
                <Text fontSize={"lg"}>Home</Text>
              </Flex>
            </Link>
            <Link
              as={RouterLink}
              to={"/search"}
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              <Flex gap={4}>
                <FaSearch size={26} />
                <Text fontSize={"lg"}>Search</Text>
              </Flex>
            </Link>
            <Link
              as={RouterLink}
              to={"/create"}
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              <Flex gap={4}>
                <Box border="3px solid white" borderRadius={10}>
                  <HiPlus size={23} />
                </Box>
                <Text fontSize={"lg"}>Create</Text>
              </Flex>
            </Link>

            <Link
              as={RouterLink}
              to={"/chat"}
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              <Flex gap={4}>
                <BsFillChatQuoteFill size={26} />
                <Text fontSize={"lg"}>Message</Text>
              </Flex>
            </Link>
            <Link
              as={RouterLink}
              to={`/${loggedInUser.username}`}
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              <Flex gap={4}>
                <RxAvatar size={26}></RxAvatar>
                <Text fontSize={"lg"}>Profile</Text>
              </Flex>
            </Link>

            <Link
              as={RouterLink}
              to={"/settings"}
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              <Flex gap={4}>
                <MdOutlineSettings size={26} />
                <Text fontSize={"lg"}>Settings</Text>
              </Flex>
            </Link>

            <Link
              as={RouterLink}
              to={"/auth"}
              onClick={() => logout()}
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              <Flex gap={4}>
                <FiLogOut size={26} />
                <Text fontSize={"lg"}>Logout</Text>
              </Flex>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
