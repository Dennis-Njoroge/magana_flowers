import Head from 'next/head'
import {APP_NAME, PATHS} from "@/utils/constants";
import Box from "@mui/material/Box";
import ModernLayout from "@/components/@layouts/modern-layout";
import {AuthGuard} from "@/hocs/auth-guard";
import RoleGuard from "@/hocs/role-guard";
import Cart from "@/components/@page-components/cart";

const title = "Cart";
const CartPage = () => {
    return (
        <>
            <Head>
                <title>{title} |{APP_NAME}</title>
            </Head>
            <Box>
                <Cart/>
            </Box>
        </>
    )
}

CartPage.getLayout = page => (
    <AuthGuard>
        <ModernLayout title={title}>
            <RoleGuard path={PATHS.CART} page={true}>
                {page}
            </RoleGuard>
        </ModernLayout>
     </AuthGuard>
)

export default CartPage;
