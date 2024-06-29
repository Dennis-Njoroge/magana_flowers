import React, { useState, useEffect } from 'react';
import {Typography} from "@mui/material";

const timeout = 59;
const  OTPCountdown = props =>  {
    const { refresh, resendCallback } = props;
    const [count, setCount] = useState(timeout); // Set initial countdown value in seconds (10 minutes in this case)
    const onRefreshCount = () => {
        setCount(timeout);
    }


    useEffect(() => {
        if (refresh){
            onRefreshCount();
        }
    },[refresh])

    useEffect(() => {
        const countdown = setInterval(() => {
            if (count > 0) {
                const updatedCount = count - 1
                setCount(updatedCount);

            } else {
                clearInterval(countdown);
            }
        }, 1000);

        resendCallback?.(count)

        // Clean up the interval on unmount
        return () => clearInterval(countdown);
    }, [count]);


    // Format the countdown value to mm:ss
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };



    return (
        <>
            <Typography variant={"h6"} color={"error.main"}>{formatTime(count)}</Typography>
        </>
    );
}

export default OTPCountdown;
