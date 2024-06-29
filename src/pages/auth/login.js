import Head from 'next/head'
import {APP_NAME} from "@/utils/constants";
import Box from "@mui/material/Box";
import Login from "@/components/@page-components/login";
import AuthLayout from "@/components/@layouts/auth-layout";
import {GuestGuard} from "@/hocs/guest-guard";


const title = "Login";
const LoginPage = () => {
    return (
        <>
            <Head>
                <title>{title} |{APP_NAME}</title>
            </Head>
            <Box  sx={{ height: 'inherit'}}  >
                <Login/>
            </Box>
        </>
    )
}

LoginPage.getLayout = page => (
    <GuestGuard>
        <AuthLayout>
            {page}
        </AuthLayout>
    </GuestGuard>
)

export default LoginPage;
