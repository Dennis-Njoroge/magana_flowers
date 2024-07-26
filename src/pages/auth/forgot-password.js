import Head from 'next/head'
import {APP_NAME} from "@/utils/constants";
import Box from "@mui/material/Box";
import AuthLayout from "@/components/@layouts/auth-layout";
import {GuestGuard} from "@/hocs/guest-guard";
import ForgotPassword from "@/components/@page-components/forgot-password";


const title = "Forgot Password";
const ForgotPasswordPage = () => {
    return (
        <>
            <Head>
                <title>{title} |{APP_NAME}</title>
            </Head>
            <Box  sx={{ height: 'inherit'}}  >
                <ForgotPassword/>
            </Box>
        </>
    )
}

ForgotPasswordPage.getLayout = page => (
    <GuestGuard>
        <AuthLayout>
            {page}
        </AuthLayout>
    </GuestGuard>
)

export default ForgotPasswordPage;
