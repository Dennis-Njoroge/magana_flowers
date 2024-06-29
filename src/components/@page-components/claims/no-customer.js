import {Box, Typography} from "@mui/material";
import SearchLottie from "@/components/@shared-components/lottie-files/search-lottie";

const NoCustomer = () => {
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
                <Typography variant={'h6'} sx={{ mb: -5}}>
                    {"Identify Customer"}
                </Typography>
                <SearchLottie/>
                <Typography sx={{ mt: -2}} align={'center'}>
                    {"Please search customer to proceed."}
                </Typography>
            </Box>
        </>
    )
}

export default NoCustomer;