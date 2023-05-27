import { Box, Button, Flex, Heading, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import Link from "next/link";

import { links } from "@/utils/links.js";
import { MotionBar, MotionBox } from "../styles/NavbarStyles.js";

const Navbar = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      w="100%"
      maxW="var(--standard-width)"
      px={["var(--spacing-sm)", "var(--spacing-md)"]}
      my="var(--spacing-xl)"
      boxSizing="border-box"
      sx={{
        "@media only screen and (max-width: 768px)": {
          margin: "var(--spacing-sm) 0 var(--spacing-lg) 0",
        },
      }}
    >
      <Link href="/">
        <Heading as="h1">Logo</Heading>
      </Link>
      <List
        listStyleType="none"
        sx={{
          "@media only screen and (max-width: 768px)": {
            display: "none",
          },
        }}
      >
        <Flex justifyContent="center" alignItems="center">
          {links.map((link) => {
            return (
              <ListItem key={link.title} mx="var(--spacing-md)">
                <Link href={link.path} passHref color="var(--text-light)" fontWeight="bold">
                  <ListIcon as={link.icon} />
                  {link.title}
                </Link>
              </ListItem>
            );
          })}
        </Flex>
      </List>
      <MotionBox
        as="button"
        className="hamburger-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        sx={{
          "@media only screen and (max-width: 768px)": {
            width: "50px",
            height: "30px",
            backgroundColor: "rgba(250, 250, 250, 0.25)",
            borderRadius: "var(--standard-border-radius)",
          },
          "&.hamburger-button": {
            display: "none",
          },
        }}
      >
        <MotionBar />
        <MotionBar />
        <MotionBar />
      </MotionBox>
      <Button className="primary-button navbar-button">Sign In</Button>
    </Flex>
  );
};

export default Navbar;
