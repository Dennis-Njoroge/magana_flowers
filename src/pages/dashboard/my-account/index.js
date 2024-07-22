import Head from 'next/head'
import {APP_NAME, PATHS} from "@/utils/constants";
import Box from "@mui/material/Box";
import ModernLayout from "@/components/@layouts/modern-layout";
import {AuthGuard} from "@/hocs/auth-guard";
import RoleGuard from "@/hocs/role-guard";
import MyAccount from "@/components/@page-components/my-account";

const title = "My Account";
const DashboardPage = () => {
    return (
        <>
            <Head>
                <title>{title} |{APP_NAME}</title>
            </Head>
            <Box>
                <MyAccount/>
            </Box>
        </>
    )
}

DashboardPage.getLayout = page => (
    <AuthGuard>
        <ModernLayout title={title}>
            <RoleGuard path={PATHS.MY_ACCOUNT} page={true}>
                {page}
            </RoleGuard>
        </ModernLayout>
     </AuthGuard>
)

export default DashboardPage;
