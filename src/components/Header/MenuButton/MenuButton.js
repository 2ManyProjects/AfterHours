"use client";

import React, { useState } from 'react';
import { Button, Popover, List, ListItem, ListItemText } from "../../../lib/mui";


const MenuButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Menu
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem button disabled>
            <ListItemText primary="About Us" />
          </ListItem>
          <ListItem button disabled>
            <ListItemText primary="Our Past Events" />
          </ListItem>
          <ListItem button disabled>
            <ListItemText primary="Contact Us" />
          </ListItem>
          <ListItem button disabled>
            <ListItemText primary="FAQ" />
          </ListItem>
          <ListItem button to="/" onClick={handleClose}>
            <ListItemText primary="Current Event" />
          </ListItem>
        </List>
      </Popover>
    </div>
  );
};

export default MenuButton;
