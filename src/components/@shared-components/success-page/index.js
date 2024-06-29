import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SuccessLottie from "@/components/@shared-components/lottie-files/success-lottie";
import {Button} from "@mui/material";

const SuccessPage = props => {
    const { message = "" , title = "Successful", onContinue, label='Check Status', fullWidth = true } = props;
    return (
        <Box sx={{display: 'flex', mb:2, gap:2, justifyContent: 'center', alignItems: 'center',flexDirection: 'column' }}>
            <SuccessLottie/>
            <Typography variant={'h5'} color={"primary.main"} align={'center'}>
                {title}
            </Typography>
            <Typography gutterBottom align={'center'}>
                {message}
            </Typography>
            <Button
                fullWidth={fullWidth}
                variant={"contained"}
                size={"large"}
                onClick={onContinue}
            >
                {label}
            </Button>
        </Box>
    )
}

export default SuccessPage;