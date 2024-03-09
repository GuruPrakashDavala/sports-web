import React from "react";
import { motion } from "framer-motion";

export const FlexItems = () => {
  return (
    <motion.div
      className="container"
      key="content"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 1.0, ease: [0.215, 0.61, 0.355, 1] },
      }}
      exit={{
        opacity: 0,
        transition: { delay: 0.2, duration: 0.3, ease: [0.75, 0, 1, 1] },
      }}
      // variants={{
      //   open: { opacity: 1, height: "auto" },
      //   collapsed: { opacity: 0, height: 0 },
      // }}
    >
      <div className="flex-item item-1">Item 1</div>
      <div className="flex-item item-2">Item 2</div>
      <div className="flex-item item-3">Item 3</div>
      <div className="flex-item item-4">Item 4</div>
      <div className="flex-item item-5">Item 5</div>
    </motion.div>
  );
};
