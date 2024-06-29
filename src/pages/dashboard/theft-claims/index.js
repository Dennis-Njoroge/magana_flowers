import ModernLayout from "@/components/@layouts/modern-layout";
import Head from "next/head";
import {APP_NAME, PATHS} from "@/utils/constants";
import Box from "@mui/material/Box";
import Theft from "@/components/@page-components/claims/theft";
import {AuthGuard} from "@/hocs/auth-guard";
import RoleGuard from "@/hocs/role-guard";

const title = 'Theft Claims';

const TheftClaimsPage = () => {
    return(
        <>
            <Head>
                <title>{title} |{APP_NAME}</title>
            </Head>
            <Box>
                <Theft/>
            </Box>
        </>
    )
}

TheftClaimsPage.getLayout = page => (
    <AuthGuard>
        <ModernLayout title={title}>
            <RoleGuard path={PATHS.THEFT_CLAIMS} page={true}>
                {page}
            </RoleGuard>
        </ModernLayout>
    </AuthGuard>
)
export default TheftClaimsPage