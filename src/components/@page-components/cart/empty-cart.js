import {Box, Typography} from "@mui/material";
import NoRecordsLottie from "@/components/@shared-components/lottie-files/no-records-lottie";
import NextLink from "next/link";
import Button from "@mui/material/Button";

const EmptyCart = () => {
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2}}>
                <NoRecordsLottie/>
                <Typography sx={{ mt: -2}} variant={'h5'}>
                    {"Empty Cart"}
                </Typography>
                <Typography>
                    {"No items added to cart."}
                </Typography>
                <NextLink href={'/dashboard/shop'} passHref>
                    <Button variant={'contained'} size={'large'} color={'primary'}>
                        {"Shop Now!"}
                    </Button>
                </NextLink>
            </Box>
        </>
    )
}

export default EmptyCart;