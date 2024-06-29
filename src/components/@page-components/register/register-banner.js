import Box from "@mui/material/Box";
import LoginLottie from "@/components/@shared-components/lottie-files/login-lottie";
import {Typography} from "@mui/material";
import {APP_NAME} from "@/utils/constants";

const RegisterBanner = () => {
    return (
        <>
            <Box sx={{
                borderRadius: 3,
                width: "100%",
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Typography variant={'h5'} align={'center'}  gutterBottom>
                    {APP_NAME}
                </Typography>
                <LoginLottie/>
                <Typography variant={'caption'} align={'center'}>
                    Copyright { '\u00a9'} {new Date().getFullYear()} | All Rights Reserved
                </Typography>
            </Box>
        </>
    )
}

export default RegisterBanner;