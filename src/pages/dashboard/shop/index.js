import Head from 'next/head'
import {APP_NAME, PATHS} from "@/utils/constants";
import Box from "@mui/material/Box";
import ModernLayout from "@/components/@layouts/modern-layout";
import {AuthGuard} from "@/hocs/auth-guard";
import RoleGuard from "@/hocs/role-guard";
import Shop from "@/components/@page-components/shop";

const title = "Shop";
const DashboardPage = () => {
    return (
        <>
            <Head>
                <title>{title} |{APP_NAME}</title>
            </Head>
            <Box>
                <Shop/>
            </Box>
        </>
    )
}

DashboardPage.getLayout = page => (
    <AuthGuard>
        <ModernLayout title={title}>
            <RoleGuard path={PATHS.SHOP} page={true}>
                {page}
            </RoleGuard>
        </ModernLayout>
     </AuthGuard>
)

export default DashboardPage;
