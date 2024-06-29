import ModernLayout from "@/components/@layouts/modern-layout";
import Head from "next/head";
import {APP_NAME, PATHS} from "@/utils/constants";
import Box from "@mui/material/Box";
import ApprovalStatus from "@/components/@page-components/approval-status";
import {claimsData} from "@/utils/dummy-data/general-data";
import {AuthGuard} from "@/hocs/auth-guard";
import RoleGuard from "@/hocs/role-guard";

const title = 'Claims Status';

const ClaimsStatusPage = () => {
    return(
        <>
            <Head>
                <title>{title} |{APP_NAME}</title>
            </Head>
            <Box>
                <ApprovalStatus data={claimsData}/>
            </Box>
        </>
    )
}

ClaimsStatusPage.getLayout = page => (
    <AuthGuard>
        <ModernLayout title={title}>
            <RoleGuard path={PATHS.CLAIM_STATUS} page={true}>
                {page}
            </RoleGuard>
        </ModernLayout>
    </AuthGuard>
)
export default ClaimsStatusPage