import Head from 'next/head'
import {APP_NAME, PATHS} from "@/utils/constants";
import Box from "@mui/material/Box";
import ModernLayout from "@/components/@layouts/modern-layout";
import {AuthGuard} from "@/hocs/auth-guard";
import RoleGuard from "@/hocs/role-guard";
import Employees from "@/components/@page-components/users/employees";

const title = "Employees";
const EmployeesPage = () => {
    return (
        <>
            <Head>
                <title>{title} |{APP_NAME}</title>
            </Head>
            <Box>
                <Employees/>
            </Box>
        </>
    )
}

EmployeesPage.getLayout = page => (
    <AuthGuard>
        <ModernLayout title={title}>
            <RoleGuard path={PATHS.EMPLOYEES} page={true}>
                {page}
            </RoleGuard>
        </ModernLayout>
    </AuthGuard>
)

export default EmployeesPage;
