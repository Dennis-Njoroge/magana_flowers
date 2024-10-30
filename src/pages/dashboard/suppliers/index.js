import Head from 'next/head'
import {APP_NAME, PATHS} from "@/utils/constants";
import Box from "@mui/material/Box";
import ModernLayout from "@/components/@layouts/modern-layout";
import {AuthGuard} from "@/hocs/auth-guard";
import RoleGuard from "@/hocs/role-guard";
import Suppliers from "@/components/@page-components/users/suppliers";

const title = "Suppliers";
const SupplierPage = () => {
    return (
        <>
            <Head>
                <title>{title} |{APP_NAME}</title>
            </Head>
            <Box>
                <Suppliers/>
            </Box>
        </>
    )
}

SupplierPage.getLayout = page => (
    <AuthGuard>
        <ModernLayout title={title}>
            <RoleGuard path={PATHS.SUPPLIER} page={true}>
                {page}
            </RoleGuard>
        </ModernLayout>
    </AuthGuard>
)

export default SupplierPage;