/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, Image } from 'theme-ui';
import { Link } from './link';

export default function Logo({ src, ...rest }) {
  return (
    <Link path="/" label="any" sx={styles.link}>
      <>
        <Image src={src} alt="Forestoken" sx={styles.logo} />
        <span sx={styles.title}>Forestoken</span>
      </>
    </Link>
  );
}

const styles = {
  logo: {
    minWidth: 'auto',
    width: 50,
    height: 50,
  },
  title: {
    padding: '20px 10px',
    fontFamily: 'logo',
    fontSize: '18px',
    color: 'text',
    fontWeight: '400',
    lineHeight: '1.2',
  },
  link: {
    variant: 'links.logo',
    display: 'flex',
    alignItems: 'center',
  },
};
