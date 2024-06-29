import ModernLayout from "@/components/@layouts/modern-layout";
import Head from "next/head";
import {APP_NAME, PATHS} from "@/utils/constants";
import Box from "@mui/material/Box";
import CreditLife from "@/components/@page-components/claims/credit-life";
import {AuthGuard} from "@/hocs/auth-guard";
import RoleGuard from "@/hocs/role-guard";

const title = 'Credit Life Claims';

const CreditLifeClaimsPage = () => {
    return(
        <>
            <Head>
                <title>{title} |{APP_NAME}</title>
            </Head>
            <Box>
                <CreditLife/>
            </Box>
        </>
    )
}

CreditLifeClaimsPage.getLayout = page => (
    <AuthGuard>
        <ModernLayout title={title}>
            <RoleGuard path={PATHS.CREDIT_LIFE_CLAIMS} page={true}>
                {page}
            </RoleGuard>
        </ModernLayout>
    </AuthGuard>
)
export default CreditLifeClaimsPage