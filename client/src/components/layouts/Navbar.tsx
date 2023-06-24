import { Box, Button, Flex, Heading, List, ListItem } from "@chakra-ui/react";
import Link from "next/link";

import { links } from "@/src/utils/links";
import { toggleMode } from "@/src/features/ui/uiSlice";
import { Bar } from "@/src/utils/themeConfig";
import { useAppDispatch, useAppSelect } from "@/src/hooks/useReduxHook";

const Navbar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelect((state) => state.ui);

  return (
    <Flex
      as="nav"
      role="navigation"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      p="36px"
      mb="30px"
    >
      <Heading as="h1">
        <Link href="/" passHref>
          Logo
        </Link>
      </Heading>
      <List display={{ base: "none", md: "block" }}>
        <Flex justifyContent="center" alignItems="center" gap={6}>
          {links.map((link) => {
            return (
              <ListItem
                key={link.title}
                fontSize="xl"
                fontWeight="700"
                opacity="0.85"
                transition="opacity 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
                _hover={{
                  opacity: 1,
                  boxShadow: `0 2px 0 ${mode === "dark" ? "red" : "blue"}`,
                }}
              >
                <Link href={link.path} passHref>
                  {link.title}
                </Link>
              </ListItem>
            );
          })}
        </Flex>
      </List>
      <Box
        as="div"
        display={{ base: "flex", md: "none" }}
        w="50px"
        h="30px"
        flexDirection="column"
        cursor="pointer"
      >
        <Bar />
        <Bar />
        <Bar />
      </Box>
      <Box as="div" display={{ base: "none", md: "block" }}>
        <Button mx="5px" bg="transparent" transition="all 0.4s">
          <Link href="/sign">Login</Link>
        </Button>
        <Button
          mx="5px"
          bg="transparent"
          transition="all 0.4s"
          onClick={() => dispatch(toggleMode())}
        >
          DarkMode
        </Button>
      </Box>
    </Flex>
  );
};

export default Navbar;
