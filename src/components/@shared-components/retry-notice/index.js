import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {RotatingLines} from "react-loader-spinner";

const RetryNotice = props => {
    const {
        onRetry,
        isError,
        isLoading,
        message ="An error occurred while processing request!"
    } = props;

    if (isLoading){
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column'}}>
                <RotatingLines
                    visible={true}
                    height="50"
                    width="50"
                    color="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
                <Typography>
                    {"Fetching Data..."}
                </Typography>
            </Box>
        )
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                {
                    message && (
                        <>
                            <Typography align={'center'}>
                                {message}
                            </Typography>
                            <Button onClick={onRetry} variant={'text'} color={'primary'}>
                                {"Click to Retry"}
                            </Button>
                        </>
                    )
                }
            </Box>
        </>
    )
}

export default RetryNotice;