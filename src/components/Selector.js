import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {getRandom} from "../util";

const Selector = ({handleSelection, label, items, target, value}) => (
    <FormControl margin="dense" fullWidth>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
            sx={{marginBottom:"8px"}}
            labelId="select-label"
            id="select"
            value={value}
            label={`${label} selection`}
            onChange={handleSelection}
        >
            {items.map(item =>
                <MenuItem key={`${getRandom()}-${item.id}`} value={item[target]}>{item[target]}</MenuItem>)}
        </Select>
    </FormControl>
)

export default Selector