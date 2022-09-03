import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @mui/material components
import Snack from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
// @mui/icons
import Close from '@mui/icons-material/Close';
// material components

import { makeStyles, createStyles } from '@mui/styles';
import styles from 'src/client/assets/jss/components/snackbarContentStyle';

export default function Snackbar(props) {
  const useStyles = makeStyles(() =>
    createStyles(styles)
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const classes = useStyles();
  const { message, color, close, icon, place, open, rtlActive } = props;
  let action = [];
  const messageClasses = classNames({
    [classes.iconMessage]: icon !== undefined,
  });
  if (close !== undefined) {
    action = [
      <IconButton
        className={classes.iconButton}
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={() => props.closeNotification()}
      >
        <Close className={classes.close} />
      </IconButton>,
    ];
  }
  return (
    <Snack
      anchorOrigin={{
        vertical: place.indexOf('t') === -1 ? 'bottom' : 'top',
        horizontal:
          place.indexOf('l') !== -1
            ? 'left'
            : place.indexOf('c') !== -1
            ? 'center'
            : 'right',
      }}
      open={open}
      message={
        <div>
          {icon !== undefined ? <props.icon className={classes.icon} /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
      }
      action={action}
      ContentProps={{
        classes: {
          root: classes.root + ' ' + classes[color],
          message: classes.message,
          action: classNames({ [classes.actionRTL]: rtlActive }),
        },
      }}
    />
  );
}

Snackbar.propTypes = {
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['info', 'success', 'warning', 'danger', 'primary']),
  close: PropTypes.bool,
  icon: PropTypes.object,
  place: PropTypes.oneOf(['tl', 'tr', 'tc', 'br', 'bl', 'bc']),
  open: PropTypes.bool,
  rtlActive: PropTypes.bool,
  closeNotification: PropTypes.func,
};
