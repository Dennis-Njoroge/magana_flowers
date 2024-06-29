import Head from 'next/head'
import {APP_NAME, PATHS} from "@/utils/constants";
import Box from "@mui/material/Box";
import ModernLayout from "@/components/@layouts/modern-layout";
import Dashboard from "@/components/@page-components/dashboard";
import {AuthGuard} from "@/hocs/auth-guard";
import RoleGuard from "@/hocs/role-guard";

const title = "Dashboard";
const DashboardPage = () => {
    return (
        <>
            <Head>
                <title>{title} |{APP_NAME}</title>
            </Head>
            <Box>
                <Dashboard/>
            </Box>
        </>
    )
}

DashboardPage.getLayout = page => (
    <AuthGuard>
        <ModernLayout title={title}>
            <RoleGuard path={PATHS.DASHBOARD} page={true}>
                {page}
            </RoleGuard>
        </ModernLayout>
     </AuthGuard>
)

export default DashboardPage;
