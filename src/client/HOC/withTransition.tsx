import { motion } from 'framer-motion';
import { FC } from 'react';

const withTransition = (
  OriginalComponent: string | React.ComponentType<React.PropsWithChildren<any>>,
) => {
  return (props) => (
    <>
      <OriginalComponent {...props} />
      <motion.div
        className="slide-in"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
      <motion.div
        className="slide-out"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
    </>
  );
};

export default withTransition;
