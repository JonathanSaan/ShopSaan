import { useState, useEffect, useContext } from "react";

import Link from "next/link";
import { Menu, MenuItem, Button, IconButton, FormControlLabel, Switch } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/router";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

import { app } from "../config/firebase";
import styles from "../styles/Header.module.scss"

export const Dropdown = ({ theme, toggleTheme }) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let token = sessionStorage.getItem("Token")
  let router = useRouter()
  
  const handleClick = () => {
    if (theme) {
      return setLoading(false);
    }
    return setLoading(true);
  };
  
  const Logout = () => {
		sessionStorage.removeItem("Token")
    router.push("/")
	};
	
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
  
  useEffect(() => {
    const themeFromLocalStorage = JSON.parse(localStorage.getItem("theme"));
    setLoading(themeFromLocalStorage);
  }, []);
  
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <IconButton className={styles.IconButton} aria-label="user" {...bindTrigger(popupState)}>
            <AccountCircleOutlinedIcon className={styles.Icon} />
          </IconButton>
          
          <Menu className={styles.Menu} {...bindMenu(popupState)}>
            {token !== null ? (
              <>
                <MenuItem className={styles.MenuItem}>
      					  <label>
      						  <p>Logged</p>
      					  </label>
      					</MenuItem>
      					<MenuItem className={styles.MenuItem} onClick={Logout}>
      					  <label>
      						  <LogoutOutlinedIcon size={20} />
      						  <p>Logout</p>
      					  </label>
      					</MenuItem>
    					</>
    				) : (
    				  <>
                {options.map((option) => (
                  <MenuItem key={option.id} className={styles.MenuItem} >
                    <Link href={`/${option.aOption.replaceAll(" ", "-").toLowerCase()}`}>
                      <label>
                        {option.img}
                        <p>
                          {option.aOption}
                        </p>
                      </label>
                    </Link>
                  </MenuItem>
                ))}
      				</>
            )}
            
            <MenuItem className={styles.ThemeCheckbox}>
              <label>
                <FormControlLabel
                  sx={{
                    display: "block",
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