import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const Selector = ({handleSelection, label, items, target, value}) => (
    <FormControl fullWidth>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
            labelId="select-label"
            id="select"
            value={value}
            label={`${label} selection`}
            onChange={handleSelection}
        >
            {items.map(item => <MenuItem key={item.id} value={item[target]}>{item[target]}</MenuItem>)}
        </Select>
    </FormControl>
)

export default Selector