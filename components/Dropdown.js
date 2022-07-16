import { useState } from "react";

import Link from "next/link";
import { Menu, MenuItem, Button, IconButton } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

import styles from "../styles/Header.module.scss"

export const Dropdown = ({ theme, toggleTheme }) => {
  
  const options = [
    {
      id: 1,
      img: <LoginOutlinedIcon size={20} />,
      aOption: "Login",
    },
    {
      id: 2,
      img: <PersonAddAltOutlinedIcon size={20} />,
      aOption: "Sign Up",
    }
  ];
  
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <IconButton className={styles.IconButton} aria-label="user" {...bindTrigger(popupState)}>
            <AccountCircleOutlinedIcon className={styles.IconUser} />
          </IconButton>
          
          <Menu className={styles.Menu} {...bindMenu(popupState)}>
            {options.map((option) => (
              <MenuItem className={styles.MenuItem} >
                <Link href={`/${option.aOption.replaceAll(" ", "-").toLowerCase()}`}>
                <span >
                  {option.img}
                  <p>
                    {option.aOption}
                  </p>
                </span>
                </Link >
              </MenuItem>
            ))}
            
            <MenuItem className={styles.MenuItemCheckbox}>
              <label >
                <input onClick={toggleTheme} className={styles.Checkbox} value={theme} type="checkbox"/>
                Dark Theme
              </label>
            </MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  );
};