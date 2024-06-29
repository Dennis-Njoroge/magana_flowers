import ModernLayout from "@/components/@layouts/modern-layout";
import Head from "next/head";
import {APP_NAME, PATHS} from "@/utils/constants";
import Box from "@mui/material/Box";
import ApprovalStatus from "@/components/@page-components/approval-status";
import {AuthGuard} from "@/hocs/auth-guard";
import RoleGuard from "@/hocs/role-guard";

const title = 'Dispatched Services';

const DispatchedServicesPage = () => {
    return(
        <>
            <Head>
                <title>{title} |{APP_NAME}</title>
            </Head>
            <Box>
                <ApprovalStatus report={true}/>
            </Box>
        </>
    )
}

DispatchedServicesPage.getLayout = page => (
    <AuthGuard>
        <ModernLayout title={title}>
            <RoleGuard path={PATHS.DISPATCHED_STATUS} page={true}>
                {page}
            </RoleGuard>
        </ModernLayout>
    </AuthGuard>
)
export default DispatchedServicesPage