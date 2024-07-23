import Head from 'next/head'
import {APP_NAME, PATHS} from "@/utils/constants";
import Box from "@mui/material/Box";
import ModernLayout from "@/components/@layouts/modern-layout";
import {AuthGuard} from "@/hocs/auth-guard";
import RoleGuard from "@/hocs/role-guard";
import Users from "@/components/@page-components/users";

const title = "Users";
const UsersPage = () => {
    return (
        <>
            <Head>
                <title>{title} |{APP_NAME}</title>
            </Head>
            <Box>
                <Users/>
            </Box>
        </>
    )
}

UsersPage.getLayout = page => (
    <AuthGuard>
        <ModernLayout title={title}>
            <RoleGuard path={PATHS.USERS} page={true}>
                {page}
            </RoleGuard>
        </ModernLayout>
    </AuthGuard>
)

export default UsersPage;
