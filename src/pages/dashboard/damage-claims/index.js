import ModernLayout from "@/components/@layouts/modern-layout";
import Head from "next/head";
import {APP_NAME, PATHS} from "@/utils/constants";
import Box from "@mui/material/Box";
import Damage from "@/components/@page-components/claims/damage";
import {AuthGuard} from "@/hocs/auth-guard";
import RoleGuard from "@/hocs/role-guard";

const title = 'Damage Claims';

const DamageClaimPage = () => {
    return(
        <>
            <Head>
                <title>{title} |{APP_NAME}</title>
            </Head>
            <Box>
                <Damage/>
            </Box>
        </>
    )
}

DamageClaimPage.getLayout = page => (
    <AuthGuard>
        <ModernLayout title={title}>
            <RoleGuard path={PATHS.DAMAGE_CLAIMS} page={true}>
                {page}
            </RoleGuard>
        </ModernLayout>
    </AuthGuard>
)
export default DamageClaimPage