import { useState, useEffect } from "react";

import Link from "next/link";
import { Menu, MenuItem, Button, IconButton, FormControlLabel, Switch } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

import styles from "../styles/Header.module.scss"

export const Dropdown = ({ theme, toggleTheme }) => {
  const [loading, setLoading] = useState(false);
  
  const handleClick = () => {
    if (theme) {
      return setLoading(false);
    }
    return setLoading(true);
  }
    
  useEffect(() => {
    const themeFromLocalStorage = JSON.parse(localStorage.getItem('theme'));
    setLoading(themeFromLocalStorage);
  }, []);
  
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
              <MenuItem key={option.id} className={styles.MenuItem} >
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
              <label>
                <FormControlLabel
                  sx={{
                    display: 'block',
                  }}
                  control={
                    <Switch
                      checked={loading}
                      className={styles.Checkbox} 
                      onChange={() => setLoading(!loading)}
                      onClick={toggleTheme}
                      name="loading"
                      color="primary"
                    />
                  }
                  label="Dark Theme"
                />
              </label>
            </MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  );
};          
              /*<label >
                <input onClick={toggleTheme} className={theme ? styles.CheckboxTrue : styles.CheckboxFalse } value={theme} type="checkbox"/>
                Dark Theme
              </label>*/
              