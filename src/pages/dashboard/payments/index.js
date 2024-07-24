import Head from 'next/head'
import {APP_NAME, PATHS} from "@/utils/constants";
import Box from "@mui/material/Box";
import ModernLayout from "@/components/@layouts/modern-layout";
import {AuthGuard} from "@/hocs/auth-guard";
import RoleGuard from "@/hocs/role-guard";
import Payments from "@/components/@page-components/payments";

const title = "Payments";
const PaymentsPage = () => {
    return (
        <>
            <Head>
                <title>{title} |{APP_NAME}</title>
            </Head>
            <Box>
                <Payments/>
            </Box>
        </>
    )
}

PaymentsPage.getLayout = page => (
    <AuthGuard>
        <ModernLayout title={title}>
            <RoleGuard path={PATHS.PAYMENTS} page={true}>
                {page}
            </RoleGuard>
        </ModernLayout>
    </AuthGuard>
)

export default PaymentsPage;
