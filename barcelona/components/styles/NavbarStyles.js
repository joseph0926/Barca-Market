import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

export const MotionBox = motion(Box);

export const MotionBar = () => (
  <MotionBox
    as="div"
    className="bar"
    bg="white"
    w="24px"
    h="2px"
    my="2px"
    borderRadius="2px"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    sx={{
      "@media only screen and (max-width: 768px)": {
        backgroundColor: "var(--bg-white)",
      },
    }}
  />
);
