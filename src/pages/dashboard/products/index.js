import Head from 'next/head'
import {APP_NAME, PATHS} from "@/utils/constants";
import Box from "@mui/material/Box";
import ModernLayout from "@/components/@layouts/modern-layout";
import {AuthGuard} from "@/hocs/auth-guard";
import RoleGuard from "@/hocs/role-guard";
import Products from "@/components/@page-components/products";


const title = "Products";
const ProductsPage = () => {
    return (
        <>
            <Head>
                <title>{title} |{APP_NAME}</title>
            </Head>
            <Box>
                <Products/>
            </Box>
        </>
    )
}

ProductsPage.getLayout = page => (
    <AuthGuard>
        <ModernLayout title={title}>
            <RoleGuard path={PATHS.PRODUCTS} page={true}>
                {page}
            </RoleGuard>
        </ModernLayout>
     </AuthGuard>
)

export default ProductsPage;
