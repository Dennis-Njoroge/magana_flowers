import {ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";

const days = [
    {
        label: "Su",
        value: "Sunday",
        shortValue: "Sun",
    },
    {
        label: "Mo",
        value: "Monday",
        shortValue: "Mon",
    },
    {
        label: "Tu",
        value: "Tuesday",
        shortValue: "Tue",
    },
    {
        label: "We",
        value: "Wednesday",
        shortValue: "Wed",
    },
    {
        label: "Th",
        value: "Thursday",
        shortValue: "Thur",
    },
    {
        label: "Fr",
        value: "Friday",
        shortValue: "Fri",
    },
    {
        label: "Sa",
        value: "Saturday",
        shortValue: "Sat",
    }
];

const DMTDaySelector = props => {
    const { onChange, selectedValue, label = "Choose a day" } = props;
    const [value, setValue] = useState("");

    const handleOnChange = (event, value) => {
        onChange?.(value);
        setValue(value);
    }

    useEffect(() => {
        if (selectedValue){
            setValue(selectedValue);
        }
    },[selectedValue])

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2}}>
                <Typography component={"label"} variant={'body2'}>
                    {label}
                </Typography>
                <ToggleButtonGroup
                    color={"error"}
                    value={value}
                    exclusive
                    onChange={handleOnChange}
                >
                    {days.map((day, index) => (
                        <ToggleButton key={index} value={day.value} aria-label={day.label}>
                            {day.label}
                        </ToggleButton>
                    ))}

                </ToggleButtonGroup>



            </Box>

        </>
    )
}

export default DMTDaySelector;