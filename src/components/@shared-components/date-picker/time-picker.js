import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Fade, Icon, Menu, MenuItem} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {useState} from "react";

const DMTTimePicker = props => {
    const { label = "Choose a time:" } = props;
    const [time, setTime] = useState({
        hour: '12',
        min: '00',
        day: 'AM',
    });

    const handleOnToggle = () => {
        const value = time.day === "AM" ? "PM" : "AM";
        setTime({
            ...time,
            day: value
        })
    }



    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2}}>
                <Typography component={"label"} variant={'body2'}>
                    {label}
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        width: 160,
                        p:2,
                        backgroundColor: 'paper.main',
                        boxShadow: 5,
                        borderRadius:2,
                        alignItems:'center',
                        gap:2,
                        justifyContent:'center'
                }} >
                    <IncrementDecrementButton max = {12} defaultValue={12}/>
                    <Typography>
                        {":"}
                    </Typography>
                    <IncrementDecrementButton max = {59} defaultValue={0} includeZero={true}/>
                    <Typography sx={{ cursor: 'pointer'}} onClick={handleOnToggle}>
                        {time.day}
                    </Typography>
                </Box>
            </Box>
        </>
    )
}


const ITEM_HEIGHT = 48;
const IncrementDecrementButton = props => {
    const { max = 12 ,  defaultValue = 12, includeZero = false } = props;
    const [value, setValue ] = useState(defaultValue);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const min = includeZero ? 0 : 1;

    let numbers = [];



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleOnIncrement = () => {
        if (value === max){
            setValue( min);
            return;
        }
        setValue(prevState => prevState + 1);
    }
    const handleOnDecrement = () => {
        if (value === min){
            setValue( max);
            return;
        }
        setValue(prevState => prevState - 1);
    }

    const formatNumber = (value) => {
        return `${value.toString().padStart(2, '0')}`;
    };


    const handleOnChange = (number) => {
        setValue(number);
        handleClose();
    }

    for (let i = min; i <= max; i++) {
        numbers.push(
            <MenuItem key={i} onClick={() => handleOnChange(i)} selected={Boolean(value === i)}>
                {formatNumber(i)}
            </MenuItem>
        );
    }


    return (
        <>
            <Box sx={{ display: 'flex', alignItems:'center', gap:1, width: 20, flexDirection: 'column'}}>
                <IconButton onClick={handleOnDecrement}>
                    <Icon>
                        {"keyboard_arrow_up"}
                    </Icon>
                </IconButton>
                <Typography
                    sx={{ cursor: 'pointer'}}
                    onClick={handleClick}
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                   aria-haspopup="true">
                    {formatNumber(value)}
                </Typography>
                <IconButton onClick={handleOnIncrement}>
                    <Icon>
                        {"keyboard_arrow_down"}
                    </Icon>
                </IconButton>
            </Box>
            <Menu
                id="long-menu"
                TransitionComponent={Fade}
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}

                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        // width: '20ch',
                    },
                }}
            >
                {numbers}
            </Menu>
        </>
    )
}




export default DMTTimePicker;