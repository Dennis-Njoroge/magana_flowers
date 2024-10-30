import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { Icon, useMediaQuery, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';

const DMTDialog = (props) => {
    const { open, onClose, children, ...others } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog
            open={open}
            TransitionComponent={Slide}
            maxWidth={'sm'}
            scroll={'body'}
            fullWidth={true}
            fullScreen={fullScreen}
            TransitionProps={{
                direction: 'down',
                mountOnEnter: true,
                unmountOnExit: true,
            }}
            {...others}
        >
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                    mb: 2,
                }}
            >
                <Icon>{"close"}</Icon>
            </IconButton>

            {children}
        </Dialog>
    );
};

export default DMTDialog;
