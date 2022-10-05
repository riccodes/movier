import React from "react";
import {FormControl, IconButton, InputLabel, Menu, MenuItem, Select, Stack, Tooltip} from "@mui/material";
import {themeList} from "../theme/palettes";
import {getRandom} from "../util";
import Brightness7RoundedIcon from "@mui/icons-material/Brightness7Rounded";
import ModeNightRoundedIcon from "@mui/icons-material/ModeNightRounded";
import {useThemeHelper} from "../context/ThemeHelperContext";

const OverFlowMenu = ({ open, setAnchorEl, anchorEl }) => {

    const themeHelper = useThemeHelper()
    const { cookies, themeMode, toggleThemeMode, setThemeOnCookie} = themeHelper

    const getTheme = () => {
        return cookies.get("theme") !== null ? cookies.get("theme") : "candy"
    }
    const handleClose = () => { setAnchorEl(null); };

    return (
        <Menu
            id="menu"
            MenuListProps={{'aria-labelledby': 'long-button'}}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
            <MenuItem key="theme" onClick={handleClose}>
                <Stack sx={{padding: "8px"}} direction="row">
                    <FormControl sx={{minWidth: "75%", marginRight: "8px"}}>
                        <InputLabel id="select-label">Theme</InputLabel>
                        <Select
                            size="small"
                            labelId="select-theme"
                            id="theme"
                            label="Theme"
                            onChange={setThemeOnCookie}
                            defaultValue={getTheme}
                        >
                            {themeList.map(item =>
                                <MenuItem key={`${getRandom()}-${item.id}`} value={item.id}>{item.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <Tooltip disableFocusListener title="Theme mode" placement="top">
                        <IconButton onClick={toggleThemeMode} color="inherit">
                            {themeMode === 'dark' ? <Brightness7RoundedIcon/> : <ModeNightRoundedIcon/>}
                        </IconButton>
                    </Tooltip>
                </Stack>
            </MenuItem>
        </Menu>
    )
}

export default OverFlowMenu