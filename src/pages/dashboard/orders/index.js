import Head from 'next/head'
import {APP_NAME, PATHS} from "@/utils/constants";
import Box from "@mui/material/Box";
import ModernLayout from "@/components/@layouts/modern-layout";
import {AuthGuard} from "@/hocs/auth-guard";
import RoleGuard from "@/hocs/role-guard";
import Order from "@/components/@page-components/order";

const title = "Orders";
const OrderPage = () => {
    return (
        <>
            <Head>
                <title>{title} |{APP_NAME}</title>
            </Head>
            <Box>
                <Order/>
            </Box>
        </>
    )
}

OrderPage.getLayout = page => (
    <AuthGuard>
        <ModernLayout title={title}>
            <RoleGuard path={PATHS.ORDER} page={true}>
                {page}
            </RoleGuard>
        </ModernLayout>
    </AuthGuard>
)

export default OrderPage;
