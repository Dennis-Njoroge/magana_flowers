import {Fade, Paper, Popper} from "@mui/material";

const DMTPopper = props => {
    const {anchorEl, open, onClose, children, placement='bottom'} = props;
    return (
        <>
            <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper sx={{ p:2 }}>
                            {children}
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </>
    )
}

export default DMTPopper;