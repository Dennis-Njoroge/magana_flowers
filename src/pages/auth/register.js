import Head from 'next/head'
import {APP_NAME} from "@/utils/constants";
import Box from "@mui/material/Box";
import AuthLayout from "@/components/@layouts/auth-layout";
import {GuestGuard} from "@/hocs/guest-guard";
import Register from "@/components/@page-components/register";


const title = "Register";
const RegisterPage = () => {
    return (
        <>
            <Head>
                <title>{title} |{APP_NAME}</title>
            </Head>
            <Box>
                <Register/>
            </Box>
        </>
    )
}

RegisterPage.getLayout = page => (
    <GuestGuard>
        <AuthLayout>
            {page}
        </AuthLayout>
    </GuestGuard>
)

export default RegisterPage;
