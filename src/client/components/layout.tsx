import React, { useState } from 'react';
import Sticky from 'react-stickynode';
import { Waypoint } from 'react-waypoint';

import Header from './header/header';
import Footer from './footer/footer';
export default function Layout({ children }) {
  const [sticky, setSticky] = useState(false);

  const onWaypointPositionChange = ({ currentPosition }) => {
    if (currentPosition === 'above') {
      setSticky(true);
    }
    if (currentPosition === 'below') {
      setSticky(false);
    }
  };

  return (
    <React.Fragment>
      <Sticky enabled={sticky} innerZ={991}>
        <Header className={`${sticky ? 'sticky' : 'unSticky'}`} />
      </Sticky>
      <Waypoint onPositionChange={onWaypointPositionChange} />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  );
}
