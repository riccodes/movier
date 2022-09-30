import React from "react";
import {FormControl, InputLabel, ListItemIcon, MenuItem, Select} from "@mui/material";
import {getRandom} from "../util";

const Icon = ({path}) => <img width="20" src={`https://image.tmdb.org/t/p/w200${path}`}/>

const IconSelector = ({handleSelection, label, items, target, value}) => (
    <FormControl margin="dense" fullWidth>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
            sx={{marginBottom: "8px"}}
            labelId="select-label"
            id="select"
            value={value}
            label={`${label} selection`}
            onChange={handleSelection}
        >
            {items.map(item =>
                <MenuItem key={`${getRandom()}-${item.id}`} value={item[target]}>
                    <ListItemIcon>
                        <Icon path={item.logo_path} fontSize="small"/>
                    </ListItemIcon>
                    {item[target]}
                </MenuItem>)}
        </Select>
    </FormControl>
)

export default IconSelector